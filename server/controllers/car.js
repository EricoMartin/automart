import Car from '../models/car';
import APIError from '../helpers/ErrorClass';
import APISuccess from '../helpers/SuccessClass';

class CarAds {
  static async createAd(req, res) {
    try {
    // Request body
      let {
        manufacturer, model, price, state, status, year, bodyType,
      } = req.body;
      // Format Inputs
      const { id } = req.authData.user;
      const owner = id;
      manufacturer = manufacturer.trim().replace(/\s+/g, '');
      model = model.trim().replace(/\s+/g, '');
      price = parseFloat(price);
      state = state.trim().replace(/\s+/g, '');
      status = status.trim().replace(/\s+/g, '');
      year = parseInt(year, 10);
      bodyType = bodyType.trim().replace(/\s+/g, '');


      // create ad
      const newAd = Car.newCarAd({
        owner,
        manufacturer,
        model,
        price,
        state,
        status,
        year,
        bodyType,
      });

      res.status(201).json({
        message: 'Created Successfully',
        data: {
          owner: newAd.owner,
          created_on: newAd.created_on,
          manufacturer: newAd.manufacturer,
          model: newAd.model,
          price: newAd.price,
          state: newAd.state,
          status: newAd.status,
          year: newAd.year,
          body_type: newAd.bodyType,
        },
      });
    } catch (error) {
      res.status(error.statusCode).json(error.message);
    }
  }

  static getAllCars(req, res) {
    const data = Car.getAllCars();
    return (!data) ? APIError(404, 'No Record Found') : APISuccess(res, 200, data);
  }

  static findCarAd(req, res) {
    const data = Car.findCarAd(req.params.id);
    return (!data) ? APIError(404, 'No Record Found') : APISuccess(res, 200, data);
  }

  static getAllUnsoldCars(req, res) {
    const data = Car.getAllUnsoldCars();
    return (data < 1) ? APIError(404, 'No Record Found') : APISuccess(res, 200, data);
  }

  static getCarByProp(req, res) {
    let data;
    if (req.params.manufacturer) {
      data = Car.getCarByProp(req.params, req.params.manufacturer);
    } if (req.params.model) {
      data = Car.getCarByProp(req.params, req.params.model);
    } if (req.params.state) {
      data = Car.getCarByProp(req.params, req.params.state);
    } if (req.params.body_type) {
      data = Car.getCarByProp(req.params, req.params.body_type);
    } if (req.params.status) {
      data = Car.getCarByProp(req.params, req.params.status);
    } if (req.params.year) {
      data = Car.getCarByProp(req.params, req.params.year);
    } else if (data.length < 1) {
      return APIError(404, `There are no cars for the selected ${req.params}`);
    }
    return APISuccess(res, 200, data);
  }

  static getUnsoldCarByProp(req, res) {
    let data;
    if (req.params.manufacturer) {
      data = Car.getUnsoldCarByProp(req.params, req.params.manufacturer);
    } if (req.params.model) {
      data = Car.getUnsoldCarByProp(req.params, req.params.model);
    } if (req.params.state) {
      data = Car.getUnsoldCarByProp(req.params, req.params.state);
    } if (req.params.body_type) {
      data = Car.getUnsoldCarByProp(req.params, req.params.body_type);
    } if (req.params.year) {
      data = Car.getUnsoldCarByProp(req.params, req.params.year);
    } else if (data.length < 1) {
      return APIError(404, `There are no cars for the selected ${req.params}`);
    }
    return APISuccess(res, 200, data);
  }

  static updateCarAd(req, res) {
    const id = parseInt(req.params.id, 10);
    if (id !== req.body.owner) {
      return APIError(401, 'You are not authorized to update Ad');
    }
    const carAd = Car.updateCarAdPrice(id, req.params.price);
    const carStatus = Car.updateStatus(id, req.params.status);
    return (!carAd || !carStatus) ? APIError(400, 'The car ad was not found') : APISuccess(res, 200, carAd);
  }

  static getCarPriceRange(req, res) {
    const min = req.query.min ? req.query.min : 0;
    const max = req.query.max ? req.query.max : 3000000;
    const cars = Car.getCarPriceRange(max, min);
    return (cars.length < 1) ? APIError(404, 'There are no cars within the selected price range') : APISuccess(res, 200, cars);
  }

  static deleteCar(req, res) {
    const { user } = req.authData;
    if (user.isAdmin === true) {
      const data = Car.findCarAd(req.params.id);
      if (!data) {
        return APIError(404, 'This ad is not available');
      }
      const deleteAd = Car.deleteCar(data);
      if (!deleteAd) {
        return APIError(404, 'Error procssing the Request');
      }
    }
    return APISuccess(res, 200, 'Ad has been succesfully deleted');
  }
}

export default new CarAds();
