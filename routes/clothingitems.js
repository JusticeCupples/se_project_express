const router = require("express").Router();
const { getAllItems, createItem, deleteItem, likeItem, dislikeItem } = require("../controllers/clothingitems");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require('../middlewares/validation');

router.get("/", getAllItems);
router.use(auth);
router.post("/", validateCardBody, createItem);
router.delete("/:id", validateId, deleteItem);
router.put("/:id/likes", validateId, likeItem);
router.delete("/:id/likes", validateId, dislikeItem);
module.exports = router;
