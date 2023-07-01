const express = require("express");
const router = express.Router();
const materialesController = require("../controllers/materiales.controller")

router.post("/", materialesController.create);
router.get("/", materialesController.find);
router.get("/:id", materialesController.findById);
router.put("/:id", materialesController.update);
router.delete("/:id", materialesController.remove);


module.exports = router