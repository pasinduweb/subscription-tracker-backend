import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET Subscriptions' }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET Subscription' }));
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/', (req, res) => res.send({ title: 'UPDATE Subscription' }));
subscriptionRouter.delete('/', (req, res) => res.send({ title: 'DELETE Subscription' }));
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.get('/:id/cancel', (req, res) => res.send({ title: 'CANCEL Subscription' }));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET Upcoming Renewals' }));

export default subscriptionRouter;
