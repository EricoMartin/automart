import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Car from '../migration/car';
import 'regenerator-runtime';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const CarAds = {
  async createAd(req, res) {
    // eslint-disable-next-line
    let { manufacturer, model, price, state, status, year, body_type, owner } = req.body;
    const { img } = req.body;
    // eslint-disable-next-line
    const props = [manufacturer, model, price, state, status, year, body_type, owner, img];

    const validData = (property, data) => property.find(idx => data[idx] === undefined || data[idx] === '');

    if (!validData(props, req.body) || !img) {
      return res.status(400).json({
        status: 400,
        message: 'Fill all required fields',
      });
    }
    // eslint-disable-next-line
    const created_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    manufacturer = manufacturer.trim().replace(/\s+/g, '');
    model = model.trim().replace(/\s+/g, '');
    price = parseInt(price, 10);
    state = state.trim().replace(/\s+/g, '');
    status = status.trim().replace(/\s+/g, '');
    year = parseInt(year, 10);
    // eslint-disable-next-line
    body_type = body_type.trim().replace(/\s+/g, '');
    owner = parseInt(owner, 10);

    try {
      // eslint-disable-next-line
      const imgUrl = req.file ? await cloudinary.uploader.upload(req.file.path, { folder: 'automart-app/', format: 'jpg' })
        : { url: req.img_url };
        // eslint-disable-next-line
      const car = [req.body.manufacturer, req.body.model, req.body.price, req.body.state, req.body.status, req.body.body_type, req.body.year, created_on, req.body.owner, req.body.img];
      const newAd = await Car.newCarAd(car);

      return res.status(201).json({
        status: 201,
        data: newAd.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async getAllCars(req, res) {
    try {
      const { rows } = await Car.getAllCars();
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'No Car Record Found. Try again Later',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },


  async getAllUnsoldCars(req, res) {
    try {
      const { rows } = await Car.getAllUnsoldCars();
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'No cars available now. Try again later',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async getCarByProp(req, res) {
    try {
      const param = Object.keys(req.params)[0];
      let cardata;
      switch (param.toLowerCase()) {
        case 'manufacturer':
        // eslint-disable-next-line
          cardata = await Car.getCarByProp(req.query.status, param, req.params.manufacturer);
          break;
        case 'model':
          cardata = await Car.getCarByProp(req.query.status, param, req.params.model);
          break;
        case 'year':
          cardata = await Car.getCarByProp(req.query.status, param, req.params.year);
          break;
        case 'body_type':
          cardata = await Car.getCarByProp(req.query.status, param, req.params.body_type);
          break;
        case 'status':
          cardata = await Car.getCarByProp(req.query.status, param, req.params.status);
          break;
        default:
          cardata = await Car.getCarByProp(req.query.status, param, req.params.state);
          break;
      }
      if (cardata.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: `There are no cars for the selected ${param}`,
        });
      }
      return res.status(200).json({
        status: 200,
        data: cardata.rows,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async updateCarAd(req, res) {
    try {
      const { car_id } = req.params;
      const { rows } = await Car.findCarAd(parseInt(car_id, 10));

      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'The advert to update is not available',
        });
      }

      if (!req.body.status || !req.body.price) {
        return res.status(400).json({
          status: 400,
          message: 'price and status are required',
        });
      }

      if (req.body.price) {
        // eslint-disable-next-line
        const carAd = await Car.updateCarAd('price', req.body.price, parseInt(rows[0].car_id, 10));
      }
      // eslint-disable-next-line
      const carAd = await Car.updateCarAd('status', req.body.status, parseInt(rows[0].car_id, 10));

      const adCar = carAd;
      if (adCar.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'The car ad was not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: carAd.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async getCarPriceRange(req, res) {
    // const min = req.query['min'];
    const min = req.query.min ? req.query.min : 0;
    // const max = req.query['max'];
    const max = req.query.max ? req.query.max : 5000000;

    try {
      const { rows } = await Car.getCarPriceRange(req.query.status, min, max);
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'There are no cars within the selected price range',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async findCarAd(req, res) {
    const { car_id } = req.params;
    if (Number.isNaN(car_id)) {
      return res.status(400).json({
        status: 400,
        message: 'car id must be a number',
      });
    }
    if (car_id >= 10000) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid Car ad Record. id cannot be greater than 10000',
      });
    }

    try {
      const { rows } = await Car.findCarAd(car_id);

      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No Car Record Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  async deleteCar(req, res) {
    try {
      if (!req.params.car_id >= 10000) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid car Id',
        });
      }
      const { rows } = await Car.findCarAd(parseInt(req.params.car_id, 10));
      if (rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'This ad is not available',
        });
      }
      const deleteAd = await Car.deleteCar(parseInt(req.params.car_id, 10));
      if (!deleteAd) {
        return res.status(404).json({
          status: 404,
          message: 'Error processing the request',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Ad has been succesfully deleted',
        data: deleteAd.rows[0],
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },
};

export default CarAds;
