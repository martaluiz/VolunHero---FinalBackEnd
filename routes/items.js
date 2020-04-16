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
    db.query(`SELECT * from items;`)
      .then((data) => {
        const items = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/insert", (req, res) => {
    let insert = `INSERT INTO items (service_id, text)
  VALUES ('${req.body.service_id}', '${req.body.text}') RETURNING *`;
    db.query(insert)
      .then((data) => {
        const new_item = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ new_item });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {
    db.query(`DELETE FROM items WHERE id = '${req.body.id}' RETURNING *;`)
      .then((data) => {
        const deleted_item = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ deleted_item });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
