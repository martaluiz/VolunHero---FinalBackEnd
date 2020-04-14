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
    db.query(`SELECT * from services;`)
      .then(data => {
        const services = data.rows;
        res.set('Access-Control-Allow-Origin','*')
        res.json({ services });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


    router.get("/", (req, res) => {
      db.query(`SELECT * from services where voluteer_user_id is null;`)
        .then(data => {
          const services = data.rows;
          res.json({ services });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });



  router.get("/:userId", (req, res) => {
    db.query(`select users.name, (services.*)
     from services
     join users ON users.id = user_id
     where users.id = ${req.params.userId} and is_completed = false;`)
      .then(data => {
        const services = data.rows;
        res.json({ services });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/create", (req, res) => {
    let insert = `insert into services (user_id, category_id, description, created_at, updated_at, is_completed, volunteer_user_id)
    VALUES( ${req.body.user_id}, ${req.body.category_id}, '${req.body.description}', to_timestamp(${Date.now()} / 1000.0),
    to_timestamp(${Date.now()} / 1000.0), ${req.body.is_completed}, ${req.body.volunteer_user_id}) RETURNING *`;
    db.query(insert)
      .then(data => {
        const new_service = data.rows[0];
        res.json({ new_service });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {
    db.query(`DELETE FROM services WHERE id = ${req.body.id}RETURNING *;`)
      .then(data => {
        const deleted_service = data.rows[0];
        res.json({ deleted_service });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/complete", (req, res) => {
    db.query(`UPDATE services SET is_completed = true WHERE id = ${req.body.id} RETURNING *;`)
       .then(data => {
        const updated_service = data.rows[0];
        res.json({ updated_service });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
