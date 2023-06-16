const request = require("supertest");
const app = require("./app");

describe("Todos API", () => {
  it("GET /todos --> array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/:id --> specific todo by ID", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todos/:id --> 404 if not found", () => {
    return request(app).get("/todos/99999").expect(404);
  });

  it("POST /todos --> created todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "do dishes",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "do dishes",
            completed: false,
          })
        );
      });
  });

  it("GET /todos --> validates request body", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });

  it("PATCH /todos/:id --> updated todo", () => {
    return request(app)
      .patch("/todos/1")
      .send({
        name: "do laundry",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "do laundry",
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("PATCH /todos/:id --> validates request body", () => {
    return request(app).patch("/todos/1").send({ name: 123 }.expect(422));
  });

  it("PATCH /todos/:id --> 404 if not found", () => {
    return request(app).patch("todos/99999").expect(404);
  });

  it("DELETE /todos/:id --> 204 no content", () => {
    return request(app).delete("todos/1").expect(204);
  });

  it("DELETE /todos/:id --> 404 if not found", () => {
    return request(app).delete("todos/99999").expect(404);
  });
});
