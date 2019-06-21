export default (req, res, next) => {
  const { firstName, lastName } = req.body;
  // Check if firstName and lastName contains a number

  if (!firstName || !lastName) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be empty',
    });
  }

  const yes = `${firstName}${lastName}`.split('').some(x => Number.isInteger(parseInt(x, 10)));

  if (yes) {
    return res.status(400).json({
      status: 400,
      error: 'Name cannot contain number(s)',
    });
  }

  if (firstName.trim().length <= 2 || lastName.trim().length <= 2) {
    return res.status(400).json({
      status: 400,
      error: 'Name fields cannot be less than 2 characters',
    });
  }


  return next();
};
