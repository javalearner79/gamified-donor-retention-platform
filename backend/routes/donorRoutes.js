import { Router } from 'express';
import {
  createDonor,
  deleteDonor,
  getDonorById,
  getDonors,
  updateDonor,
} from '../controllers/donorController.js';

const router = Router();

router.route('/').post(createDonor).get(getDonors);
router.route('/:id').get(getDonorById).put(updateDonor).delete(deleteDonor);

export default router;
