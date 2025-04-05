import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER as string],
});

export const producer = kafka.producer();

export const initKafka = async () => {
  await producer.connect();
  console.log('Kafka producer connected');
};

export const sendKafkaEvent = async (topic: string, message: object) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};
