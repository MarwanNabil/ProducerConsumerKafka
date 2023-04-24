import { OfferModel } from "../models/offers";
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
