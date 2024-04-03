const Creator = require("../models/creator");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Creators.
exports.creator_list = asyncHandler(async (req, res, next) => {
  const allCreators = await Creator.find().sort({ family_name: 1 }).exec();

  res.render("creator_list", {
    title: "Creator List",
    creator_list: allCreators,
  });
});

// Display detail page for a specific Creator.
exports.creator_detail = asyncHandler(async (req, res, next) => {
  // Get details of creator and all their items (in parallel)
  const [creator, allItemsByCreator] = await Promise.all([
    Creator.findById(req.params.id).exec(),
    Item.find({ creator: req.params.id }, "name stock").exec(),
  ]);

  if (creator === null) {
    // No results.
    const err = new Error("Creator not found");
    err.status = 404;
    return next(err);
  }

  res.render("creator_detail", {
    title: "Creator Detail",
    creator: creator,
    creator_items: allItemsByCreator,
  });
});

// Display Creator create form on GET.
exports.creator_create_get = (req, res, next) => {
  res.render("creator_form", { title: "Create Creator" });
};

// Handle Creator create on POST.
exports.creator_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Creator object with escaped and trimmed data
    const creator = new Creator({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("creator_form", {
        title: "Create Creator",
        creator: creator,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save creator.
      await creator.save();
      // Redirect to new creator record.
      res.redirect(creator.url);
    }
  }),
];

// Display Creator delete form on GET.
exports.creator_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of creator and all their items (in parallel)
  const [creator, allItemsByCreator] = await Promise.all([
    Creator.findById(req.params.id).exec(),
    Item.find({ creator: req.params.id }, "title summary").exec(),
  ]);

  if (creator === null) {
    // No results.
    res.redirect("/catalog/creators");
  }

  res.render("creator_delete", {
    title: "Delete Creator",
    creator: creator,
    creator_items: allItemsByCreator,
  });
});

// Handle Creator delete on POST.
exports.creator_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of creator and all their items (in parallel)
  const [creator, allItemsByCreator] = await Promise.all([
    Creator.findById(req.params.id).exec(),
    Item.find({ creator: req.params.id }, "title summary").exec(),
  ]);

  if (allItemsByCreator.length > 0) {
    // Creator has items. Render in same way as for GET route.
    res.render("creator_delete", {
      title: "Delete Creator",
      creator: creator,
      creator_items: allItemsByCreator,
    });
    return;
  } else {
    // Creator has no items. Delete object and redirect to the list of creators.
    await Creator.findByIdAndDelete(req.body.creatorid);
    res.redirect("/catalog/creators");
  }
});

// Display Creator update form on GET.
exports.creator_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Creator update GET");
});

// Handle Creator update on POST.
exports.creator_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Creator update POST");
});
