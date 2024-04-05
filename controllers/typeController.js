const Type = require("../models/type");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Types.
exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().sort({ name: 1 }).exec();

  res.render("type_list", {
    title: "Type List",
    type_list: allTypes,
  });
});

// Display detail page for a specific Type.
exports.type_detail = asyncHandler(async (req, res, next) => {
  // Get details of type and all associated items (in parallel)
  const [type, itemsInType] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Item.find({ type: req.params.id }, "title summary")
      .sort({ title: 1 })
      .exec(),
  ]);
  if (type === null) {
    // No results.
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("type_detail", {
    title: "Type Detail",
    type: type,
    type_items: itemsInType,
  });
});

// Display Type create form on GET.
exports.type_create_get = (req, res, next) => {
  res.render("type_form", { title: "Create Type" });
};

// Handle Type create on POST.
exports.type_create_post = [
  // Validate and sanitize the name field.
  body("name", "Type name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a type object with escaped and trimmed data.
    const type = new Type({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("type_form", {
        title: "Create Type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Type with same name already exists.
      const typeExists = await Type.findOne({ name: req.body.name }).exec();
      if (typeExists) {
        // Type exists, redirect to its detail page.
        res.redirect(typeExists.url);
      } else {
        await type.save();
        // New type saved. Redirect to type detail page.
        res.redirect(type.url);
      }
    }
  }),
];

// Display Type delete form on GET.
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete GET");
});

// Handle Type delete on POST.
exports.type_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete POST");
});

// Display Type update form on GET.
exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update GET");
});

// Handle Type update on POST.
exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update POST");
});
