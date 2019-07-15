import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Car from  '../models/car';
import 'regenerator-runtime';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const CarAds = {
  async createAd(req, res) {
  
      let { manufacturer, owner, model, price, state, status, year, body_type, img } = req.body;
      const props = [manufacturer, model, price, state, status, year, body_type, img];

      const invalidData = (property, data) => property.find(idx => data[idx] === undefined || data[idx] === '');

      if(!invalidData(props, req.body) || !img){
        return res.status(400).json({
          status: 400,
          message: 'Fill all required fields'
        });
      }

      const { id, email } = req.authData.user;
       owner = id;
      manufacturer = manufacturer.trim().replace(/\s+/g, '');
      model = model.trim().replace(/\s+/g, '');
      price = parseInt(price);
      state = state.trim().replace(/\s+/g, '');
      status = status.trim().replace(/\s+/g, '');
      year = parseInt(year, 10);
      body_type = body_type.trim().replace(/\s+/g, '');
      img = img.trim().replace(/\s+/g, '');

      
    try {
      const imgprom = new Promise((resolve, reject) => {
      const imageUrl = [];
      if (req.files.image.length > 1) {
        req.files.image.forEach((x) => {
          cloudinary.uploader.upload(x.path, (error, result) => {
            if (result) imageUrl.push(result.url);
            if (imageUrl.length === req.files.image.length) {
              resolve(imageUrl);
            } else if (error) {
              log.warn(error);
              reject(error);
            }
          });
        });
      }
    })
      .then(result => result)
      .catch(error => error);

    const imgUrl = await imgprom;
    if (imgUrl.code || imgUrl.errno) {
      return res.status(500).json({
        status: 500,
        error: imgUrl,
      });
    }

    if(!imgUrl){
      return res.status(400).json({
        status: 400,
        message: 'An image is required',
      });
    }

      const newAd = Car.newCarAd({
        id,
        owner,
        state,
        status,
        price,
        manufacturer,
        year,
        model,
        body_type,
        img,
        imgUrl
      });

      return res.status(201).json({
        status: 201,
        data: newAd
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  },

  getAllCars(req, res) {
    const data = Car.getAllCars();
    if (data.length < 1) { 
    return res.status(404).json({
      status:404,
      message: 'No Car Record Found. Try again Later'
    });
  }else {
    return res.status(200).json({
      status:200,
      data: data
      });
  }
},

  

  getAllUnsoldCars(req, res) {
    const data = Car.getAllUnsoldCars();
    if(data.length < 1){ 
    return res.status(404).json({
      status:404,
      message: 'No cars available now. Try again later'
    });
  }else {
    return res.status(200).json({
      status:200,
      data: data
      });
  }
  },

  getCarByProp(req, res) {
    
    const param = Object.keys(req.params)[0];

    let cardata;
    switch (param.toLowerCase()) {
      case 'manufacturer':
        cardata = Car.getUnsoldCarByProp(param, req.params.manufacturer);
        break;
        case 'model':
        cardata = Car.getUnsoldCarByProp(param, req.params.model);
        break;
        case 'year':
        cardata = Car.getUnsoldCarByProp(param, req.params.year);
        break;
        case 'body_type':
        cardata = Car.getUnsoldCarByProp(param, req.params.body_type);
        break;
        case 'status':
        cardata = Car.getUnsoldCarByProp(param, req.params.status);
        break;
        case 'price':
        cardata = Car.getUnsoldCarByProp(param, req.params.price);
        break;
        default:
        cardata = Car.getUnsoldCarByProp(param, req.params.state);
        break;
      }
    if (cardata.length < 1) {
      return res.status(404).json({
      status:404,
      message: `There are no cars for the selected ${param}`
    });
    }
    return res.status(200).json({
      status:200,
      data: cardata
    });
  },

  updateCarAd(req, res) {
    const carId = req.body.id;
    const card = findCarAd(parseInt(carId, 10));

    if(!card){
      return res.status(404).json({
        status: 404,
        message: 'The advert to update is not available'
      });
    }

    if (card !== req.body.owner) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorized to update Ad'
      });
    }

    const carAd = Car.updateCarAdPrice(req.body.id, req.body);
    const carStatus = Car.updateStatus(req.body.id, req.body);
    //return (!carAd || !carStatus) ? new APIError(400, 'The car ad was not found') : APISuccess(res, 200, carAd);
    if(!carAd || !carStatus){ 
    return res.status(404).json({
      status:404,
      message: 'The car ad was not found'
    });
  }else {
    return res.status(200).json({
      status:200,
      data: { ...carAd}
      });
    }
  },

  getCarPriceRange(req, res) {
   //const min = req.query['min'];
   const min = req.query.min ? req.query.min : 0;
   //const max = req.query['max'];
   const max = req.query.max ? req.query.max : 5000000;
   
     //min = min || 0;
     //max = max || 5000000;

    const cars = Car.getCarPriceRange(min, max);
    if (cars.length === 0) {
      return res.status(404).json({
      status: 404,
      message:'There are no cars within the selected price range',
    }); 
    }
    return res.status(200).json({
      status: 200,
      data:cars
    });
  },

  findCarAd(req, res) {
    const {id} = req.params;
    if ( id >= 10000) {
      return res.status(400).json({
      status:400,
      message: 'Invalid Car ad Record. id cannot be greater than 10000'
    }); 
    }
    const carFound = Car.findCarAd(id);

    if (carFound.length < 1) { 
    return res.status(404).json({
      status:404,
      message: 'No Car Record Found',
    });
  }
    return res.status(200).json({
      status:200,
      data: {
        id: carFound.id,
        owner_id: carFound.owner_id,
        email: carFound.email,
        created_on: carFound.createdOn,
        manufacturer: carFound.manufacturer,
        model: carFound.model,
        price: carFound.price,
        state: carFound.state,
        status: carFound.status,
        year: carFound.year,
        body_type: carFound.body_type,
        img: carFound.imgUrl,
      }
      });
},

  deleteCar(req, res) {
    const user  = req.body;
    if (user.isAdmin === true) {
      const data = Car.findCarAd(req.params.id);
      if (!data) {
        return res.status(404).json({
          status: 404,
          message:'This ad is not available',
        });
      }
      const deleteAd = Car.deleteCar(data);
      if (!deleteAd) {
        return res.status(404).json({
          status: 404,
          message:'Error processing the request',
        });
    }
    res.status(200).json({
      status: 200,
      data:'Ad has been succesfully deleted'
    });
   }
  }
};

export default CarAds;

