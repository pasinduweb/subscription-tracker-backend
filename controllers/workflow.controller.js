import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/subscription.model.js';

const REMINDER_DAYS = [7, 5, 2, 1];

export const sendReminder = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'Active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    // Check if the renewal date is before the current date/time
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date for ${subscriptionId} has passed - stopping the workflow.`);
        return;
    }

    for (const daysBefore of REMINDER_DAYS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        const subscription = await Subscription.findById(subscriptionId).populate('user', 'name email');
        return subscription ? subscription.toObject() : null;
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // Send email, sms, push not. etc.
    });
};
