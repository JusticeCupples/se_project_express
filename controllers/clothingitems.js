const clothingItem = require("../models/clothingitem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  console.log("Received item data:", { name, weather, imageUrl, owner });

  if (!name || !weather || !imageUrl) {
    console.error("Missing required fields");
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Missing required fields" });
  }

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error("Error in createItem controller:", err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: err.message });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const getAllItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((err) => {
      console.error("Error in getAllItems controller:", err);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((err) => {
      console.error("Error in getItems controller:", err);
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;

  clothingItem
    .findByIdAndRemove(id)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error in deleteItem controller:", err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error in likeItem controller:", err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error("Error in dislikeItem controller:", err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports = {
  createItem,
  getItems,
  getAllItems,
  deleteItem,
  likeItem,
  dislikeItem,
};