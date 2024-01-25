const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");

router.get("/", category_controller.index);
router.get("/categories", category_controller.category_list);
router.get("/categories/:id", category_controller.category_detail);
router.get("/categories/create", category_controller.category_create_get);
router.post("/categories/create", category_controller.category_create_post);
router.get("/categories/:id/update", category_controller.category_update_get);
router.post("/categories/:id/update", category_controller.category_update_post);
router.get("/categories/:id/delete", category_controller.category_delete_get);
router.post("/categories/:id/delete", category_controller.category_delete_post);

