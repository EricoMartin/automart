export default (req, res, next) => {
  const { first_name, last_name } = req.body;
  // Check if firstName and lastName contains a number

   if (first_name.trim().length <= 2 || last_name.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
 
  }else{
     if (!first_name || !last_name) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
 
  }

  const yes = `${first_name}${last_name}`.split('').some(x => Number.isInteger(parseInt(x, 10)));

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)',
    });
  }

  
  }


  return next();
};
