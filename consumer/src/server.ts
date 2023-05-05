//for enviroment variables
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bodyParser from "body-parser";
import { KAFKA_BROKER_URL, KAFKA_TOPIC, MONGO_URL, PORT } from "../config";
import consumeRoutes from "./routes/index";
import KafkaFactory from "./helpers/kafka";
import { ResponseError } from "./helpers/responseError";
import express, { Request, Response, NextFunction } from "express";
import { OfferModel } from "./models/offers";

const app = express();

app.use(bodyParser.json());

app.use("/", consumeRoutes);

//Handling Errors & Exceptions
app.use(
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message: message, data: data });
  }
);

const runServer = async () => {
  try {
    await mongoose.connect(MONGO_URL!.toString());
    console.log("Connected to database.");

    await app.listen(PORT, (): void => {
      console.log(`Server is running in http://localhost:${PORT}`);
    });

    const obj = await new KafkaFactory("myapp", [KAFKA_BROKER_URL]);

    await obj.run(KAFKA_TOPIC, async (result: any) => {
      const offerId = result.message.offset;
      const offerData: string = result.message.value.toString();

      const operation = offerData[0] === "-" ? "delete" : "add";

      if (operation === "delete") {
        const offerId = offerData.substring(2);
        const offer = await OfferModel.findById(offerId);
        if (offer) {
          await offer.deleteOne().catch((err) => {
            console.log(err);
          });
          console.log("Deleted offer with id = " + offerId + ".");
        } else {
          console.log(
            `No offer with the following ${offerId} id to be deleted.`
          );
        }
      } else {
        const offerDisc = offerData.substring(2);
        const offer = new OfferModel();
        offer.description = offerDisc;
        offer
          .save()
          .then((offer) => {
            console.log(
              `Added offer with offerId = ${offer.id} and offer description ${offerDisc} .`
            );
          })
          .then((err) => {
            console.log(err);
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

runServer();

// mongoose
//   .connect(MONGO!.toString())
//   .then((result) => {
//     app.listen(PORT, (): void => {
//       console.log(`Server is running in http://localhost:${PORT}`);
//     });
//   })
//   .then((): Promise<void> => {
//     console.log("!");

//     const obj = await new KafkaFactory("myapp", ["localhost:9092"]);

//     return Promise.resolve();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
