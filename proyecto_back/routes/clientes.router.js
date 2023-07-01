const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientes.controller")

router.post("/", clientesController.create);
router.get("/", clientesController.find);
router.get("/:id", clientesController.findById);
router.put("/:id", clientesController.update);
router.delete("/:id", clientesController.remove);


module.exports = router