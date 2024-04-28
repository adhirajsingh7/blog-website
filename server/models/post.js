const sequelize = require("../config/db_connection");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const Post = sequelize.define(
  "Post",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    // author_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "User",
    //     key: "id",
    //   },
    // },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
        notNull: { msg: "Title is required" },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Content is required" },
        notNull: { msg: "Content is required" },
      },
    },
    summary: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      set() {
        const title = this.getDataValue("title");
        this.dataValues("slug", title);
      },
    },
  },
  {
    sequelize,
    tableName: "posts",
    paranoid: true,
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// const post_and_user_association = Post.belongsTo(User, {
//   foreignKey: "author_id",
//   as: "user"
// });
// const post_and_comment_association = Post.hasMany(Comment, {foreignKey: "post_id" ,as: "comments"});

module.exports = Post;
