import express from 'express';
const router = express.Router();

import FavController from '../controllers/fav.controller.js';

router.post("/favorites", FavController.createFav);
router.patch("/favorites/:id", FavController.updateFav);
router.delete("/favorites/:id", FavController.deleteFav);

export default router;
