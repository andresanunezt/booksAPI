db.users.deleteMany({});

db.users.insert([
  { name: "Dan", password: "1234" },
  { name: "Linda", password: "password" },
  { name: "Andés", password: "password" },
  { name: "Brad", password: "password" },
]);
