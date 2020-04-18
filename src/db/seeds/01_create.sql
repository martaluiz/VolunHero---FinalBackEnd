INSERT INTO users
  (name, email, password, phone, is_volunteer, address, city, province, country, postalcode, created_at)
VALUES
  ('Jasmine Singh', 'jasminesingh@gmail.com', 'password', '555-250-1234', true, '435 W Pender St', 'Vancouver', 'BC', 'Canada', 'V6B 1V2', '2020-04-10
04:05:06'),
  ('Marta Luiz', 'martaluiz@gmail.com', 'password', '555-250-1236', true, ' 688 Cambie St', 'Vancouver', 'BC', 'Canada', 'V6B 2M9', '2020-04-10
04:05:06'),
  ('Sruthi Korada', 'sruthikorada@gmail.com', 'password', '555-250-1235', false, '855 Homer St', 'Vancouver', 'BC', 'Canada', 'V6B 2W2', '2020-04-10
04:05:06'),
  ('Karen Johnson', 'karenjohnson@gmail.com', 'password', '555-250-1237', false, '901 Seymour St', 'Vancouver', 'BC', 'Canada', 'V6B 3M2', '2020-04-11
04:05:06'),
  ('Brenda Wilson', 'brendawilson@gmail.com', 'password', '555-250-1238', false, '1110 Howe St', 'Vancouver', 'BC', 'Canada', 'V6Z 1R2', '2020-04-12
04:05:06'),
  ('Henry McDonald', 'henrymcd@gmail.com', 'password', '555-250-1239', false, '1669 Johnston St', 'Vancouver', 'BC', 'Canada', 'V6H 3R9', '2020-04-13 04:05:06');

INSERT INTO categories
  (
  category)
VALUES
  ('Groceries'),
  ('Household'),
  ('Outdoor'),
  ('Other');

INSERT INTO services
  (
  user_id, category_id, description, created_at, updated_at, is_completed, volunteer_user_id)
VALUES
  (
    3, 1, 'Please pick up groceries for me from Save-On Foods', '2020-04-20
06:05:06', NOW(), false, null),
  (
    4, 2, 'I would like some help to paint my house', '2020-04-21
06:05:06', NOW(), false, null),
  (
    5, 3, 'Would someone be able to mow my lawn?', '2020-04-19
06:05:06', NOW(), false, null),
  (
    5, 4, 'Need someone to pick up my prescription', '2020-04-20
06:05:06', NOW(), false, null),
  (
    5, 1, 'My groceries at Costco please!', '2020-04-21
06:05:06', NOW(), false, null),
  (
    6, 1, 'Elderly need help with grocery please', '2020-04-22
06:05:06', NOW(), false, null),
  (
    6, 2, 'Need help to buld a shelf', '2020-04-23
06:05:06', NOW(), false, null),
  (
    4, 1, 'Please pick up groceries for me from Save-On Foods', '2020-04-13
06:05:06', '2020-04-14
06:05:06', true, 1),
  (
    4, 4, 'Perscription pick up from london drugs', '2020-04-13
06:05:06', '2020-04-14
06:05:06', true, 2),
  (
    4, 2, 'Please mow my lawn', '2020-04-13
06:05:06', '2020-04-14
06:05:06', true, 3);


INSERT INTO items
  (
  service_id, text)
VALUES
  (1, 'Bananas'),
  (1, 'Milk'),
  (1, 'Bread'),
  (1, 'Cheese'),
  (1, 'Apples'),
  (1, 'Tooth Paste'),
  (1, 'Butter'),
  (2, 'The Bedroom'),
  (2, 'The Living Room'),
  (5, 'Tea Bags'),
  (5, 'Brocoli'),
  (5, 'Bread'),
  (5, 'Milk'),
  (5, 'Yogurt'),
  (6, 'Bananas'),
  (6, 'Milk'),
  (6, 'Bread'),
  (6, 'Butter'),
  (8, 'Bananas'),
  (8, 'Milk'),
  (8, 'Bread'),
  (8, 'Cheese'),
  (8, 'Apples'),
  (8, 'Tooth Paste'),
  (8, 'Butter'),
  (9, 'Advil'),
  (9, 'Omeprazole');
