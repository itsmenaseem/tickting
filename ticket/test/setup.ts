import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { sign } from "jsonwebtoken";

let mongo: MongoMemoryServer;

declare global {
    var signin:() => string [];
}


beforeAll(async () => {
  process.env.JWT_SECRET = "testjwt";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (!collections) {
    throw new Error("Mongo collections not found");
    }

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
    const payload = {id:"test-user",email:"test@test.com"}
    const token = sign(payload,process.env.JWT_SECRET!);
    return [`token=${token}`];
}