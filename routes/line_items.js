/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * from line_items;`)
      .then(data => {
        const line_items = data.rows;
        res.json({ line_items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

router.post("/insert", (req, res) => {
  let insert = `INSERT INTO line_items (service_id, text)
  VALUES ('${req.body.service_id}', '${req.body.text}') RETURNING *`;
  db.query(insert)
    .then(data => {
      const new_line_item = data.rows[0];
      res.json({ new_line_item });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post("/delete", (req, res) => {
  db.query(`DELETE FROM line_items WHERE id = '${req.body.id}' RETURNING *;`)
    .then(data => {
      const deleted_line_item = data.rows[0];
      res.json({ deleted_line_item});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

return router;

};
