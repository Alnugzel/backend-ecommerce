const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Product.belongsTo(Category);
Category.hasMany(Product); // categoryId
