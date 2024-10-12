import bcrypt from "bcrypt";
import { Users } from "../model/userModel"
import jwt from "jsonwebtoken";
import { checkReqBody } from "../utils/utils";

const Register = async (req, res) => {
    if (!checkReqBody(req.body, "username", "email", "password")) {
        return res.status(409).json({
            error: true,
            message: "The request parameter is wrong"
        });
    }
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = bcrypt.hash(password, salt);
    try {
        const dataExists = await Users.findOne({ email: email });
        if (dataExists) {
            return res.status(409).json({
                error: true,
                message: "The email is registered"
            });
        }
        const newUser = new Users({
            username: username,
            email: email,
            password: hashPassword
        });
        await newUser.save();

        return res.status(201).json({
            error: false,
            message: "User registerd Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Internal server error occured"
        });
    }
}

const Login = async (req, res) => {
    try {
        if (!checkReqBody(req.body, "email", "password")) {
            return res.status(409).json({
                error: true,
                message: "The request parameter is wrong"
            });
        }
        const getUserData = await Users.findOne({ email: { $regex: new RegExp(req.body.email, "i") } });
        if (!getUserData) {
            return res.status(409).json({
                error: true,
                message: "The email is not Exists"
            });
        }
        const passMatching = await bcrypt.compare(req.body.password, getUserData.password);
        if (!passMatching) {
            return res.status(409).json({
                error: true,
                message: "Wrong password"
            });
        }
        const { _id, username, email } = getUserData;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const accessToken = jwt.sign({ userId: _id }, jwtSecretKey, {
            expiresIn: '7d'
        });
        return res.status(200).json({
            error: false,
            message: "Login succeed",
            data: {
                userId: _id,
                username: username,
                email: email,
                accessToken: accessToken
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Internal server error occured"
        });
    }
}

module.exports = { Register, Login }