//These are functions that will be executed when someone hits certain url or api_endpoint

import { userModel } from "../schemas/users.js";

//The explanation of all these functions are in the README.md file. Do check that out to understacd thoroughly

//Read
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.json({ allUsers });
  } catch (error) {
    res.json({ error });
  }
};

//Create
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new userModel({ name });
    await newUser.save();
    res.json({ newUser });
  } catch (error) {
    res.json({ error });
  }
};

// Delete
export const deleteUser = async (req, res) => {
  try {
    const deleteStatus = await userModel.deleteOne({
      _id: req.params.id,
    });

    res.json(deleteStatus);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//Update
export const updateUser = async (req, res) => {
  const response = await userModel.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.newName }
  );
  res.json(res.body);
};
