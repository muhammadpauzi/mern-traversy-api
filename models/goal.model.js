import mongoose from 'mongoose';

const goalSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Goal', goalSchema);
