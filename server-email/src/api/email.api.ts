import {Router} from 'express';
import {emailController} from '../controllers/email.controller';

const router = Router();

/**
 * Password reset
 */
router.post('/request-password-reset', async (req, res, next) => {
	console.log(req.body);

	try {
		res.send(await emailController.requestPasswordReset(req.user, req.body.user));
	} catch (error) {
		next(error);
	}
});

export = router;