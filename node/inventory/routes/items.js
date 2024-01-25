const express = require("express");
const router = express.Router();
const item_controller = require("../controllers/itemController");

router.get("/", item_controller.index);
router.get("/items", item_controller.item_list);
router.get("/items/:id", item_controller.item_detail);
router.get("/items/create", item_controller.item_create_get);
router.post("/items/create", item_controller.item_create_post);
router.get("/items/:id/update", item_controller.item_update_get);
router.post("/items/:id/update", item_controller.item_update_post);
router.get("/items/:id/delete", item_controller.item_delete_get);
router.post("/items/:id/delete", item_controller.item_delete_post);

