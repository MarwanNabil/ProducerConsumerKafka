export const PORT = process.env.PORT;
export const MONGO_URL =
  process.env.MONGO ||
  `mongodb+srv://admin:admin@cluster0.mp1n7um.mongodb.net/offers`;
export const KAFKA_BROKER_URL =
  process.env.KAFKA_BROKER_URL || "localhost:9092";
export const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "offers";
