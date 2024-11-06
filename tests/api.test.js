import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import "dotenv/config";
import { userID, baseUrl } from "../helpers/data.js";

describe("API Tests", () => {
  it.skip("get request", async () => {
    //const responseB = JSON.stringify(response.body);
    const response = await spec()
      .get(`${baseUrl}/BookStore/v1/Books`)
      .inspect();
    expect(response.statusCode).to.eql(200);

    //expect(responseB.body).to.include("Learning JavaScript Design Patterns");

    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
  });

  // it("Create a user", async () => {
  //   const response = await spec()
  //     .post("https://demoqa.com/Account/v1/User")
  //     .withBody({
  //       userName: "test123x",
  //       password: process.env.SECRET_PASSWORD,
  //     })
  //     .inspect();
  //   expect(response.statusCode).to.eql(201);
  //   //c6dd411c-5596-45a9-a274-3b4649d659ff
  // });

  it("Login a user", async () => {
    console.log("Print pwd " + process.env.SECRET_PASSWORD);
    const response = await spec()
      .post(`${baseUrl}/Account/v1/Authorized`)
      .withBody({
        userName: "test123x",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
    expect(response.statusCode).to.eql(200);
  });
});
