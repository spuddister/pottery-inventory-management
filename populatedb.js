#! /usr/bin/env node

console.log(
  'This script populates some test plates, bowls, and other pottery to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Creator = require("./models/creator");
const Category = require("./models/category");
const Type = require("./models/type");

const categories = [];
const creators = [];
const items = [];
const types = [];

const testData = [
  {
    name: "Handcrafted Ceramic Mug",
    creator: "<Creator ObjectId>",
    description:
      "Beautiful handcrafted ceramic mug perfect for enjoying your favorite beverage.",
    price: 15.99,
    stock: 5,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 10,
      width: 8,
      depth: 8,
    },
  },
  {
    name: "Decorative Ceramic Bowl",
    creator: "<Creator ObjectId>",
    description:
      "Exquisite decorative ceramic bowl, ideal for serving snacks or displaying fruits.",
    price: 29.99,
    stock: 3,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 5,
      width: 12,
      depth: 12,
    },
  },
  {
    name: "Handcrafted Ceramic Vase",
    creator: "<Creator ObjectId>",
    description:
      "Elegant handcrafted ceramic vase, perfect for displaying flowers or as a standalone decor piece.",
    price: 39.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 15,
      width: 6,
      depth: 6,
    },
  },
  {
    name: "Artisanal Ceramic Plate Set",
    creator: "<Creator ObjectId>",
    description:
      "Set of four artisanal ceramic plates, each uniquely hand-painted, ideal for serving appetizers or desserts.",
    price: 49.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 2,
      width: 10,
      depth: 10,
    },
  },
  {
    name: "Hand-Painted Ceramic Pitcher",
    creator: "<Creator ObjectId>",
    description:
      "Charming hand-painted ceramic pitcher, perfect for serving beverages at gatherings or parties.",
    price: 34.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 8,
      width: 6,
      depth: 4,
    },
  },
  {
    name: "Rustic Ceramic Soup Bowl",
    creator: "<Creator ObjectId>",
    description:
      "Rustic ceramic soup bowl with a textured finish, perfect for enjoying soups and stews.",
    price: 19.99,
    stock: 4,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 3,
      width: 7,
      depth: 7,
    },
  },
  {
    name: "Hand-Thrown Ceramic Teapot",
    creator: "<Creator ObjectId>",
    description:
      "Hand-thrown ceramic teapot with a comfortable handle and a classic design, ideal for tea enthusiasts.",
    price: 54.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 8,
      width: 10,
      depth: 6,
    },
  },
  {
    name: "Artisan Ceramic Salad Bowl",
    creator: "<Creator ObjectId>",
    description:
      "Artisan ceramic salad bowl featuring a vibrant glaze, perfect for serving salads or pasta dishes.",
    price: 29.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 4,
      width: 12,
      depth: 12,
    },
  },
  {
    name: "Ceramic Coasters Set",
    creator: "<Creator ObjectId>",
    description:
      "Set of four ceramic coasters with a variety of hand-painted designs, perfect for protecting surfaces.",
    price: 24.99,
    stock: 3,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 0.5,
      width: 4,
      depth: 4,
    },
  },
  {
    name: "Hand-Stamped Ceramic Spoon Rest",
    creator: "<Creator ObjectId>",
    description:
      "Hand-stamped ceramic spoon rest with a glazed finish, designed to keep your countertops clean while cooking.",
    price: 14.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 1,
      width: 5,
      depth: 3,
    },
  },
  {
    name: "Whimsical Ceramic Wall Art",
    creator: "<Creator ObjectId>",
    description:
      "Whimsical ceramic wall art featuring intricate designs and vibrant colors, perfect for adding charm to any room.",
    price: 49.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 12,
      width: 12,
      depth: 1,
    },
  },
  {
    name: "Handmade Ceramic Plant Pot",
    creator: "<Creator ObjectId>",
    description:
      "Handmade ceramic plant pot with a unique textured finish, ideal for displaying small indoor plants.",
    price: 19.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 6,
      width: 5,
      depth: 5,
    },
  },
  {
    name: "Ceramic Incense Burner",
    creator: "<Creator ObjectId>",
    description:
      "Ceramic incense burner featuring a minimalist design, perfect for creating a calming atmosphere in your space.",
    price: 17.99,
    stock: 6,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 0.5,
      width: 6,
      depth: 1,
    },
  },
  {
    name: "Handcrafted Ceramic Candle Holder",
    creator: "<Creator ObjectId>",
    description:
      "Beautiful handcrafted ceramic candle holder, perfect for creating a cozy ambiance in any room.",
    price: 29.99,
    stock: 12,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 4,
      width: 4,
      depth: 4,
    },
  },
  {
    name: "Artisanal Ceramic Soap Dish",
    creator: "<Creator ObjectId>",
    description:
      "Artisanal ceramic soap dish with a unique glaze, designed to add a touch of elegance to your bathroom.",
    price: 12.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 1,
      width: 5,
      depth: 4,
    },
  },
  {
    name: "Hand-Painted Ceramic Spoon Set",
    creator: "<Creator ObjectId>",
    description:
      "Set of six hand-painted ceramic spoons with assorted designs, perfect for stirring and serving.",
    price: 19.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 1,
      width: 1,
      depth: 6,
    },
  },
  {
    name: "Ceramic Trivet with Floral Design",
    creator: "<Creator ObjectId>",
    description:
      "Ceramic trivet featuring a delicate floral design, ideal for protecting your tabletops from hot pots and pans.",
    price: 18.99,
    stock: 0,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 0.5,
      width: 7,
      depth: 7,
    },
  },
  {
    name: "Hand-Thrown Ceramic Butter Dish",
    creator: "<Creator ObjectId>",
    description:
      "Hand-thrown ceramic butter dish with a rustic charm, perfect for serving butter at the dining table.",
    price: 22.99,
    stock: 3,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 3,
      width: 5,
      depth: 4,
    },
  },
  {
    name: "Handcrafted Ceramic Serving Platter",
    creator: "<Creator ObjectId>",
    description:
      "Exquisite handcrafted ceramic serving platter, perfect for showcasing appetizers or main courses.",
    price: 39.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 1,
      width: 12,
      depth: 12,
    },
  },
  {
    name: "Artisan Ceramic Coaster Set",
    creator: "<Creator ObjectId>",
    description:
      "Set of four artisan ceramic coasters with intricate designs, ideal for protecting your tabletops.",
    price: 24.99,
    stock: 1,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 0.5,
      width: 4,
      depth: 4,
    },
  },
  {
    name: "Hand-Painted Ceramic Fruit Bowl",
    creator: "<Creator ObjectId>",
    description:
      "Hand-painted ceramic fruit bowl featuring a vibrant design, perfect for displaying fresh fruits.",
    price: 29.99,
    stock: 2,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 5,
      width: 10,
      depth: 10,
    },
  },
  {
    name: "Rustic Ceramic Butter Bell",
    creator: "<Creator ObjectId>",
    description:
      "Rustic ceramic butter bell designed to keep butter fresh and spreadable at room temperature.",
    price: 19.99,
    stock: 0,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 4,
      width: 4,
      depth: 4,
    },
  },
  {
    name: "Hand-Thrown Ceramic Coffee Mug",
    creator: "<Creator ObjectId>",
    description:
      "Hand-thrown ceramic coffee mug with a comfortable handle, perfect for enjoying your morning brew.",
    price: 16.99,
    stock: 5,
    category: ["<Category ObjectId>"],
    type: ["<Type ObjectId>"],
    dimensions: {
      height: 4,
      width: 4,
      depth: 4,
    },
  },
];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createTypes();
  await createCreators();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name, description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function creatorCreate(
  index,
  firstName,
  lastName,
  companyName,
  city,
  province,
  description = ""
) {
  const creator = new Creator({
    firstName,
    lastName,
    companyName,
    city,
    province,
    description,
  });

  await creator.save();
  creators[index] = creator;
  console.log(`Added creator: ${firstName} ${lastName}`);
}

async function itemCreate(
  index,
  name,
  description,
  creator,
  price,
  stock,
  category,
  type,
  dimensions
) {
  const itemDetail = {
    name,
    creator,
    description,
    price,
    stock,
    dimensions,
  };

  if (category != false) itemDetail.category = category;
  if (type != false) itemDetail.type = type;

  const item = new Item(itemDetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function typeCreate(index, name) {
  const type = new Type({ name });
  await type.save();
  types[index] = type;
  console.log(`Added type: ${name}`);
}

async function createCreators() {
  console.log("Adding creators");
  await creatorCreate(
    0,
    "Sadie",
    "Puddister",
    "SADIE Pottery",
    "Sudbury",
    "ON",
    "Small batch handmade pottery."
  );
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      testData[0].name,
      testData[0].description,
      creators[0],
      testData[0].price,
      testData[0].stock,
      [categories[2]],
      [types[2]],
      testData[0].dimensions
    ),
    itemCreate(
      1,
      testData[1].name,
      testData[1].description,
      creators[0],
      testData[1].price,
      testData[1].stock,
      [categories[4]],
      [types[1], types[16]],
      testData[1].dimensions
    ),
    itemCreate(
      2,
      testData[2].name,
      testData[2].description,
      creators[0],
      testData[2].price,
      testData[2].stock,
      [categories[3]],
      [types[30]],
      testData[2].dimensions
    ),
    itemCreate(
      3,
      testData[3].name,
      testData[3].description,
      creators[0],
      testData[3].price,
      testData[3].stock,
      [categories[1]],
      [types[14], types[15]],
      testData[3].dimensions
    ),
    itemCreate(
      4,
      testData[4].name,
      testData[4].description,
      creators[0],
      testData[4].price,
      testData[4].stock,
      [categories[0]],
      [types[3]],
      testData[4].dimensions
    ),
    itemCreate(
      5,
      testData[5].name,
      testData[5].description,
      creators[0],
      testData[5].price,
      testData[5].stock,
      [categories[1]],
      [types[13]],
      testData[5].dimensions
    ),
    itemCreate(
      6,
      testData[6].name,
      testData[6].description,
      creators[0],
      testData[6].price,
      testData[6].stock,
      [categories[2]],
      [types[22]],
      testData[6].dimensions
    ),
    itemCreate(
      7,
      testData[7].name,
      testData[7].description,
      creators[0],
      testData[7].price,
      testData[7].stock,
      [categories[1]],
      [types[12]],
      testData[7].dimensions
    ),
    itemCreate(
      8,
      testData[8].name,
      testData[8].description,
      creators[0],
      testData[8].price,
      testData[8].stock,
      [categories[2]],
      [types[41]],
      testData[8].dimensions
    ),
    itemCreate(
      9,
      testData[9].name,
      testData[9].description,
      creators[0],
      testData[9].price,
      testData[9].stock,
      [categories[0]],
      [types[42]],
      testData[9].dimensions
    ),
    itemCreate(
      10,
      testData[10].name,
      testData[10].description,
      creators[0],
      testData[10].price,
      testData[10].stock,
      [categories[4]],
      [types[37]],
      testData[10].dimensions
    ),
    itemCreate(
      11,
      testData[11].name,
      testData[11].description,
      creators[0],
      testData[11].price,
      testData[11].stock,
      [categories[3]],
      [types[28], types[29]],
      testData[11].dimensions
    ),
    itemCreate(
      12,
      testData[12].name,
      testData[12].description,
      creators[0],
      testData[12].price,
      testData[12].stock,
      [categories[4]],
      [types[43]],
      testData[12].dimensions
    ),
    itemCreate(
      13,
      testData[13].name,
      testData[13].description,
      creators[0],
      testData[13].price,
      testData[13].stock,
      [categories[4]],
      [types[40]],
      testData[13].dimensions
    ),
    itemCreate(
      14,
      testData[14].name,
      testData[14].description,
      creators[0],
      testData[14].price,
      testData[14].stock,
      [categories[4]],
      [types[44]],
      testData[14].dimensions
    ),
    itemCreate(
      15,
      testData[15].name,
      testData[15].description,
      creators[0],
      testData[15].price,
      testData[15].stock,
      [categories[1]],
      [types[45]],
      testData[15].dimensions
    ),
    itemCreate(
      16,
      testData[16].name,
      testData[16].description,
      creators[0],
      testData[16].price,
      testData[16].stock,
      [categories[0]],
      [types[46]],
      testData[16].dimensions
    ),
    itemCreate(
      17,
      testData[17].name,
      testData[17].description,
      creators[0],
      testData[17].price,
      testData[17].stock,
      [categories[0]],
      [types[10]],
      testData[17].dimensions
    ),
    itemCreate(
      18,
      testData[18].name,
      testData[18].description,
      creators[0],
      testData[18].price,
      testData[18].stock,
      [categories[1]],
      [types[16]],
      testData[18].dimensions
    ),
    itemCreate(
      19,
      testData[19].name,
      testData[19].description,
      creators[0],
      testData[19].price,
      testData[19].stock,
      [categories[2]],
      [types[41]],
      testData[19].dimensions
    ),
    itemCreate(
      20,
      testData[20].name,
      testData[20].description,
      creators[0],
      testData[20].price,
      testData[20].stock,
      [categories[0]],
      [types[1], types[17]],
      testData[20].dimensions
    ),
    itemCreate(
      21,
      testData[21].name,
      testData[21].description,
      creators[0],
      testData[21].price,
      testData[21].stock,
      [categories[0]],
      [types[10]],
      testData[21].dimensions
    ),
    itemCreate(
      22,
      testData[22].name,
      testData[22].description,
      creators[0],
      testData[22].price,
      testData[22].stock,
      [categories[2]],
      [types[2]],
      testData[22].dimensions
    ),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    //index, name, description
    categoryCreate(
      0,
      "Kitchen",
      "Plates, bowls, pitchers, casserole dishes, baking dishes, mixing bowls, storage jars, utensil holders, bread bins, and butter dishes."
    ),
    categoryCreate(
      1,
      "Dining",
      "Dinner plates, side plates, salad bowls, soup bowls, dessert plates, serving platters, serving bowls, gravy boats, and salt and pepper shakers."
    ),
    categoryCreate(
      2,
      "Drinkware",
      "Cups, mugs, teapots, coffee pots, pitchers, tumblers, wine goblets, and beer steins."
    ),
    categoryCreate(
      3,
      "Garden",
      "Flower pots, planters, vases, hanging baskets, birdbaths, lanterns, and garden sculptures."
    ),
    categoryCreate(
      4,
      "Decorative",
      "Sculptures, figurines, decorative plates, wall hangings, decorative tiles, incense burners, and candle holders."
    ),
  ]);
}

async function createTypes() {
  console.log("Adding types");
  await Promise.all([
    //index, name
    typeCreate(0, "Plate"),
    typeCreate(1, "Bowl"),
    typeCreate(2, "Mug"),
    typeCreate(3, "Pitcher"),
    typeCreate(4, "Casserole Dish"),
    typeCreate(5, "Baking Dish"),
    typeCreate(6, "Mixing Bowl"),
    typeCreate(7, "Jar"),
    typeCreate(8, "Utensil Holder"),
    typeCreate(9, "Bread Bin"),
    typeCreate(10, "Butter Dish"),
    typeCreate(11, "Dinner Plate"),
    typeCreate(12, "Salad Bowl"),
    typeCreate(13, "Soup Bowl"),
    typeCreate(14, "Side Plate"),
    typeCreate(15, "Dessert Plate"),
    typeCreate(16, "Serving Platter"),
    typeCreate(17, "Serving Bowl"),
    typeCreate(18, "Gravy Boat"),
    typeCreate(19, "Salt Shaker"),
    typeCreate(20, "Pepper Shaker"),
    typeCreate(21, "Cup"),
    typeCreate(22, "Teapot"),
    typeCreate(23, "Coffe Pot"),
    typeCreate(24, "Pitcher"),
    typeCreate(25, "Tumbler"),
    typeCreate(26, "Wine Goblet"),
    typeCreate(27, "Beer Stein"),
    typeCreate(28, "Flower Pot"),
    typeCreate(29, "Planter"),
    typeCreate(30, "Vase"),
    typeCreate(31, "Hanging Basket"),
    typeCreate(32, "Birdbath"),
    typeCreate(33, "Lantern"),
    typeCreate(34, "Sculpture"),
    typeCreate(35, "Figurines"),
    typeCreate(36, "Decorative Plate"),
    typeCreate(37, "Wall Hanging"),
    typeCreate(38, "Decorative Tile"),
    typeCreate(39, "Pottery Lamp"),
    typeCreate(40, "Candle Holder"),
    typeCreate(41, "Coasters"),
    typeCreate(42, "Spoonrest"),
    typeCreate(43, "Incense Burner"),
    typeCreate(44, "Soap Dish"),
    typeCreate(45, "Spoon"),
    typeCreate(46, "Trivet"),
  ]);
}
