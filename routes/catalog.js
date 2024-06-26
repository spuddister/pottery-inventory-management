const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const creator_controller = require("../controllers/creatorController");
const type_controller = require("../controllers/typeController");
const category_controller = require("../controllers/categoryController");
// const item_instance_controller = require("../controllers/itemInstanceController");

/// item ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// // GET request for creating a item. NOTE This must come before routes that display item (uses id).
// router.get("/item/create", item_controller.item_create_get);

// // POST request for creating item.
// router.post("/item/create", item_controller.item_create_post);

// // GET request to delete item.
// router.get("/item/:id/delete", item_controller.item_delete_get);

// // POST request to delete item.
// router.post("/item/:id/delete", item_controller.item_delete_post);

// // GET request to update item.
// router.get("/item/:id/update", item_controller.item_update_get);

// // POST request to update item.
// router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all items.
router.get("/items", item_controller.item_list);

// /// CREATOR ROUTES ///

// // GET request for creating creator. NOTE This must come before route for id (i.e. display creator).
// router.get("/creator/create", creator_controller.creator_create_get);

// // POST request for creating creator.
// router.post("/creator/create", creator_controller.creator_create_post);

// // GET request to delete creator.
// router.get("/creator/:id/delete", creator_controller.creator_delete_get);

// // POST request to delete creator.
// router.post("/creator/:id/delete", creator_controller.creator_delete_post);

// // GET request to update creator.
// router.get("/creator/:id/update", creator_controller.creator_update_get);

// // POST request to update creator.
// router.post("/creator/:id/update", creator_controller.creator_update_post);

// GET request for one creator.
router.get("/creator/:id", creator_controller.creator_detail);

// GET request for list of all creators.
router.get("/creators", creator_controller.creator_list);

/// TYPE ROUTES ///

// // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// router.get("/type/create", type_controller.type_create_get);

// //POST request for creating Genre.
// router.post("/type/create", type_controller.type_create_post);

// // GET request to delete Genre.
// router.get("/type/:id/delete", type_controller.type_delete_get);

// // POST request to delete Genre.
// router.post("/type/:id/delete", type_controller.type_delete_post);

// // GET request to update Genre.
// router.get("/type/:id/update", type_controller.type_update_get);

// // POST request to update Genre.
// router.post("/type/:id/update", type_controller.type_update_post);

// // GET request for one Genre.
// router.get("/type/:id", type_controller.type_detail);

// GET request for list of all Types.
router.get("/types", type_controller.type_list);

/// CATEGORY ROUTES ///

// // GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
// router.get("/category/create", category_controller.category_create_get);

// //POST request for creating Category.
// router.post("/category/create", category_controller.category_create_post);

// // GET request to delete Category.
// router.get("/category/:id/delete", category_controller.category_delete_get);

// // POST request to delete Category.
// router.post("/category/:id/delete", category_controller.category_delete_post);

// // GET request to update Category.
// router.get("/category/:id/update", category_controller.category_update_get);

// // POST request to update Category.
// router.post("/category/:id/update", category_controller.category_update_post);

// // GET request for one Category.
// router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Categories.
router.get("/categories", category_controller.category_list);

/// BOOKINSTANCE ROUTES ///

// // GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// router.get(
//   "/bookinstance/create",
//   book_instance_controller.bookinstance_create_get
// );

// // POST request for creating BookInstance.
// router.post(
//   "/bookinstance/create",
//   book_instance_controller.bookinstance_create_post
// );

// // GET request to delete BookInstance.
// router.get(
//   "/bookinstance/:id/delete",
//   book_instance_controller.bookinstance_delete_get
// );

// // POST request to delete BookInstance.
// router.post(
//   "/bookinstance/:id/delete",
//   book_instance_controller.bookinstance_delete_post
// );

// // GET request to update BookInstance.
// router.get(
//   "/bookinstance/:id/update",
//   book_instance_controller.bookinstance_update_get
// );

// // POST request to update BookInstance.
// router.post(
//   "/bookinstance/:id/update",
//   book_instance_controller.bookinstance_update_post
// );

// // GET request for one BookInstance.
// router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

// // GET request for list of all BookInstance.
// router.get("/bookinstances", book_instance_controller.bookinstance_list);

module.exports = router;
