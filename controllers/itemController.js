const Item = require("../models/item");
const Category = require("../models/category");
const Creator = require("../models/creator");
const Type = require("../models/type");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items, creators and category counts (in parallel)
  const [numItems, numCategories, numTypes, numCreators] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
    Type.countDocuments({}).exec(),
    Creator.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Sadie's Pottery Inventory Management",
    item_count: numItems,
    category_count: numCategories,
    type_count: numTypes,
    creator_count: numCreators,
  });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name type stock description")
    .sort({ name: 1 })
    .populate("type")
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details for specific item
  const item = await Item.findById(req.params.id)
    .populate("creator")
    .populate("category")
    .populate("type")
    .exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", { item });
});

// // Display item create form on GET.
// exports.item_create_get = asyncHandler(async (req, res, next) => {
//   // Get all authors and genres, which we can use for adding to our item.
//   const [allAuthors, allGenres] = await Promise.all([
//     Author.find().sort({ family_name: 1 }).exec(),
//     Genre.find().sort({ name: 1 }).exec(),
//   ]);

//   res.render("item_form", {
//     title: "Create Item",
//     authors: allAuthors,
//     genres: allGenres,
//   });
// });

// // Handle item create on POST.
// exports.item_create_post = [
//   // Convert the genre to an array.
//   (req, res, next) => {
//     if (!Array.isArray(req.body.genre)) {
//       req.body.genre =
//         typeof req.body.genre === "undefined" ? [] : [req.body.genre];
//     }
//     next();
//   },

//   // Validate and sanitize fields.
//   body("title", "Title must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("author", "Author must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("summary", "Summary must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
//   body("genre.*").escape(),
//   // Process request after validation and sanitization.

//   asyncHandler(async (req, res, next) => {
//     // Extract the validation errors from a request.
//     const errors = validationResult(req);

//     // Create a Item object with escaped and trimmed data.
//     const item = new Item({
//       title: req.body.title,
//       author: req.body.author,
//       summary: req.body.summary,
//       isbn: req.body.isbn,
//       genre: req.body.genre,
//     });

//     if (!errors.isEmpty()) {
//       // There are errors. Render form again with sanitized values/error messages.

//       // Get all authors and genres for form.
//       const [allAuthors, allGenres] = await Promise.all([
//         Author.find().sort({ family_name: 1 }).exec(),
//         Genre.find().sort({ name: 1 }).exec(),
//       ]);

//       // Mark our selected genres as checked.
//       for (const genre of allGenres) {
//         if (item.genre.includes(genre._id)) {
//           genre.checked = "true";
//         }
//       }
//       res.render("item_form", {
//         title: "Create Item",
//         authors: allAuthors,
//         genres: allGenres,
//         item: item,
//         errors: errors.array(),
//       });
//     } else {
//       // Data from form is valid. Save item.
//       await item.save();
//       res.redirect(item.url);
//     }
//   }),
// ];

// // Display Author delete form on GET.
// exports.item_delete_get = asyncHandler(async (req, res, next) => {
//   const item = await Item.findById(req.params.id).populate("author").exec();

//   if (item === null) {
//     // No results.
//     res.redirect("/catalog/items");
//   }

//   res.render("item_delete", {
//     title: "Delete Item",
//     item: item,
//   });
// });

// // Handle item delete on POST.
// exports.item_delete_post = asyncHandler(async (req, res, next) => {
//   await Item.findByIdAndDelete(req.body.itemid);
//   res.redirect("/catalog/items");
// });

// // Display item update form on GET.
// exports.item_update_get = asyncHandler(async (req, res, next) => {
//   // Get item, authors and genres for form.
//   const [item, allAuthors, allGenres] = await Promise.all([
//     Item.findById(req.params.id).populate("author").exec(),
//     Author.find().sort({ family_name: 1 }).exec(),
//     Genre.find().sort({ name: 1 }).exec(),
//   ]);

//   if (item === null) {
//     // No results.
//     const err = new Error("Item not found");
//     err.status = 404;
//     return next(err);
//   }

//   // Mark our selected genres as checked.
//   allGenres.forEach((genre) => {
//     if (item.genre.includes(genre._id)) genre.checked = "true";
//   });

//   res.render("item_form", {
//     title: "Update Item",
//     authors: allAuthors,
//     genres: allGenres,
//     item: item,
//   });
// });

// // Handle item update on POST.
// exports.item_update_post = [
//   // Convert the genre to an array.
//   (req, res, next) => {
//     if (!Array.isArray(req.body.genre)) {
//       req.body.genre =
//         typeof req.body.genre === "undefined" ? [] : [req.body.genre];
//     }
//     next();
//   },

//   // Validate and sanitize fields.
//   body("title", "Title must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("author", "Author must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("summary", "Summary must not be empty.")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
//   body("genre.*").escape(),

//   // Process request after validation and sanitization.
//   asyncHandler(async (req, res, next) => {
//     // Extract the validation errors from a request.
//     const errors = validationResult(req);

//     // Create a Item object with escaped/trimmed data and old id.
//     const item = new Item({
//       title: req.body.title,
//       author: req.body.author,
//       summary: req.body.summary,
//       isbn: req.body.isbn,
//       genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
//       _id: req.params.id, // This is required, or a new ID will be assigned!
//     });

//     if (!errors.isEmpty()) {
//       // There are errors. Render form again with sanitized values/error messages.

//       // Get all authors and genres for form
//       const [allAuthors, allGenres] = await Promise.all([
//         Author.find().sort({ family_name: 1 }).exec(),
//         Genre.find().sort({ name: 1 }).exec(),
//       ]);

//       // Mark our selected genres as checked.
//       for (const genre of allGenres) {
//         if (item.genre.indexOf(genre._id) > -1) {
//           genre.checked = "true";
//         }
//       }
//       res.render("item_form", {
//         title: "Update Item",
//         authors: allAuthors,
//         genres: allGenres,
//         item: item,
//         errors: errors.array(),
//       });
//       return;
//     } else {
//       // Data from form is valid. Update the record.
//       const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
//       // Redirect to item detail page.
//       res.redirect(updatedItem.url);
//     }
//   }),
// ];
