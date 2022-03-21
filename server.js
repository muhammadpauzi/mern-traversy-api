import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import { connectDB } from './configs/database.js';
import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';

// routes
import goalRoutes from './routes/goal.route.js';
import authRoutes from './routes/auth.route.js';

// connect to mongodb
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/v1/goals', goalRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
