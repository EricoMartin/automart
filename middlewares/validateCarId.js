export default (req, res, next) => {
  let { carId } = req.body;

  carId = parseInt(carId, 10);

  if (Number.isNaN(carId)) {
     res.write(400).json({
      status: 400,
      error: 'Enter a valid ID',
    });
  }

  return next();
};
