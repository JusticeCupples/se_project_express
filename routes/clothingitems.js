const router = require("express").Router();
const { getAllItems, getItems, createItem, deleteItem, likeItem, dislikeItem } = require("../controllers/clothingitems");
const auth = require("../middlewares/auth");

router.get("/", getAllItems);
router.use(auth);
router.get("/user", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
