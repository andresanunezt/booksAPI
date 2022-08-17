db.books.deleteMany({});

db.books.insert([
  {
    title: "100 Años de Soledad",
    author: "Gabriel Garcia Maquez",
    genre: "Novel",
    read: false,
  },
  {
    title: "Candide",
    author: "Voltaire",
    genre: "Satire",
    read: false,
  },
  {
    title: "Women",
    author: "Bukowski",
    genre: "Prose",
    read: false,
  }
]);
