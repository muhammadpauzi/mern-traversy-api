import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`MongoDB Error`.red, error);
        process.exit(1);
    }
};
