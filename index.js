import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const Port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors()); 

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Define a schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Data = mongoose.model('Data', dataSchema);

// Routes
app.get('/get', async (req, res) => {
    try {
        const dataList = await Data.find();
        res.send(dataList);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/post', async (req, res) => {
    try {
        const newData = new Data(req.body);
        await newData.save();
        console.log(newData);
        res.send("data posted Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(Port, () => {
    console.log(`Server Running on Port ${Port}`);
});
