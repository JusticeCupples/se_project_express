const router = require("express").Router();
const clothingItem = require("./clothingitems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const { ERROR_CODES } = require("../utils/errors");
const { validateUserBody, validateAuthentication } = require('../middlewares/validation');

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
