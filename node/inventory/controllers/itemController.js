const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Categories = require("../models/category");

exports.item_list = asyncHandler(async (req, res, next) => {
  const items = await Item.find().sort({name: 1}).exec()
  res.render('item_list', {title: 'All Items', items: items})
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec()
  res.render('item_detail', {item: item})
});

exports.item_create_get = asyncHandler(async(req, res, next) => {
  const categories = await Categories.find().sort({name: 1}).exec()
  res.render('item_form', {title: 'Create Item', categories: categories})
});

exports.item_create_post = [

  body("name", "empty name")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("description", "empty description")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("category", "empty category")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("price", "empty price")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("quantity", "empty quantity")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    if (!errors.isEmpty()) {
      const categories = await Categories.find().sort({name: 1}).exec()
      res.render('item_form', {title: 'Create Item', item: item, categories: categories, errors: errors.array()})

    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('not implemented')
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec()
  const categories = await Categories.find().sort({name: 1}).exec()
  res.render('item_form', {title: 'Update Item', item: item, categories: categories})
});

exports.item_update_post = [

  body("name", "empty name")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("description", "empty description")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("category", "empty category")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("price", "empty price")
  .trim()
  .isLength({ min: 1 })
  .escape(),
  body("quantity", "empty quantity")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const categories = await Categories.find().sort({name: 1}).exec()
      res.render('item_form', {title: 'Create Item', item: item, categories: categories, errors: errors.array()})

    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item).exec()
      res.redirect(updatedItem.url);
    }
  }),
];

