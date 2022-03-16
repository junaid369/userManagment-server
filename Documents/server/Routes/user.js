const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {createUser,getUsers,getUser,Update,Delete}=require("../Controllers/userController")
const { uploadFile } = require("../Controllers/awsS3Controllers");
module.exports = {
    upload: multer({ dest: "uploads/" }),
  };

  
router.post("/add",upload.single('image'),createUser)
router.get("/getusers",getUsers)
router.post("/getuser",getUser)
router.post("/update",upload.single('image'),Update)
router.post("/delete",Delete)
module.exports = router;


