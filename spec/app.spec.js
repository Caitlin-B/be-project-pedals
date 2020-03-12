process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const samsChaiSorted = require("sams-chai-sorted");
const mongoose = require("mongoose");

chai.use(samsChaiSorted);

// beforeEach(() => mongoose.seed.run());
after(() => mongoose.disconnect());

describe("/api", () => {
  describe("/routes", () => {
    describe("GET", () => {
      it("GET: returns status 200 and all routes", () => {
        return request(app)
          .get("/api/routes")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
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
