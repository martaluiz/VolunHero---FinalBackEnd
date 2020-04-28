/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const accountSid = process.env.ACCOUNTS_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
module.exports = db => {
  //---------------------GET--------------------------------------------------------------------------
  router.get("/", (req, res) => {
    db.query(`SELECT * from services;`)
      .then(data => {
        const services = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ services });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    db.query(`SELECT * from services where voluteer_user_id is null;`)
      .then(data => {
        const services = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ services });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/withuserinfo", (req, res) => {
    db.query(
      `SELECT (users.*), (services.*), categories.category as category
    from services
    JOIN users on users.id = user_id
    JOIN categories on categories.id =category_id
    where volunteer_user_id is NULL and is_completed IS FALSE;`
    )
      .then(data => {
        const services = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ services });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/volunteerservices", (req, res) => {
    db.query(
      `SELECT (users.*), (services.*), categories.category as category
      from services JOIN users on users.id = user_id JOIN categories on categories.id =category_id WHERE volunteer_user_id =1;`
    )
      .then(data => {
        const services = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ services });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:userId", (req, res) => {
    db.query(
      `select users.name, (services.*)
     from services
     join users ON users.id = user_id
     where users.id = ${req.params.userId};`
    )
      .then(data => {
        const services = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ services });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //---------------------POST--------------------------------------------------------------------------

  router.post("/create", (req, res) => {
    let insert = `insert into services (user_id, category_id, description)
    VALUES( '${req.body.user_id}', '${req.body.category_id}', '${req.body.description}') RETURNING *`;
    db.query(insert)
      .then(data => {
        const new_service = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ new_service });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {
    db.query(`DELETE FROM services WHERE id = ${req.body.id}RETURNING *;`)
      .then(data => {
        const deleted_service = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ deleted_service });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/complete", (req, res) => {
    db.query(
      `UPDATE services SET is_completed = true WHERE id = ${req.body.id} RETURNING *;`
    )
      .then(data => {
        const updated_service = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        client.messages
          .create({
            body:
              "Your service request has been completed. Enjoy your day!.",
            from: "+15109397737",
            to: "+17788144609"
          })
          .then(message => console.log(message.sid));
        res.json({ updated_service });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/accepted", (req, res) => {
    db.query(
      `UPDATE services SET volunteer_user_id  = '${req.body.user_id}' WHERE id = '${req.body.id}' RETURNING *;`
    )
      .then(data => {
        const updated_service = data.rows;
        res.set("Access-Control-Allow-Origin", "*");
        

        client.messages
          .create({
            body:
              "Your service request has been accepted .Soon you will be assisted.",
            from: "+15109397737",
            to: "+17788144609"
          })
          .then(message => console.log(message.sid));
        res.json({ updated_service });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/edit", (req, res) => {
    db.query(
      `UPDATE services SET description = '${req.body.description}' WHERE id = '${req.body.id}' RETURNING *;`
    )
      .then(data => {
        const updated_service = data.rows[0];
        res.set("Access-Control-Allow-Origin", "*");
        res.json({ updated_service });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
