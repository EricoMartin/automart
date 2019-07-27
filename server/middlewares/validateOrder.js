export default (req, res, next) => {
  let { price_offered } = req.body;
  
  if(!price_offered){
  	return res.status(400).json({
  		status: 400,
  		message: 'price_offered is required'
  	});
  }
  price_offered = parseFloat(price_offered);

  if (Number.isNaN(price_offered)) {
    return new Error('price must be a number');
  }

  return next();
};
