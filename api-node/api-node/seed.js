const genreData = [
  {
    id: 1,
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    id: 2,
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    id: 3,
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    id: 4,
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 }
    ]
  }
];
const moviesData = [
  {
    id: 1,
    title: "Airplane",
    numberInStock: 5,
    dailyRentalRate: 2,
    genre: { id: 1, name: "Comedy" }
  },
  {
    id: 2,
    title: "The Hangover",
    numberInStock: 10,
    dailyRentalRate: 2,
    genre: { id: 1, name: "Comedy" }
  },
  {
    id: 3,
    title: "Wedding Crashers",
    numberInStock: 15,
    dailyRentalRate: 2,
    genre: { id: 1, name: "Comedy" }
  },
  {
    id: 4,
    title: "Die Hard",
    numberInStock: 5,
    dailyRentalRate: 2,
    genre: { id: 2, name: "Action" }
  },
  {
    id: 5,
    title: "Terminator",
    numberInStock: 10,
    dailyRentalRate: 2,
    genre: { id: 2, name: "Action" }
  },
  {
    id: 6,
    title: "The Avengers",
    numberInStock: 15,
    dailyRentalRate: 2,
    genre: { id: 2, name: "Action" }
  },
  {
    id: 7,
    title: "The Notebook",
    numberInStock: 5,
    dailyRentalRate: 2,
    genre: { id: 3, name: "Romance" }
  },
  {
    id: 8,
    title: "When Harry Met Sally",
    numberInStock: 10,
    dailyRentalRate: 2,
    genre: { id: 3, name: "Romance" }
  },
  {
    id: 9,
    title: "Pretty Woman",
    numberInStock: 15,
    dailyRentalRate: 2,
    genre: { id: 3, name: "Romance" }
  },
  {
    id: 10,
    title: "The Sixth Sense",
    numberInStock: 5,
    dailyRentalRate: 2,
    genre: { id: 4, name: "Thriller" }
  },
  {
    id: 11,
    title: "Gone Girl",
    numberInStock: 10,
    dailyRentalRate: 2,
    genre: { id: 4, name: "Thriller" }
  },
  {
    id: 12,
    title: "The Others",
    numberInStock: 15,
    dailyRentalRate: 2,
    genre: { id: 4, name: "Thriller" }
  }
];
const users = [
  {
    userId: 1,
    email: "user1@domain.com",
    password: "$2b$10$C0SZg2sXxy4O5BwzFuC1nOM0c//77LXy1EuKfVd0gZiKLynHB9Xom",
    name: "testUser",
    isAdmin: true
  }
];
module.exports.genreData = genreData;
module.exports.moviesData = moviesData;
module.exports.users = users;
