import express from 'express';
import weatherRouter from './routes/weather';
import { setupSwagger } from './docs/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/weather', weatherRouter);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ Weather server is running at http://localhost:${PORT}`);
});
