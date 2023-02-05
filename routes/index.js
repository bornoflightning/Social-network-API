const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("Incorrect input, check your resources and try again.");
});


module.exports = router;