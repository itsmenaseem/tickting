import request from "supertest";
import { app } from "../../app";
import { sign } from "jsonwebtoken";
import { Ticket } from "../../models/ticket.model";

describe("Testing POST /api/tickets route", () => {
  it("returns 401 if user is not authenticated", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  it("returns 401 if jwt token is invalid", async () => {
    const payload = { id: 12, email: "test@test.com" };
    const token = sign(payload, "randomSecret");

    await request(app)
      .post("/api/tickets")
      .set("Cookie", [`jwt=${token}`])
      .send({})
      .expect(401);
  });

  it("returns 400 if title is not defined", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({})
      .expect(400);
  });

  it("returns 400 if price is not defined",async () =>{
    await request(app)
            .post("/api/tickets")
            .set("Cookie",global.signin())
            .send({title:"Avengers"})
            .expect(400)
  })
  
  it("returns 201 on sucessful ticket creation",async () =>{
    const res = await request(app)
            .post("/api/tickets")
            .set("Cookie",global.signin())
            .send({title:"Avengers",price:100})
      
     expect(res.statusCode).toEqual(201);
     const tickets = await Ticket.find({});
      expect(tickets.length).toEqual(1);
      if(tickets && tickets.length > 0){
        expect(tickets[0]?.title).toEqual("Avengers");
      expect(tickets[0]?.price).toEqual(100);
      }
  })
});