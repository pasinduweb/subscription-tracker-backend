import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Subscription name is required'],
            trim: true,
            minLength: [3, 'Subscription name must be at least 3 characters'],
            maxLength: [50, 'Subscription name must be at most 100 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Subscription price is required'],
            min: [0, 'Subscription price must be greater than 0'],
        },
        currency: {
            type: String,
            enum: ['USD', 'LKR'],
            default: 'USD',
        },
        frequency: {
            type: String,
            enum: ['Daily', 'Weekdly', 'Monthly', 'Yearly'],
        },
        category: {
            type: String,
            enum: ['Entertainment', 'Education', 'Health', 'Other'],
            required: [true, 'Subscription category is required'],
        },
        paymentMethod: {
            type: String,
            trim: true,
            required: [true, 'Payment method is required'],
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
        startDate: {
            type: Date,
            required: [true, 'Subscription start date is required'],
            validate: {
                validator: (value) => value <= new Date(),
                message: 'Start date must be in the past',
            },
        },
        renewalDate: {
            type: Date,
            // required: [true, 'Subscription renewal date is required'], // Will be calculated in pre-save hook
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: 'Renewal date must be after the start date',
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // Reference to User model
            ref: 'User', // Assuming you have a User model defined
            required: [true, 'User ID is required'],
            index: true, // Optimising the queries by indexing the user field
        },
    },
    { timestamps: true }
);

// If renewal date is not provided, calculate it based on the frequency
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency.toLowerCase()]);
    }

    // Update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'Expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
