const router = require('express').Router();
module.exports = router;

const prisma =  require('../prisma');



//Returns an array of all authors in database

router.get('/', async (req, res, next) => {
    try{
        const authors = await prisma.author.findMany()
        res.json(authors);
    } catch{

        next();
    }
});

//creates new author 
router.post('/', async (req, res, next) =>{
    try{
        const { name } = req.body;

        if(!name) {
            
            const error = {
                status: 404,
                message: 'Author must have a name',
            };
            return next(error);
        };

        const author = await prisma.author.create({ data: { name } });
        res.json(author);

    } catch {
        next();
    }
});

//returns a single author with specified id

router.get('/:id', async (req,res,next) => {
    try{
        const id = +req.params.id;

        const author = await prisma.author.findUnique({ where: { id } });

        if (!author) {
            return next({
                status: 404,
                message: `Could not find author with id ${id}.`
            });
        }
        res.json(author);
    }catch{
        next();
    }
});


// overwrites thte specified author (kinda updates it)

/** Returns a single author with the specified id. */
router.get('/:id', async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const author = await prisma.author.findUnique({ where: { id } });
  
      if (!author) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      res.json(author);
    } catch {
      next();
    }
  });
  
  /** Overwrites the specified author as provided by the request body. */
  router.put('/:id', async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      // First check if the author exists
      const authorExists = await prisma.author.findUnique({ where: { id } });
      if (!authorExists) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      // Then validate the request body
      const { name } = req.body;
      if (!name) {
        return next({
          status: 400,
          message: 'Author must have a name.',
        });
      }
  
      const author = await prisma.author.update({
        where: { id },
        data: { name },
      });
  
      res.json(author);
    } catch {
      next();
    }
  });

  //deletes author by id
  router.delete('/:id', async (req, res, next) => {
    // This is a very similar pattern to the PUT route above.
    try {
      const id = +req.params.id;
  
      const authorExists = await prisma.author.findUnique({ where: { id } });
      if (!authorExists) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      await prisma.author.delete({ where: { id } });
  
      res.sendStatus(204);
    } catch {
      next();
    }
  });

  
  //returns all books written by the author with the specified id
  router.get('/:id/books', async (req, res, next) => {
    try{ 
        const id = +req.params.id;

        //check if author exists
        const author =  await prisma.author.findUnique({ where: { id }});
        if(!author) {
            return next({
                status: 404,
                message: `Could not find author with id ${id}.`,
            });
        }

        const books = await prisma.book.findMany({ where: { authorId: id}});
        res.json(books);


    }catch {
        next();
     }
  });

  

