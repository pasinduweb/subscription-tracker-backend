import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET Subscriptions' });
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET Subscription' });
});

subscriptionRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE Subscription' });
});

subscriptionRouter.put('/', (req, res) => {
    res.send({ title: 'UPDATE Subscription' });
});

subscriptionRouter.delete('/', (req, res) => {
    res.send({ title: 'DELETE Subscription' });
});

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ title: 'GET User Subscriptions' });
});

subscriptionRouter.get('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL Subscription' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET Upcoming Renewals' });
});

export default subscriptionRouter;
