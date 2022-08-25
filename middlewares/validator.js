/**
 * Exports all the validation middlewares
 * @module middlewares/validator
 * @requires express-validator
 * 
 */

import { validationResult } from 'express-validator';

const validate = (schemas)  => {
    return async (req, res, next) => {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = result.array();
      console.log(errors);
      return  res.status(422).json(errors);
    };
}

export default validate;