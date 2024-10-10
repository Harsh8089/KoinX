import { Router } from "express";
import { calcuateDeviation } from "../controllers/cryptoDeviation.controller.js";

const router = Router();

router.route('/deviation/:coin').get(calcuateDeviation);

export default router;