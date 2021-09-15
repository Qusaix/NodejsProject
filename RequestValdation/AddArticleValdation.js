
const { body } = require('express-validator');

let ArticleValdation = [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString()
];

module.exports = { ArticleValdation };