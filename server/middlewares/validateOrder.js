export default (req, res, next) => {
  let { priceOffered } = req.body;

  priceOffered = parseFloat(priceOffered);

  if (Number.isNaN(priceOffered)) {
    return new Error('price must be a number');
  }

  return next();
};
