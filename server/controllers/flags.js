import models from '../models/model/model';

const { Flags } = models;
/*
  * @description - creates a new flag
   * @params {object}
   * @returns {object}
   */

class Flag {
  static createFlag(req, res) {
  try{
    let { carId, reason, description } = req.body;

    carId = parseInt(carId, 10);
    reason = reason.trim().replace(/\s+/g, ' ');
    description = description.trim().replace(/\s+/g, ' ');

    const createdFlag = Flags.createFlag({
      carId,
      reason,
      description,
    });

    return res.status(201).json({
      status: 201,
      data: {
        id: createdFlag.id,
        car_id: createdFlag.carId,
        reason: createdFlag.reason,
        description: createdFlag.description,
      },
    });
  }
 catch (error) {
      res.status(error.statusCode || 500);
    }
  }
}

export default Flag;
