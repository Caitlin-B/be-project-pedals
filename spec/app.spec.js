const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
// const connection = require("../db");
const app = require("../app");
const samsChaiSorted = require("sams-chai-sorted");

chai.use(samsChaiSorted);

// after(() => connection.destroy());

describe("/api", () => {
  describe("/routes", () => {
    describe("GET", () => {
      it("GET: returns status 200 and all routes", () => {
        return request(app)
          .get("/api/routes")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.have.key("routes");
            expect(body.routes[0]).to.contain.keys(
              "features",
              "center",
              "zoom",
              "_id",
              "routeName",
              "user_id",
              "calculatedDistance",
              "posted"
            );
          });
      });
    });

    describe("POST", () => {
      it("", () => {});
    });
  });

  describe("/users", () => {});

  describe("/reviews", () => {});
});
