import KafkaFactory from "../helpers/kafka";
import { validationResult } from "express-validator";
import { ResponseError } from "../helpers/responseError";
import express, { Request, Response, NextFunction } from "express";
import { KAFKA_BROKER_URL } from "../../config";

export const postOffer = async (
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

    const offerDisc = req.body.offerDisc;
    const obj = await new KafkaFactory("myapp", [KAFKA_BROKER_URL]);
    const kafkaDisc = await obj.pushItem("offers", "+ " + offerDisc);

    return res
      .status(201)
      .json({ message: "your offer has been added.", kafka: kafkaDisc });
  } catch (err) {
    next(err);
  }
};

export const deleteOffer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new ResponseError("validation failed.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const baseOffset = req.body.baseOffset;

      const obj = new KafkaFactory("myapp", [KAFKA_BROKER_URL]);
      const kafkaDisc = await obj.pushItem("offers", "- " + baseOffset);

      return res.status(201).json({
        message: "your offer has been deleted.",
      });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
