exports.User = require("./user");
exports.Post = require("./post");
exports.Comment = require("./comment");
exports.Category = require("./category");



// associations
exports.user_and_post_association = this.User.hasMany(this.Post, {foreignKey: "author_id", as: "posts" });
exports.post_and_user_association = this.Post.belongsTo(this.User, {foreignKey: "author_id", as: "user" });
exports.post_and_comment_association = this.Post.hasMany(this.Comment, {foreignKey: "post_id", as: "comments"});
exports.comment_and_post_association = this.Comment.belongsTo(this.Post, {foreignKey: "post_id", as : "post"});

// foreignKey: "post_id",
exports.post_and_categories_association = this.Post.belongsToMany(this.Category, {through: "post_categories", foreignKey: "post_id", as: "categories", timestamps: false});
// foreignKey: "category_id", 
exports.categories_and_post_association = this.Category.belongsToMany(this.Post, {through: "post_categories", foreignKey: "category_id", as: "posts", timestamps: false});

