import { Kafka, Producer } from "kafkajs";
import { Cursor } from "mongoose";

export default class KafkaFactory {
  static currentId: number = 0;
  kafkaObj: Kafka;
  kafkaProducer: any;

  constructor(clientId: string, brokers: string[]) {
    this.kafkaObj = new Kafka({
      clientId: clientId,
      brokers: brokers,
    });
  }

  private async connectProducer() {
    this.kafkaProducer = this.kafkaObj.producer();
    console.log("Connecting.....");
    await this.kafkaProducer.connect();
    console.log("Connected!");
  }

  public async pushItem(topic: string, disc: string) {
    await this.connectProducer();
    const result = await this.kafkaProducer.send({
      topic: topic,
      messages: [
        {
          value: disc,
          partition: 0,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);

    await this.destroyConnection();

    return result;
  }

  private async destroyConnection() {
    await this.kafkaProducer.disconnect();
  }
}
