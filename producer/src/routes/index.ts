import express from "express";
import { body } from "express-validator";
import { postOffer, deleteOffer } from "../controllers/index";

const routes = express.Router();

routes.post(
  "/offer",
  [
    body("offerDisc")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage(
        "please enter a valid offer disc. from 2 to 50 characters long."
      ),
  ],
  postOffer
);

routes.delete(
  "/offer",
  [
    body("offerId")
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("enter a valid offerId."),
  ],
  deleteOffer
);

export default routes;
