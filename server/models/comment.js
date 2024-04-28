const sequelize = require("../config/db_connection");
const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./post");


const Comment = sequelize.define(
  "Comment",
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    paranoid: true,
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// const comment_and_post_association = Comment.belongsTo(Post, {foreignKey: "post_id",as : "post"});


module.exports = Comment;
