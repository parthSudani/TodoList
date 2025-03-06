import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/users.routes';
import todoRoutes from './routes/todo.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user', authRoutes);
app.use('/api/todo', todoRoutes);

mongoose.connect(process.env.MONGO_URI!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
