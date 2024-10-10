import { Router } from "express";
import { fetchCryptoPrice } from "../controllers/getCryptoData.controller.js"

const router = Router();

router.route('/stats/:coin').get(fetchCryptoPrice);

export default router;