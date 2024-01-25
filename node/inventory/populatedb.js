#! /usr/bin/env node

console.log('populating db')

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = []
const categories = []

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories()
  await createItems()
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description
  });

  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}


async function itemCreate(index, name, description, category, price, quantity) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    quantity: quantity,
  })

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, 'category 0', 'category description 0'),
    categoryCreate(1, 'category 1', 'category description 1'),
    categoryCreate(2, 'category 2', 'category description 2'),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, 'name 0', 'description 0', categories[0], 0.00, 0),
    itemCreate(1, 'name 1', 'description 1', categories[1], 1.11, 1),
    itemCreate(2, 'name 2', 'description 2', categories[2], 2.22, 2)
  ]);
}
