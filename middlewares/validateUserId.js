export default (req, res, next) => {
  let { userId } = req.params.id;

  userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
     res.write(400).json({
      status: 400,
      error: 'Enter a valid USER ID',
    });
  }

  return next();
};
