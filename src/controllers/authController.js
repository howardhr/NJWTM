import User from "../model/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../model/Roles";
export const singup = async (req, res) => {
    const { username, email, password, roles } = req.body

    const newPassword = await User.encryptPassword(password);
    const newUser = new User({
        username, email, password: newPassword
    })
    if (roles) {
        const foundRoles = await Roles.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)

    } else {
        const role = await Roles.findOne({ name: "user" })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    res.json(savedUser)
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 648000
    })

    res.json({ token })
}

export const singin = async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email }).populate('roles')

    if (!userFound) return res.status(400).json({ message: 'Usuarion no Encontrado' })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(400).json({ token: null, message: 'Datos Invalidos' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET,
        { expiresIn: 648000 }
    )
  

    console.log(userFound);
    res.json({ token })
}



