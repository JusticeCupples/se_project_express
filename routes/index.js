const router = require("express").Router();
const clothingItem = require("./clothingitems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { validateUserBody, validateAuthentication } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
