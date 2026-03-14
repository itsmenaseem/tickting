import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket.model";

describe("Testing Patch /api/:id", () => {
    it("returns 401 if user is not logged in", async () => {
        await request(app)
            .patch("/api/tickets/123")
            .send({})
            .expect(401);
    })
    it("returns 400 if not valid ticketId", async () => {
        await request(app)
            .patch("/api/tickets/123")
            .set("Cookie", global.signin())
            .send({})
            .expect(400)
    })
    it("returns 404 ticket not found", async () => {
        await request(app)
            .patch("/api/tickets/69ae96d9631fe475929ea59b")
            .set("Cookie", global.signin())
            .send({})
            .expect(404)
    })
    it("returns 403 if user in not authorized to update ticket ", async () => {
        // create a ticket
        const title = "avengers";
        const price = 100;
        const userId = "123456781";
        const ticket = await Ticket.create({ title, price, userId });

        await request(app)
            .patch(`/api/tickets/${ticket.id}`)
            .set("Cookie", global.signin())
            .send({ title: "123" })
            .expect(403)
    });

    it("returns 200 on successful update ", async () => {
        // create a ticket
        const title = "avengers";
        const price = 100;
        const userId = "test-user";
        const ticket = await Ticket.create({ title, price, userId });
      const res =   await request(app)
            .patch(`/api/tickets/${ticket.id}`)
            .set("Cookie", global.signin())
            .send({ title: "new Title" })
        expect(res.statusCode).toEqual(200)
        expect(res.body.ticket.title).toEqual("new Title")
    });
    

})