import express from 'express';
const router = express.Router();

import UsersController from '../controllers/users.controller.js'

router.post("/users", UsersController.createUser);
router.patch("/users/:id", UsersController.updateUser);
router.delete("/users/:id", UsersController.deleteUser);

export default router;
