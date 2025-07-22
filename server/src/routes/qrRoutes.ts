import express from 'express';

const Router = express.Router();
import { generateSingleQRCode } from '../controllers/EventController';

Router.get('/:email', generateSingleQRCode);

export const qrRoutes = Router;