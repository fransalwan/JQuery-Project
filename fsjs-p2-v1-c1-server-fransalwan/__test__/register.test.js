const request = require("supertest");
const app = require("../app");

describe("POST /register", function () {
  it("ini testing register complete", async () => {
    const result = await request(app).post("/cust/register").send({
      username: "new new",
      email: "new@gmail.com",
      password: "123456",
    });

    expect(result.status).toBe(201);
    expect(result.body).toBe({
      email: result.email,
    });
    console.log(result, "<< ini result di testing");
  });
});
