const { USER_COLLECTION } = require("../config/Collection");
const db = require("../config/Connection");
const { uploadFile } = require("./awsS3Controllers");
const objectId = require("mongodb").ObjectID;
const { ObjectId } = require("mongodb");
const fs = require("fs");
module.exports = {
  test: (req, res) => {
    res.json({ message: "test request" });
  },

  createUser: (req, res) => {
    return new Promise(async (resolve, reject) => {
      try {
        let file = req.file;

        const result = await uploadFile(file);
        console.log(result,"LLl");
        let { fullname, email, mobile, date, radio } = req.body;
        let user = await db.get().collection(USER_COLLECTION).insertOne({
          Fullname: fullname,
          Email: email,
          Mobile: mobile,
          Date: date,
          Radio: radio,
          Path: result.Location,
        });

        res.status(200).json({ message: "data added", user });
        console.log("success");
      } catch (error) {}
    });
  },

  getUsers: async (req, res) => {
    try {
      const users = await db.get().collection(USER_COLLECTION).find().toArray();

      if (users == null)
        return res.status(204).json({ message: "user collection are empty" });

      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.body;
      let user = await db
        .get()
        .collection(USER_COLLECTION)
        .findOne({ _id: ObjectId(id) });
      res.status(200).json({ message: "get user", user });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },

  Update: async (req, res) => {
    let { fullname, email, mobile, date, radio, id } = req.body;
    console.log(id);

    try {
      let file = req.file;
      if(file){

        const result = await uploadFile(file);
        let user = await db
          .get()
          .collection(USER_COLLECTION)
          .updateOne(
            { _id: ObjectId(id) },
            {
              $set: {
                Fullname: fullname,
                Email: email,
                Mobile: mobile,
                Date: date,
                Radio: radio,
                Path: result.Location,
              },
            }
          );
          res.status(200).json({ message: "update", user });
      }
      else{
        let user = await db
        .get()
        .collection(USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              Fullname: fullname,
              Email: email,
              Mobile: mobile,
              Date: date,
              Radio: radio,
            },
          }
        );
        res.status(200).json({ message: "update", user });
      }


    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
  },

  Delete: async (req, res) => {
    const { id } = req.body;
    try {
      let user = await db
        .get()
        .collection(USER_COLLECTION)
        .deleteOne({ _id: objectId(id) });

      res.status(200).json({ message: "get user", user });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
};
