import {Router} from 'express';
import {authenticateController} from '../controllers/authenticate.controller';
import {userController} from "../controllers/user.controller";

const router = Router();

/**
 * authenticate 
 */
router.get('/', async (req, res, next) => {
	try {
		console.log('token', (req.headers.authorization || '').split('Bearer ')[1]);
		res.send(await authenticateController.authenticate(req.user, {}, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * authenticate facebook
 */
router.post('/facebook', async (req, res, next) => {
	try {
		res.send(await authenticateController.authenticateFacebook(req.user, req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * password reset request
 */
router.post('/request-password-reset', async (req, res, next) => {
	try {
		res.send(await authenticateController.requestPasswordReset(req.user, req.body.email));
	} catch (error) {
		next(error);
	}
});


/**
 * login
 */
router.post('/', async (req, res, next) => {
	try {
		res.send(await authenticateController.authenticate(req.user, req.body, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * password update
 */
router.put('/', async (req, res, next) => {
	try {
		res.send(await userController.updatePassword(req.user, req.body.token, req.body.password));
	} catch (error) {
		next(error);
	}
});

export = router;