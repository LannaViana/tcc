import express from 'express';
const router = express.Router();

import SkinsController from '../controllers/skins.controller.js';

router.post("/skins", SkinsController.createSkin);
router.patch("/skins/:id", SkinsController.updateSkin);
router.delete("/skins/:id", SkinsController.deleteSkin);

export default router;
