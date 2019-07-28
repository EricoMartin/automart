
export default (req, res, next) => {
  let { car_id } = req.body;

  car_id = parseInt(car_id, 10);


  if (Number.isNaN(car_id)) {
    return res.status(400).json({
      status: 400,
      message: 'car id must be a number',
    });
  }

  return next();
};
