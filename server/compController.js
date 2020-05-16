const express = require('express');
const compServices = require("./compService");

const router = express.Router();

router.get('/', compServices.getComps);
router.post("/new", compServices.createComp);
router.put("/edit/:id", compServices.updateComp);
router.delete("/delete/:id", compServices.deleteComp);


module.exports = router;