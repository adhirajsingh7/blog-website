require("dotenv").config();
const { validate } = require("uuid");
const jwt = require("jsonwebtoken");

async function is_valid_uuid(id) {
  return validate(id);
}

function find_paginated(page, limit) {
  page = Math.abs(parseInt(page)) || 1;
  limit = Math.abs(parseInt(limit)) || 10;

  limit = limit > 50 ? 50 : limit;
  page = page >= 1 ? page - 1 : 0;

  const offset = page * limit;

  return { limit, offset, page };
}

function generate_token(user) {
  const token = jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "10h",
  });
  return token;
}

module.exports = {
  is_valid_uuid,
  find_paginated,
  generate_token,
};
