const pool = require(`./pool`);

// this function gets services that are available for volunteers to pick up, with user information

//with line items
const getServicesAvailableForVolunteers = function (cb) {
  pool
    .query(
      `SELECT (users.name), (services.id), categories.category as category, items.text as list
from services
JOIN users on users.id = user_id
JOIN categories on categories.id = category_id
JOIN items on items.id = services.user_id
where volunteer_user_id is NULL and is_completed IS FALSE`
    )
    .then((res) => cb(res.rows));
};

module.exports = { getServicesAvailableForVolunteers };

// SELECT (users.*), (services.*), categories.category as category
// from services
// JOIN users on users.id = user_id
// JOIN categories on categories.id =category_id
// WHERE volunteer_user_id =1;

// //gets volunteers
// SELECT * FROM services WHERE services.volunteer_user_id is null;

// // gets uncompleted services
// SELECT * FROM services WHERE is_completed is false;

// // gets username with services for user 4 hard coded
// SELECT users.name, (services.*)
// From services
// Join users ON users.id = user_id
// WHERE users.id = 4;

// // gets service with line items, hard coded 1
// SELECT *
// FROM line_items
// JOIN services ON services.id = service_id
// WHERE services.id =1;

// //gets service by category, hardcoaded 1
// SELECT *
// from services
// JOIN categories ON categories.id = category_id
// WHERE categories.id = 1;

// const browse = cb => {
//   pool
//     .query(`SELECT * FROM services`)
//     .then(res => {
//       cb(null, res.rows);
//     })
//     .catch(err => cb(err));
// };

// const usersWithName = (name, cb) => {
//   pool
//     .query(`SELECT * FROM users WHERE name = $1`, [name])
//     .then(res => {
//       cb(null, res.rows[0]);
//     })
//     .catch(err => cb(err));
// };

// ///HARD CODED VALUES
// const addservice = function(title, text, cb) {
//   const sql = `INSERT INTO services
// (user_id, description, updated_at, is_completed, created_at, category_id, volunteer_user_id) values (1, $1, NOW(), false, NOW(), $2, null)`;
//   const args = [title, text];
//   pool
//     .query(sql, args)
//     .then(() => {
//       cb(null, "added successfully");
//     })
//     .catch(err => cb(err, null));
// };

// module.exports = {

//   browse,
//   usersWithName

// };
