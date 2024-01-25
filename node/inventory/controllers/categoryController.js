const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({name: 1}).exec()
  res.render('category_list', {title: 'Category List', category_list: allCategories})
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.category_create_get = (req, res, next) => {
  res.send('not implemented')
};

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

//exports.category_create_post = [
//  res.send('not implemented')
//];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// exports.category_update_post = [
//   res.send('not implemented')
// ];

