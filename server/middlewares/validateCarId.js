
export default (req, res, next) => {
<<<<<<< HEAD
  let { carId } = req.body;

  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
     throw new Error('car id must be a number');
=======
  let { car_id } = req.body;

  car_id = parseInt(car_id, 10);

  if (Number.isNaN(car_id)) {
     return res.status(400).json({
     	status: 400,
     	message: 'car id must be a number',
     }); 
>>>>>>> code-refactor-travis
  }

  return next();
};
<<<<<<< HEAD
=======
 
>>>>>>> code-refactor-travis
