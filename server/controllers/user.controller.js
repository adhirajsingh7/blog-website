const { handle_error } = require("../lib/error_handler");
const { User, user_and_post_association, post_and_comment_association, post_and_categories_association } = require("../models");
const { generate_token } = require("../lib/util");
const jwt = require("jsonwebtoken");

exports.get_users = async (req, res, next) => {
  try {
    // const response = await User.findAndCountAll({include: [user_and_post_association]});
    // const response = await User.findAndCountAll({include: [{association: user_and_post_association, include: post_and_comment_association}]});
    
    // all models easily
    const response = await User.findAndCountAll({include: {all: true, nested: true}});

    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting users", err);
    handle_error(res, err);
  }
};

exports.get_user_by_id = async (req, res, next) => {
  let { user_id } = req.params;
  const t = req.cookies["token"];
  if (t) {
    const { user } = jwt.decode(t);
    user_id = user;
    console.log(user);
  }

  try {
    const response = await User.findOne({
      where: {
        uuid: user_id,
      },
    });
    if (!response) return res.status(404).json({ message: "User not found" });
    res.status(200).send(response);
  } catch (err) {
    console.log("Error while getting user", err);
    handle_error(res, err);
  }
};

exports.create_user = async (req, res, next) => {
  const user = req.body;
  try {
    const response = await User.create(user);
    if (!response) throw new Error("User could not be created");
    res.status(201).send(response);
  } catch (err) {
    console.log("Error while creating user", err);
    handle_error(res, err);
  }
};

exports.edit_user = async (req, res, next) => {
  const { user_id } = req.params;
  const user = req.body;
  try {
    // using [] because returned value is [1]
    const [response] = await User.update(user, {
      where: {
        uuid: user_id,
      },
    });
    if (!response) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    console.log("Error while updating user", err);
    handle_error(res, err);
  }
};

exports.archive_user = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const response = await User.destroy({
      where: {
        uuid: user_id,
      },
    });
    if (!response) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.log("Error while deleting user", err);
    handle_error(res, err);
  }
};

exports.restore_user = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const response = await User.restore({
      where: {
        uuid: user_id,
      },
    });
    if (!response) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User restored successfully!" });
  } catch (err) {
    console.log("Error while restoring user", err);
    handle_error(res, err);
  }
};

exports.login_user = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).json({ message: "User does not exists" });

    if (password !== user.password)
      return res.status(400).json({ message: "Invalid password" });

    const token = generate_token(user.uuid);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "User logged in successfully!" });
  } catch (err) {
    console.log("Error while loggin in : ", err);
    handle_error(res, err);
  }
};

exports.signup_user = async (req, res, next) => {
  const { email, password } = req.body;
  const user_exists = await User.findOne({
    where: {
      email,
    },
  });
  if (user_exists) throw Error("User already exists");
  const user = await User.create({
    email,
    password,
  });

  const token = generate_token(user.uuid);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(201).send(user);

  return user_exists;
};

exports.logout_user = async(req, res, next)=>{
  res.clearCookie("token");
  res.status(200).send("logout user")
}
