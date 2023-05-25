const router = require("express").Router();
const { signup, getUser, signin } = require("../controllers/users");

router.get("/users", getUser);
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
