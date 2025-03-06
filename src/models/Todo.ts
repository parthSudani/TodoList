import mongoose from 'mongoose';
const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Todo', TodoSchema);