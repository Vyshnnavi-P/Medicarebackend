import express from "express";
import { register, login,secret } from "../controllers/auth.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import { getUsersCount,getUsers,getUserByUsername,forgotPassword,resetPassword} from '../controllers/userController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users",getUsers);
router.get('/:email', getUserByUsername);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ user: req.user });
});

router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ user: req.user, isAdmin: true });
});

router.get("/secret", requireSignin, isAdmin, secret);
router.get('/users/count', getUsersCount);

export default router;