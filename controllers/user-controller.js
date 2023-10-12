const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(409).json({ Error: "user is already exist" });
    }

    const salt = bcrypt.genSaltSync(16);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    const registerUser = await user.save();

    return res
      .status(201)
      .json({ user: registerUser, message: "user register succesfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ Error: "user not exist" });
    }

    const ComparePasswword = bcrypt.compareSync(password, userExist.password);

    if (!ComparePasswword) {
      return res.status(401).json({ message: "email and password invalid" });
    }

    const jwtToken = jwt.sign(
      { email: userExist.email, userId: userExist._id },
      process.env.SECRET_KEY
    );

    return res.status(200).json({ accesstoken: jwtToken });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
};
