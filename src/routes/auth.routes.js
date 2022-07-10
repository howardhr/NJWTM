import  {Router}  from "express";
import  * as authCtrl  from "../controllers/authController";
const router = Router()
router.post('/singup', authCtrl.singup)
router.post('/singin', authCtrl.singin)

export default router