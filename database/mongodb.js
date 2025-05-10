import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error('DB_URI is not defined in the env variables');
}

const connectDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`DB connected successfully in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDatabase;
