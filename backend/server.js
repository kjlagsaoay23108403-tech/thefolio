// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// --- Database Connection ---
connectDB();

// --- CORS Configuration (Keep this as-is) ---
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://thefolio-five.vercel.app',
        'https://thefolio-jxpx.onrender.com' // Allow your own backend URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Middleware ---
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Simple Test Route (Place this BEFORE your other routes) ---
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// --- Your API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// --- Global Error Handler (Place this AFTER your routes) ---
// This will catch any errors and prevent the app from crashing silently.
app.use((err, req, res, next) => {
    console.error('Global error handler caught:', err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

// --- Start Server (CRITICAL: Bind to 0.0.0.0) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});