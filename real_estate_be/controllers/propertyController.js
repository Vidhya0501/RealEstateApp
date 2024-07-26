const Property = require("../models/Property.js");
const verifyToken = require("../middlewares/verifyToken.js");
const propertyController = require("express").Router();
const uploadFiles = require("../middlewares/multer.js");
const { rm } = require("fs");

//create property
propertyController.post("/", verifyToken, uploadFiles, async (req, res) => {
  try {
    const { type, location, price, description, status } = req.body;

    const image = req.file;

    if (!image)
      return res.status(400).json({
        message: "Please provide an image",
      });

    const newProperty = await Property.create({
      type,
      location,
      price,
      description,
      status,
      image: image?.path,
      currentOwner: req.user.id,
    });

    return res.status(201).json({ message: "property created", newProperty });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

//get all property

// propertyController.get("/getAll", async(req, res)=>{
//     try {
//         const properties = await Property.find({}).populate("currentOwner", "-password")

//         return res.status(200).json(properties)
//     } catch (error) {

//         return res.status(500).json("Internal Server Error")
//     }
// })

propertyController.get("/getAll", verifyToken, async (req, res) => {
  try {
    const { location, priceMin, priceMax, type } = req.query;
    const query = {};

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (priceMin) {
      query.price = { $gte: parseFloat(priceMin) };
    }
    if (priceMax) {
      query.price = { ...query.price, $lte: parseFloat(priceMax) };
    }
    if (type) {
      query.type = { $regex: new RegExp(type, "i") };
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//get individual property
propertyController.get("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "currentOwner",
      "-password"
    );

    if (!property) {
      throw new Error("No such property available");
    }
    return res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

// get my properties
propertyController.get("/find/my-properties", verifyToken, async (req, res) => {
  try {
    const properties = await Property.find({ currentOwner: req.user.id });

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
  }
});

//update property
propertyController.put("/:id", verifyToken, uploadFiles, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error("You are not allowed to edit");
    }
    const { currentOwner, ...updates } = req.body;

    if (req.file) {
      updates.image = req.file.path; // Update the image path if a new image is uploaded
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    return res.status(200).json(updatedProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//delete property

propertyController.delete("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error("You are not allowed to delete");
    }
    rm(property.image, () => {
      console.log("Image deleted"); //this is to delete product image from uploads folder
    });
    await Property.findByIdAndDelete(req.params.id);

    return res.status(200).json({ msg: "Property Deleted" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = propertyController;
