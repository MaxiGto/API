const { query } = require('express-validator');
import { validateFields } from './validateFields';

const validatePaginationParams = [
  query('page').optional().isInt().withMessage('page parameter must be a whole number'),
  query('limit').optional().isInt().withMessage('limit parameter must be a whole number'),
  query('email').optional().isString().withMessage('email parameter must be a string'),
  validateFields
];

export default validatePaginationParams;