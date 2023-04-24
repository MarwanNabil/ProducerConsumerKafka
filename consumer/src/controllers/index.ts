import { OfferModel } from "../models/offers";
import { ResponseError } from "../helpers/responseError";
import { validationResult } from "express-validator";
import express, { Request, Response, NextFunction } from "express";

export const getOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const offers = await OfferModel.find().lean();
    return res.status(200).json({ offersCount: offers.length, offers: offers });
  } catch (err) {
    next(err);
  }
};

export const getOfferById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ResponseError("validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const offerId = req.body.offerId;
    const offer = await OfferModel.findById(offerId).lean();
    return res.status(200).json({ ...offer });
  } catch (err) {
    next(err);
  }
};
