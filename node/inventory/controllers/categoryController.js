const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({name: 1}).exec()

  res.render('category_list', {title: 'Category List', category_list: allCategories})
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, books] = await Promise.all([
  Category.findById(req.params.id).exec(),
  Item.find({ category: req.params.id }, "name description").exec(),
  ])

  res.render('category_detail', {category: category, books: books})
});

exports.category_create_get = (req, res, next) => {
  res.render('category_form', {title: 'Create Category'})
};

exports.category_create_post = [
  body("name", "empty name")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("description", "empty description")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const category = new Category({
      name: req.body.name,
      description: req.body.description
    })

    if (!errors.isEmpty()) {
      res.render('category_form', {title: 'Create Catgory', category: category, errors: errors.array()})
    } else {
      category.save()
      res.redirect(category.url)
    }
  })
];

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

