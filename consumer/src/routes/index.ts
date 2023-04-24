import express from "express";
import { body } from "express-validator";
import { getOffers, getOfferById } from "../controllers/index";
import { OfferModel } from "../models/offers";

const routes = express.Router();

routes.get(
  "/offer",
  [
    body("offerId")
      .trim()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage(
        "please enter a valid offer id. from 2 to 50 characters long."
      )
      .custom((offerId, { req }) => {
        return OfferModel.findById(offerId).then((offer) => {
          if (offer) return true;
          return Promise.reject("no offer with that id.");
        });
      }),
  ],
  getOfferById
);

routes.get("/offers", getOffers);

export default routes;
