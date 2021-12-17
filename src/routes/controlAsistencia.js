const { Router } = require("express");
const router = Router();
const { index,marcar } = require("../controllers/controlAsistenciaController");

router.get("/",index);
router.post("/marcar", marcar);

module.exports = router;
