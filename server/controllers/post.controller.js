const { handle_error } = require("../lib/error_handler");
const { Post, User, user_and_post_association, post_and_user_association, post_and_comment_association, post_and_categories_association, categories_and_post_association } = require("../models");

exports.get_all_posts = async (req, res, next) => {
  try {
    const response = await Post.findAndCountAll(
    {attributes: {exclude: ["author_id"]},
    // include: [{association: post_and_user_association, attributes: ["first_name"]}]
    include: [{ association : post_and_user_association, post_and_comment_association},
              {association: post_and_categories_association, attributes: ["name", "description"] , through: {attributes: []}}]
            }
    );

    // in order to remove junction table information use through property in include and set it to attributes []

    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting posts", err);
    handle_error(res, err);
  }
};

exports.get_user_posts = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({where: {uuid: user_id}, attributes: ["id"]});
    if(!user) return res.status(404).json({message: "User not found"});

    const response = await Post.findAll({where: {author_id: user.id}});
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting posts", err);
    handle_error(res, err);
  }
};

exports.get_post_by_id = async (req, res, next) => {
  // not checking if user exists
  const { user_id, post_id } = req.params;

  try {
    const response = await Post.findOne({
      where: {
        uuid: post_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Post not found" });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting post", err);
    handle_error(res, err);
  }
};

exports.create_post = async (req, res, next) => {
  const { user_id } = req.params;
  const {title = "", content = "", summary = "", categories = []} = req.body;
  const post = {title, content, summary};

  const user = await User.findOne({where: {uuid : user_id}, attributes: ["id"]});
  if(!user) return res.status(404).json({message: "User not found"});

  
  const category_ids = categories.map((item)=>id = item.id);
  console.log(category_ids);
  // return res.status(201).send("true");
  
  
  const payload = { ...post, author_id: user.id};

  // adding categories id
  // if(payload.categories){
  //   payload.categories = 
  // }

  console.log("PAYLOAD ==============", payload);

  try {
    // post_and_categories_association
    const response = await Post.create(payload,{
      include: [post_and_user_association, post_and_categories_association]
    });
    if (!response) throw new Error("Post could not be created");

    await response.addCategories(category_ids);
    res.status(201).send(response);
  } catch (err) {
    console.log("Error while creating post", err);
    handle_error(res, err);
  }
};

exports.edit_post = async (req, res, next) => {
  const { user_id, post_id } = req.params;
  const post = req.body;
  try {
    const user = await User.findOne({where: {uuid: user_id}});
    if(!user) return res.status(404).json({message: "User not found"});


    const [response] = await Post.update(post, {
      where: {
        uuid: post_id,
      },
      include: [post_and_user_association]
    });
    if (!response) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post updated successfully!" });
  } catch (err) {
    console.log("Error while updating post", err);
    handle_error(res, err);
  }
};

exports.archive_post = async (req, res, next) => {
  // not checking if user exists
  const { user_id, post_id } = req.params;

  try {
    const response = await Post.destroy({
      where: {
        uuid: post_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (err) {
    console.log("Error while deleting post", err);
    handle_error(res, err);
  }
};

exports.restore_post = async (req, res, next) => {
  // not checking if user exists
  const { user_id, post_id } = req.params;
  
  try {
    const response = await Post.restore({
      where: {
        uuid: post_id,
      },
    });
    if (!response) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post restored successfully!" });
  } catch (err) {
    console.log("Error while restoring post", err);
    handle_error(res, err);
  }
};
