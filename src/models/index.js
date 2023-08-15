const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Category.hasMany(Product); // categoryId
Product.belongsTo(Category);
