const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Categories = require("../models/category");

exports.item_list = asyncHandler(async (req, res, next) => {
  const items = await Item.find().sort({name: 1}).exec()
  res.render('item_list', {title: 'All Items', items: items})
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec()
  res.render('item_detail', {item: item})
});

exports.item_create_get = asyncHandler(async(req, res, next) => {
  categories = await Categories.find().sort({name: 1}).exec()
  res.render('item_form', {title: 'Create Item', categories: categories})
});

exports.item_create_post = (req, res, next) => {
  res.send('not implemented')
};

//exports.item_create_post = [
//  res.send('not implemented')
//];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

// exports.item_update_post = [
//   res.send('not implemented')
//];

