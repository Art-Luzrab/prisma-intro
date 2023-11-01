const prisma = require("../prisma");

const seed = async () => {
  const authorData = await prisma.author.create({
    data: {
      name: "Joe Mama",
      books: {
        create: [
          { title: "Joe Mama: The Reckoning" },
          { title: "Joe Mama: The Redemption of Joe Mama" },
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      name: "Takumi Fujiwara",
      books: {
        create: [
          { title: "Initial D: How I became My Towns Fastest StreetRacer " },
        
        ],
      },
    },
  });


await prisma.author.create({
    data: {
      name: "Hank Hill",
      books: {
        create: [
          { title: "Gosh Dang it Bobby" },
          { title: "Medium Rare or Nothing!"}
        
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      name: "Arthur Read",
      books: {
        create: [
          { title: "Everyday When I'm Walking Down the Street" },
          { title: "DW: My Very Annoying Sister"}
        
        ],
      },
    },
  });
  
  await prisma.author.create({
    data: {
      name: "Jack Marston ",
      books: {
        create: [
          { title: "The day John Marston Stopped Shooting" },
        ],
      },
    },
  });


  await prisma.author.create({
    data: {
      name: "Steve",
      books: {
        create: [
          { title: "How to Survive Your First Night" },
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      name: "Alex",
      books: {
        create: [
          { title: "The Day I Found Steve" },
        ],
      },
    },
  });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
