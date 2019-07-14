class APISuccess {
  constructor(res, statusCode, data) {
    this.res = res;
    this.statusCode = statusCode;
    this.data = data;

    return res.status(statusCode).send({
      status: statusCode,
      data,
    });  
  }
}

export default APISuccess;