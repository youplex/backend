/**
 * Exports all the validation schemas 
 * @module models/validationSchema
 * @requires express-validator
 * 
 */

import { body } from 'express-validator';

export const loginSchema = [
    body('code').trim().notEmpty()
    .withMessage('Code cannot be empty')
];

export const userPutSchema = [
    body('name').trim().notEmpty()
    .withMessage('Name cannot be blank')
    .not().isNumeric().withMessage('Name cannot be a number'),
    body('image').trim().isURL()
    .withMessage('image should be a valid url')
];