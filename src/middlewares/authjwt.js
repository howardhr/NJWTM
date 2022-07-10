import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../model/Roles";
import User from "../model/User";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        console.log(token);
        if (!token) return res.status(403).json({ message: 'Token not Supplied' })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(403).json({ message: 'User no Exist' })
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Unautorize' })
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Roles.find({ _id: user.roles })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return;
        }

    }
    return res.status(403).json({ message: 'Necesitas el rol moderador' })
}
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Roles.find({ _id: user.roles })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }

    }
    return res.status(403).json({ message: 'Necesitas el rol admin' })
}