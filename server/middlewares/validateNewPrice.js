export default (req, res, next) => {
  const { price } = req.params;

  if (Number.isNaN(price)) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a valid price',
    });
  }
  if (price > 10000000) {
    return res.status(400).json({
      status: 400,
      error: 'Enter a price below 10,000,000',
    });
  }

  return next();
};
