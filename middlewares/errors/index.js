import Errors from './enums.js';
export default (error, req, res, next) => {
  switch (error.code) {
    case Errors.INVALID_TYPE_ERROR:
      res.status(400).send({
        status: 'error',
        error: error.name,
        description: error.cause,
      });
      break;
    default:
      res.status(500).send({
        status: 'error',
        error: error.name,
        description: error.cause,
      });
      break;
  }

  next();
};