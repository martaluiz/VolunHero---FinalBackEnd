/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:userId", (req, res) => {
    db.query(
      `select *
     from users
     where users.id = ${req.params.userId}`
    )
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  ///POST == create a new user/// this works!
  router.post("/create", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let address = req.body.address;
    let city = req.body.city;
    let province = req.body.province;
    let country = req.body.country;
    let postalcode = req.body.postalcode;
    db.query(
      `INSERT INTO users (name, email, password, phone, address, city, province, country, postalcode)
      VALUES ( '${name}', '${email}', '${password}', '${phone}', '${address}', '${city}', '${province}', '${country}', '${postalcode}') RETURNING * `
    )
      .then((data) => {
        const new_user = data.rows[0];
        res.json({ new_user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
