const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display item create form on GET.
exports.item_create_get = (req, res, next) => {
  res.send('not implemented')
};

// Handle item create on POST.
exports.item_create_post = [
  res.send('not implemented')
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Display book update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// Handle item create on POST.
exports.item_update_post = [
  res.send('not implemented')
];


