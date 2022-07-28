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
      return  res.status(422).send(errors);
    };
}

export default validate;