import express from 'express';
const router = express.Router();

import MyJobsController from '../controllers/myjobs.controller.js';

router.post("/myjobs", MyJobsController.createMyJob);
router.patch("/myjobs/:id", MyJobsController.updateMyJob);
router.delete("/myjobs/:id", MyJobsController.deleteMyJob);

export default router;
