
import { body } from 'express-validator';
import { validateFields } from './validateFields';

const validateAuthCredentials = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validateFields
];

export default validateAuthCredentials;