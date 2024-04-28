const { handle_error } = require("../lib/error_handler");
const { Post, Category, post_and_categories_association, categories_and_post_association } = require("../models");

exports.get_all_categories = async (req, res, next) => {
  try {
    // {include: [categories_and_post_association]}
    const response = await Category.findAndCountAll({order: [["id", 'asc']]});
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting categories", err);
    handle_error(res, err);
  }
};

exports.get_post_categories = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const post = await Post.findOne({where: {uuid: post_id}, attributes: ["id"]});
    if(!post) return res.status(404).json({message: "Post not found"});

    const response = await Post.findAll({
      where: {uuid: post_id},
      attributes: [],
      include: {association: post_and_categories_association,
      through: {attributes: []}}
    });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting comments of post", err);
    handle_error(res, err);
  }
};


exports.get_category_by_id = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const response = await Category.findOne({
      where: {
        uuid: category_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Category not found" });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting category", err);
    handle_error(res, err);
  }
};

exports.create_category = async (req, res, next) => {
  const category = req.body;
  try {
    const response = await Category.create(category);
    if (!response) throw new Error("Category could not be created");
    res.status(201).send(response);
  } catch (err) {
    console.log("Error while creating category", err);
    handle_error(res, err);
  }
};

exports.edit_category = async (req, res, next) => {
  const { category_id } = req.params;
  const category = req.body;
  try {
    const [response] = await Category.update(category, {
      where: {
        uuid: category_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category updated successfully!" });
  } catch (err) {
    console.log("Error while updating category", err);
    handle_error(res, err);
  }
};

exports.archive_category = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const response = await Category.destroy({
      where: {
        uuid: category_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (err) {
    console.log("Error while deleting category", err);
    handle_error(res, err);
  }
};

exports.restore_category = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const response = await Category.restore({
      where: {
        uuid: category_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category restored successfully!" });
  } catch (err) {
    console.log("Error while restoring category", err);
    handle_error(res, err);
  }
};
