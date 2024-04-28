const { handle_error } = require("../lib/error_handler");
const { Post, Comment, post_and_comment_association, comment_and_post_association } = require("../models");

exports.get_all_comments = async (req, res, next) => {
  try {
    const response = await Comment.findAndCountAll({
      attributes: {exclude: ["id", "post_id"]},
      // include: {model: "post"}
      include: [comment_and_post_association ]
    });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting comments", err);
    handle_error(res, err);
  }
};

exports.get_post_comments = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const post = await Post.findOne({where: {uuid: post_id}, attributes: ["id"]});
    if(!post) return res.status(404).json({message: "Post not found"});

    const response = await Comment.findAll({where: {post_id: post.id}});
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting comments of post", err);
    handle_error(res, err);
  }
};

// **************************** NOT CHECKING ******************************************/
exports.get_comment_by_id = async (req, res, next) => {
  // not checking if post exists
  const { post_id, comment_id } = req.params;

  try {
    const response = await Comment.findOne({
      where: {
        uuid: comment_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Comment not found" });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting comment by id", err);
    handle_error(res, err);
  }
};

exports.create_comment = async (req, res, next) => {
  const { post_id } = req.params;
  const comment = req.body;

  const post = await Post.findOne({where: {uuid : post_id}, attributes: ["id"]});
  if(!post) return res.status(404).json({message: "Post not found"});

  const payload = { ...comment, post_id: post.id };

  // console.log(payload)
  // return res.status(200).send("hey")

  try {
    const response = await Comment.create(payload,{
      include: [comment_and_post_association]
    });
    if (!response) throw new Error("Comment could not be created");
    res.status(201).send(response);
  } catch (err) {
    console.log("Error while creating comment", err);
    handle_error(res, err);
  }
};

exports.edit_comment = async (req, res, next) => {
  const { post_id, comment_id } = req.params;
  const comment = req.body;
  
  try {
    const post = await Post.findOne({where: {uuid: post_id}});
    if(!post) return res.status(404).json({message: "Post not found"});


    const [response] = await Comment.update(comment, {
      where: {
        uuid: comment_id,
      },
      include: [comment_and_post_association]
    });
    if (!response) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment updated successfully!" });
  } catch (err) {
    console.log("Error while updating commment", err);
    handle_error(res, err);
  }
};

exports.archive_comment = async (req, res, next) => {
  // not checking if post exists
  const { post_id, comment_id } = req.params;

  try {
    const response = await Comment.destroy({
      where: {
        uuid: comment_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    console.log("Error while deleting comment", err);
    handle_error(res, err);
  }
};

exports.restore_comment = async (req, res, next) => {
  // not checking if post exists
  const { post_id, comment_id } = req.params;

  try {
    const response = await Comment.restore({
      where: {
        uuid: comment_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment restored successfully!" });
  } catch (err) {
    console.log("Error while restoring comment", err);
    handle_error(res, err);
  }
};
