
export default (req, res, next) => {
  const { password } = req.body;

<<<<<<< HEAD
  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'Password field cannot be empty',
    });
  }

  if (password.trim().length < 8) {
    return res.status(400).json({
      status: 400,
      error: 'Password cannot be less than 8 characters',
=======
  if (password.trim().length < 8) {
    return res.status(400).json({
      status: 400,
      error: 'Password cannot be less than 8 characters',
    });
  
  }

  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'Password field cannot be empty',
>>>>>>> code-refactor-travis
    });
  }

  return next();
};
