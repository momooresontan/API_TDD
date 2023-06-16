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

  it("GET /todos/:id --> specific todo by ID", () => {});

  it("GET /todos/:id --> 404 if not found", () => {});

  it("POST /todos --> created todo", () => {});

  it("GET /todos --> validates request body", () => {});

  it("PATCH /todos/:id --> updated todo", () => {});

  it("PATCH /todos/:id --> 404 if not found", () => {});

  it("DELETE /todos/:id --> 204 no content", () => {});
});
