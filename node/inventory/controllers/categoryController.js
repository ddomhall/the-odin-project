const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const item = require("../models/item");

// Display list of all categorys.
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display category create form on GET.
exports.category_create_get = (req, res, next) => {
  res.send('not implemented')
};

// Handle category create on POST.
exports.category_create_post = [
  res.send('not implemented')
];

// Display category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Handle category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display book update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Handle category create on POST.
exports.category_update_post = [
  res.send('not implemented')
];

