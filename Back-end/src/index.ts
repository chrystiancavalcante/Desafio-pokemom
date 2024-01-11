import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import registerRoutes from './routes/registerRoutes';
import loginRoutes from './routes/loginRoutes';
import pokemonRoutes from './routes/pokemonRoutes';
import teamRoutes from './routes/teamRoutes';
import searchRoutes from './routes/searchRoutes';
import evolutionsRoutes from './routes/evolutionsRoutes';
import { downloadRoute } from './routes/download';
import { stripeWebhookRoute } from './routes/stripeWebhook';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(pokemonRoutes);
app.use(teamRoutes);
app.use(searchRoutes);
app.use(evolutionsRoutes);
app.post('/webhook', stripeWebhookRoute);
app.get('/download', downloadRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;