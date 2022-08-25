/**
 * Exports all the validation schemas 
 * @module models/validationSchema
 * @requires express-validator
 * 
 */

import { body, query } from 'express-validator';

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

export const playlistCreateSchema = [
    body('listId').trim().notEmpty()
    .withMessage('listId is required')
]

export const getVideosSchema = [
    query('id').trim().notEmpty()
    .withMessage('id is required'),
    query('page').trim().default(1).isNumeric()
    .withMessage('page should be a number'),
    query('limit').trim().default(50).isNumeric()
    .withMessage('limit should be a number')
]

export const updatePlaylistSchema = [
    body('title').trim().notEmpty()
    .withMessage('title is required')
]

export const createPlaylistSchema = [
    body('summary').trim().notEmpty()
    .withMessage('summary is required'),
    body('description').trim().notEmpty()
    .withMessage('description is required'),
    // body('start').trim().notEmpty()
    // .withMessage('start is required')
    // .isDate().withMessage('start should be a date'),
    // body('end').trim().notEmpty()
    // .withMessage('end is required')
    // .isDate().withMessage('end should be a date')
]