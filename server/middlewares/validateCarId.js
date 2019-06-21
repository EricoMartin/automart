
export default (req, res, next) => {
  let { carId } = req.body;

  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
     throw new Error('car id must be a number');
  }

  return next();
};
