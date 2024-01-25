const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_create_get = (req, res, next) => {
  res.send('not implemented')
};

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

