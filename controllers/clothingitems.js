const clothingItem = require("../models/clothingitem");
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  return clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const getAllItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  clothingItem
    .findById(id)
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You are not authorized to delete this item');
      }
      return clothingItem.deleteOne({ _id: id });
    })
    .then(() => res.send({ message: 'Item deleted successfully' }))
    .catch(next);
};

const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send({ data: item }))
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send({ data: item }))
    .catch(next);
};

module.exports = {
  createItem,
  getAllItems,
  deleteItem,
  likeItem,
  dislikeItem
};