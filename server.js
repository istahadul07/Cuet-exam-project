// Complete Full Stack Project: Node.js + Express.js + MongoDB + Frontend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentDB';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

// Student model
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

// Section 2: Express Routes
app.get('/api/home', (req, res) => {
  res.send('Home Page');
});

app.get('/api/contact', (req, res) => {
  res.send('Contact Page');
});

app.get('/api/services', (req, res) => {
  res.send('Services Page');
});

// Frontend pages handled by one index.html
app.get(['/', '/about', '/contact', '/services'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Section 3: Dummy JSON API routes for Postman testing
let dummyStudents = [
  { id: 1, name: 'Rahim', email: 'rahim@gmail.com', age: 22 },
  { id: 2, name: 'Karim', email: 'karim@gmail.com', age: 23 },
];

app.get('/api/dummy-students', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fetch all dummy students',
    data: dummyStudents,
  });
});

app.post('/api/dummy-students', (req, res) => {
  const { name, email, age } = req.body;

  const newStudent = {
    id: dummyStudents.length + 1,
    name,
    email,
    age,
  };

  dummyStudents.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Dummy student added successfully',
    data: newStudent,
  });
});

app.put('/api/dummy-students/:id', (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = dummyStudents.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Dummy student not found' });
  }

  dummyStudents[studentIndex] = {
    ...dummyStudents[studentIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: 'Dummy student updated successfully',
    data: dummyStudents[studentIndex],
  });
});

app.delete('/api/dummy-students/:id', (req, res) => {
  const id = Number(req.params.id);
  const studentExists = dummyStudents.some((student) => student.id === id);

  if (!studentExists) {
    return res.status(404).json({ success: false, message: 'Dummy student not found' });
  }

  dummyStudents = dummyStudents.filter((student) => student.id !== id);

  res.status(200).json({
    success: true,
    message: 'Dummy student deleted successfully',
    data: dummyStudents,
  });
});

// Also support exact exam route names for dummy API
app.get('/students', (req, res) => res.json({ success: true, data: dummyStudents }));
app.post('/students', (req, res) => {
  const newStudent = { id: dummyStudents.length + 1, ...req.body };
  dummyStudents.push(newStudent);
  res.status(201).json({ success: true, message: 'Student added', data: newStudent });
});
app.put('/students', (req, res) => {
  res.json({ success: true, message: 'Student update route works', receivedData: req.body });
});
app.delete('/students', (req, res) => {
  res.json({ success: true, message: 'Student delete route works' });
});

// Section 5: MongoDB Student Insert and Full CRUD API
app.post('/add-student', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const student = await Student.create({ name, email, age });

    res.status(201).json({
      success: true,
      message: 'Student inserted successfully into MongoDB',
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to insert student',
      error: error.message,
    });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: 'Student added successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 404 route for API
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(PORT, () => {
  console.log(`Full Stack Server running at http://localhost:${PORT}`);
});
