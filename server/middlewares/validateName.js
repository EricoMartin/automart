export default (req, res, next) => {
  const { firstName, lastName } = req.body;
  // Check if firstName and lastName contains a number

<<<<<<< HEAD
  if (!firstName || !lastName) {
=======
   if (firstName.trim().length <= 2 || lastName.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
 
  }else{
     if (!firstName || !lastName) {
>>>>>>> code-refactor-travis
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
<<<<<<< HEAD
=======
 
>>>>>>> code-refactor-travis
  }

  const yes = `${firstName}${lastName}`.split('').some(x => Number.isInteger(parseInt(x, 10)));

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)',
    });
  }

<<<<<<< HEAD
  if (firstName.trim().length <= 2 || lastName.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
=======
  
>>>>>>> code-refactor-travis
  }


  return next();
};
