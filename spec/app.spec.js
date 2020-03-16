process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const defaults = require("superagent-defaults");
const app = require("../app");
const request = defaults(require("supertest")(app));
const samsChaiSorted = require("sams-chai-sorted");
const mongoose = require("mongoose");

chai.use(samsChaiSorted);

let route_id;
let review_id;

beforeEach(() => {
  return request
    .post("/api/login")
    .send({ username: "jessjelly", password: "101112" })
    .expect(200)
    .then(({ body: { token } }) => {
      request.set("Authorization", `BEARER ${token}`);
    })
    .then(() => {
      return request.get("/api/routes").then(({ body: { routes } }) => {
        route_id = routes[0]._id;
      });
    })
    .then(() => {
      const review = {
        body: "Great route!",
        user_id: "jessjelly",
        rating: 5
      };
      return request
        .post(`/api/reviews/${route_id}`)
        .send(review)
        .then(({ body: { review } }) => {
          review_id = review._id;
        });
    });
});

after(() => mongoose.disconnect());

describe("/api", () => {
  describe("/login", () => {
    it("POST 200: responds with access token when given correct username and password", () => {
      return request
        .post("/api/login")
        .send({ username: "jessjelly", password: "101112" })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.have.ownProperty("token");
        });
    });
    it("POST responds with status 401 for an incorrect password", () => {
      return request
        .post("/api/login")
        .send({ username: "jessjelly", password: "wrongpassword" })
        .expect(401)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("invalid password");
        });
    });
    it("POST responds with status 401 for an incorrect username", () => {
      return request
        .post("/api/login")
        .send({ username: "paul", password: "secure123" })
        .expect(401)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("invalid username");
        });
    });
  });

  describe("/routes", () => {
    describe("GET", () => {
      it("GET: returns status 200 and all routes", () => {
        return request
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
              "averageRating",
              "routeDescription"
            );
          });
      });
      it("GET: returns status 200 and all routes filtered by type", () => {
        return request
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
        return request
          .get("/api/routes?user=jessjelly")
          .expect(200)
          .then(({ body }) => {
            const userIsJessJelly = body.routes.every(route => {
              return route.user_id === "jessjelly";
            });
            expect(userIsJessJelly).to.be.true;
          });
      });
      it("GET: returns status 200 and all routes sorted by posted", () => {
        return request
          .get("/api/routes?sort_by=posted")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("posted", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes sorted by calculatedDistance", () => {
        return request
          .get("/api/routes?sort_by=calculatedDistance")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes sorted by calculatedDistance", () => {
        return request
          .get("/api/routes?sort_by=calculatedDistance")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: true
            });
          });
      });
      it("GET: returns status 200 and all routes ordered ascending and sorted by calculatedDistance", () => {
        return request
          .get("/api/routes?sort_by=calculatedDistance&&order=asc")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("calculatedDistance", {
              descending: false
            });
          });
      });
      it("GET: returns status 200 and all routes sorted by average rating", () => {
        return request
          .get("/api/routes?sort_by=averageRating&&order=asc")
          .expect(200)
          .then(({ body: { routes } }) => {
            expect(routes).to.be.sortedBy("averageRating", {
              descending: false
            });
          });
      });
      it("GET: returns status 404 and a message stating that the queried column does not exist, when the type is invalid", () => {
        return request
          .get("/api/routes?type=banana")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Query Not Found" });
          });
      });
      it("GET: returns status 404 and a message stating that the queried column does not exist, when the user is invalid", () => {
        return request
          .get("/api/routes?user=4567")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Query Not Found" });
          });
      });
      it("GET: returns status 400 and an error message if the sort_by query is invalid", () => {
        return request
          .get("/api/routes?sort_by=srhdt")
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Invalid Query Entry" });
          });
      });
      it("GET: returns status 400 and and an error message, when the order query is invalid", () => {
        return request
          .get("/api/routes?order=jdfegy")
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Invalid Sort Value" });
          });
      });
    });

    describe("POST", () => {
      it("POST: returns status 201 and the created route", () => {
        const route = {
          routeName: "steph's route",
          user_id: "nickandsteph",
          routeDescription:
            "A route for experience off-road cyclists, which I'd highly recommend.",
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
        return request
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
              "averageRating",
              "routeDescription"
            );
          });
      });
      it("POST: returns status 406 and an error message if nothing is sent on the request body", () => {
        return request
          .post("/api/routes")
          .send({})
          .expect(406)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Request Data Validation Failed" });
          });
      });
      it("POST: returns status 406 and an error message if any key is missing from the request body", () => {
        const route = {
          routeName: "steph's route",
          routeDescription: "A new route for off-roaders.",
          calculatedDistance: 100,
          center: [2, 4],
          zoom: [10],
          type: "off road",
          city: "manchester",
          averageRating: 4,
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

        return request
          .post("/api/routes")
          .send(route)
          .expect(406)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Request Data Validation Failed" });
          });
      });
    });

    describe("/:route_id", () => {
      describe("GET", () => {
        it("GET: returns status 200 and the requested route", () => {
          return request
            .get(`/api/routes/${route_id}`)
            .expect(200)
            .then(({ body }) => {
              expect(body).to.have.key("route");
              expect(body.route._id).to.eql(route_id);
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
                "averageRating",
                "routeDescription"
              );
            });
        });
        it("GET: returns status 404 and an error message if the requested route does not exist", () => {
          return request
            .get("/api/routes/bananasinpyjamas")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Requested Data Not Found" });
            });
        });
      });
      describe("DELETE", () => {
        it("DELETE: returns status 204 and no content", () => {
          return request
            .delete(`/api/routes/${route_id}`)
            .expect(204)
            .then(({ body }) => {
              expect(body).to.eql({});
            });
        });
        it("DELETE: returns status 404 and an error message when the route requested to be deleted does not exist", () => {
          return request
            .delete("/api/routes/notaroute")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Requested Data Not Found" });
            });
        });
      });
    });
  });

  describe("/users", () => {
    describe("POST", () => {
      it("POST: returns status 201 and the created user", () => {
        const user = { _id: "tickle122", password: "myNewPassword" };
        return request
          .post("/api/users")
          .send(user)
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).to.contain.keys("_id", "password", "savedRoutes");
          });
      });
      it("POST: returns status 406 and an error message if nothing is sent on the request body", () => {
        return request
          .post("/api/users")
          .send({})
          .expect(406)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Request Data Validation Failed" });
          });
      });
      it("POST: returns status 406 and an error message if required data is missing from the request body", () => {
        const user = { _id: "tickle122" };
        return request
          .post("/api/users")
          .send(user)
          .expect(406)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Request Data Validation Failed" });
          });
      });
    });
    describe("/:user_id", () => {
      describe("GET", () => {
        it("GET: returns status 200 and the requested user", () => {
          return request
            .get("/api/users/jessjelly")
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.contain.keys("_id", "password", "savedRoutes");
              expect(user._id).to.eql("jessjelly");
            });
        });
        it("GET: returns status 404 and an error message when the requested user does not exist ", () => {
          return request
            .get("/api/users/2475869")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Requested User Not Found" });
            });
        });
      });
      describe("PATCH", () => {
        it("PATCH: returns status 200 and will update the saved routes property on the user, to include the patched route_id", () => {
          return request
            .patch("/api/users/jessjelly")
            .send({ savedRoute: route_id })
            .expect(200)
            .then(({ body }) => {
              expect(body.user.savedRoutes[0]).to.eql(route_id);
            });
        });
        it("PATCH: returns status 400 and an error message if savedRoute is not included on the request body", () => {
          return request
            .patch("/api/users/jessjelly")
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Invalid Request Body" });
            });
        });
      });
      describe("DELETE", () => {
        it("DELETE: returns status 204 and no content", () => {
          return request
            .delete(`/api/users/grumpy19`)
            .expect(204)
            .then(({ body }) => {
              expect(body).to.eql({});
            });
        });
        it("DELETE: returns status 404 and an error message when the user requested to be deleted does not exist", () => {
          return request
            .delete("/api/users/notauser")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Delete Failed - User Not Found" });
            });
        });
      });
    });
  });

  describe("/reviews", () => {
    describe("/:route_id", () => {
      describe("GET", () => {
        it("GET: returns status 200 and a list of all the reviews for a specific route", () => {
          return request
            .get(`/api/reviews/${route_id}`)
            .expect(200)
            .then(({ body: { reviews } }) => {
              const reviewsFromSameRoute = reviews.every(review => {
                return review.route_id === route_id;
              });
              expect(reviewsFromSameRoute).to.be.true;
            });
        });
        it("GET: returns status 404 and an error message when the requested route does not exist", () => {
          return request
            .get("/api/reviews/notaroute")
            .expect(404)
            .then(({ body }) => {
              expect(body).to.eql({ msg: "Reviews Not Found" });
            });
        });
      });

      describe("POST", () => {
        it("POST: returns status 201 and the posted review", () => {
          const review = {
            body: "Great route!",
            user_id: "jessjelly",
            rating: 5
          };
          return request
            .post(`/api/reviews/${route_id}`)
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
        it("POST: returns status 406 and an error message if nothing is sent on the request body", () => {
          return request
            .post(`/api/reviews/${route_id}`)
            .send({})
            .expect(406)
            .then(res => {
              expect(res.body).to.eql({msg: 'Request Data Validation Failed'})
            });
        });
        it("POST: returns status 406 and an error message if a key is missing from the request body", () => {
          const review = { body: "This route was OK...", rating: 3 };
          return request
            .post(`/api/reviews/${route_id}`)
            .send(review)
            .expect(406)
            .then(res => {
              expect(res.body).to.eql({ msg: "Request Data Validation Failed" });
            });
        });
      });

      describe("/:review_id", () => {
        describe("GET", () => {
          it("GET: returns status 200 and the specific route", () => {
            return request
              .get(`/api/reviews/${route_id}/${review_id}`)
              .expect(200)
              .then(({ body: { review } }) => {
                expect(review.route_id).to.equal(route_id);
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

        describe("DELETE", () => {
          it("DELETE: returns status 204 andd no content", () => {
            return request
              .delete(`/api/reviews/${route_id}/${review_id}`)
              .expect(204)
              .then(({ body }) => {
                expect(body).to.eql({});
              });
          });
          it("DELETE: returns returns status 404 and an error message when the route of the requested to be deleted does not exist", () => {
            return request
              .delete(`/api/reviews/banana/${route_id}`)
              .expect(404)
              .then(res => {
                expect(res.body).to.eql({
                  msg: "Delete Failed - Review Not Found"
                });
              });
          });
        });
      });
    });
  });
});
