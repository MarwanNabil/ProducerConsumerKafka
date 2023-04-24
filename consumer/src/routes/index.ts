import express from "express";
import { getOffers } from "../controllers/index";

const routes = express.Router();

routes.get("/offers", getOffers);

export default routes;
