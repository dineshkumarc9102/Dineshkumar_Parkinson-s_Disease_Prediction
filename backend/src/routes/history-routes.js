import express from 'express';
import { addHistory, getHistory } from "../controllers/history-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";  

const router = express.Router();

router.post("/add-history", protectRoute, addHistory);  
router.get("/user-history", protectRoute, getHistory)

export default router;
