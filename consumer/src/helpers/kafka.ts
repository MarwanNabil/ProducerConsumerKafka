import { Kafka } from "kafkajs";

export default class KafkaFactory {
  static currentId: number = 0;
  kafkaObj: Kafka;
  kafkaConsumer: any;

  constructor(clientId: string, brokers: string[]) {
    this.kafkaObj = new Kafka({
      clientId: clientId,
      brokers: brokers,
    });
  }

  private async connectConsumer(topic: string) {
    this.kafkaConsumer = this.kafkaObj.consumer({ groupId: "test" });
    console.log("Connecting.....");
    await this.kafkaConsumer.connect();
    console.log("Connected!");

    await this.kafkaConsumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });
  }

  public async run(topic: string, callback: (result: any) => Promise<void>) {
    await this.connectConsumer(topic);

    await this.kafkaConsumer.run({
      eachMessage: async (result: any) => {
        await callback(result);
      },
    });
  }
}
