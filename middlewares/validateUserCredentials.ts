
import { body } from 'express-validator';
import { validateFields } from './validateFields';

const validateUserCredentials = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must contain at least 6 characters'),
    validateFields
];

export default validateUserCredentials;