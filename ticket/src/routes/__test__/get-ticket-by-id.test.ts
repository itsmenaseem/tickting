import request from "supertest"
import { app } from "../../app"
import { Ticket } from "../../models/ticket.model"

describe("Testing GET /api/tickets/:id" , () =>{
    it("returns 400 if ticketId is not valid",async() =>{
        await request(app)
                .get("/api/tickets/1234")
                .expect(400)
    })
    it("returns 404 if ticketId is not found",async() =>{
        await request(app)
                .get("/api/tickets/69ae96d9631fe475929ea59b")
                .expect(404)
    })
    it("returns 200 if  ticketId  is valid",async() =>{
         const title = "avengers";
                const price = 100;
                const userId = "123456781";
                const ticket = await Ticket.create({ title, price, userId });
        const res = await request(app)
                    .get(`/api/tickets/${ticket.id}`);
        expect(res.status).toEqual(200);
        expect(res.body.ticket).toBeDefined()
    })
    
})

