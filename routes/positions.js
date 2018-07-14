var express = require("express");
var router = express.Router();
var PositionController = require("../controllers/PositionController");

var multer = require("multer");
var storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"./public/upload");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now()+ file.originalname.slice(file.originalname.lastIndexOf(".")))
    }
});

var upload = multer({storage:storage});

router.post("/add", upload.single("logoname") ,PositionController.add);
router.get("/list" ,PositionController.list);
router.get("/all" ,PositionController.all);
router.get("/findid" ,PositionController.findid);
router.post("/modify", upload.single("logoname") ,PositionController.modify);
router.get("/delete",PositionController.delete);

module.exports = router;