import { Router } from 'express';
import { createDonation, deleteDonation, getDonations } from '../controllers/donationController.js';

const router = Router();

router.route('/').post(createDonation).get(getDonations);
router.delete('/:id', deleteDonation);

export default router;
