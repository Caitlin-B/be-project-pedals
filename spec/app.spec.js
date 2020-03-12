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
            expect(body).to.have.key("routes");
            expect(body.routes[0]).to.contain.keys(
              "features",
              "center",
              "zoom",
              "_id",
              "routeName",
              "user_id",
              "calculatedDistance",
              "posted",
              "type",
              "city",
              "averageRating"
            );
          });
      });
      it("GET: returns status 200 and all routes filtered by type", () => {
        return request(app)
          .get("/api/routes?type=scenic")
          .expect(200)
          .then(({ body }) => {
            const routeIsScenic = body.routes.every(route => {
              return route.type === "scenic";
            });
            expect(routeIsScenic).to.be.true;
          });
      });
      it("GET: returns status 200 and all routes filtered by user_id", () => {
        return request(app)
          .get("/api/routes?user=jessjelly")
          .expect(200)
          .then(({ body }) => {
            const userIsJessJelly = body.routes.every(route => {
              return route.user_id === "jessjelly";
            });
            expect(userIsJessJelly).to.be.true;
          });
      });
      it("GET: returns status 200 and all routes sort by posted", () => {
        return request(app)
          .get("/api/routes?sort_by=posted")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("posted", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes sort by calculatedDistance", () => {
        return request(app)
          .get("/api/routes?sort_by=calculatedDistance")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes sort by calculatedDistance", () => {
        return request(app)
          .get("/api/routes?sort_by=calculatedDistance")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes ordered ascending and sorted by calculatedDistance", () => {
        return request(app)
          .get("/api/routes?sort_by=calculatedDistance&&order=asc")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: false
            });
          });
      });
      it("GET: returns status 200 and all routes sorted by average rating", () => {
        return request(app)
          .get("/api/routes?sort_by=averageRating&&order=asc")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("averageRating", {
              descending: false
            });
          });
      });
    });

    describe("POST", () => {
      it("POST: returns status 201 and the created route", () => {
        const route = {
          routeName: "steph's route",
          user_id: "nickandsteph",
          calculatedDistance: 100,
          center: [2, 4],
          zoom: [10],
          type: "off road",
          city: "manchester",
          features: [
            {
              id: "939f91b44e6e9e02d291936b38d37d41",
              type: "LineString",
              properties: {},
              geometry: {
                coordinates: [
                  [-2.243437194562347, 53.47937156671131],
                  [-2.245279265879219, 53.48020470020762],
                  [-2.244689803058094, 53.481037817344],
                  [-2.2421109032150355, 53.48081857757853],
                  [-2.242184586067509, 53.480380094648496],
                  [-2.2416688060989145, 53.48011700271519]
                ]
              }
            },
            {
              id: "d62ef1b6b3e5aea6bdc449c5fa083087",
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [-2.245278926116555, 53.48020142417977],
                type: "Point"
              }
            },
            {
              id: "5758f5346eceea68c082b427b8f34d83",
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: [-2.2448123582680353, 53.4810583735227],
                type: "Point"
              }
            }
          ]
        };
        return request(app)
          .post("/api/routes")
          .send(route)
          .expect(201)
          .then(({ body: { route } }) => {
            expect(route).to.contain.keys(
              "features",
              "center",
              "zoom",
              "_id",
              "routeName",
              "user_id",
              "calculatedDistance",
              "posted",
              "type",
              "city",
              "averageRating"
            );
          });
      });
    });

    describe("/:route_id", () => {
      describe("GET", () => {
        it("GET: returns status 200 and the requested route", () => {
          return request(app)
            .get("/api/routes")

            .then(({ body }) => {
              const id = body.routes[0]._id;

              return request(app)
                .get(`/api/routes/${id}`)
                .expect(200)
                .then(({ body }) => {
                  expect(body).to.have.key("route");
                  expect(body.route._id).to.eql(id);
                  expect(body.route).to.contain.keys(
                    "features",
                    "center",
                    "zoom",
                    "_id",
                    "routeName",
                    "user_id",
                    "calculatedDistance",
                    "posted",
                    "type",
                    "city",
                    "averageRating"
                  );
                });
            });
        });
      });
      describe("DELETE", () => {
        it("DELETE: returns status 204 and no content", () => {
          return request(app)
            .get("/api/routes")
            .then(({ body }) => {
              const id = body.routes[0]._id;
              return request(app)
                .delete(`/api/routes/${id}`)
                .expect(204)
                .then(({ body }) => {
                  expect(body).to.eql({});
                });
            });
        });
      });
    });
  });

  describe("/users", () => {});

  describe("/reviews", () => {
    describe("/:route_id", () => {
      describe("GET", () => {
        it("GET: returns status 200 and a list of all the reviews for a specific route", () => {
          return request(app)
            .get("/api/reviews/5e68ffe0901eab60c9eeca40")
            .expect(200)
            .then(({ body: { reviews } }) => {
              const reviewsFromSameRoute = reviews.every(review => {
                return review.route_id === "5e68ffe0901eab60c9eeca40";
              });
              expect(reviewsFromSameRoute).to.be.true;
            });
        });
      });

      describe("POST", () => {
        it("POST: returns status 201 and the posted review", () => {
          const review = { body: "cheese", user_id: "jessjelly", rating: 3 };
          return request(app)
            .get("/api/routes")
            .then(({ body }) => {
              const id = body.routes[0]._id;
              return request(app)
                .post(`/api/reviews/${id}`)
                .send(review)
                .expect(201)
                .then(({ body: { review } }) => {
                  expect(review).to.contain.keys(
                    "user_id",
                    "body",
                    "rating",
                    "posted",
                    "route_id"
                  );
                });
            });
        });
      });

      describe("/:review_id", () => {
        describe("GET", () => {
          it("GET: returns status 200 and the specific route", () => {
            return request(app)
              .get("/api/routes")
              .then(({ body }) => {
                const route_id = body.routes[1]._id;
                return request(app)
                  .get(`/api/reviews/${route_id}`)
                  .then(({ body: { reviews } }) => {
                    const review_id = reviews[0]._id;
                    return request(app)
                      .get(`/api/reviews/${route_id}/${review_id}`)
                      .expect(200)
                      .then(({ body: { review } }) => {
                        console.log(review);
                        expect(review).to.contain.keys(
                          "user_id",
                          "body",
                          "rating",
                          "posted",
                          "route_id"
                        );
                      });
                  });
              });
          });
        });
      });
    });
  });
});
