console.log("### RUNNING server.js FROM:", import.meta.url);
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import connectDatabase from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import healthRoutes from './routes/healthRoutes.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({ message: 'Gamified Donor Retention API' });
});
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/donations', donationRoutes);
app.use(notFound);
app.use(errorHandler);

await connectDatabase();

app.listen(port, () => console.log(`API server listening on port ${port}`));
