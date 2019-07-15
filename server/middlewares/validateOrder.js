export default (req, res, next) => {
  let { price_offered } = req.body;

  price_offered = parseFloat(price_offered);

  if (Number.isNaN(price_offered)) {
    return new Error('price must be a number');
  }

  return next();
};
