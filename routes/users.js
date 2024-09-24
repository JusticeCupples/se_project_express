const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserBody } = require('../middlewares/validation');

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateUser);

module.exports = router;
