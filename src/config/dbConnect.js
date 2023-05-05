const colors = require('colors');
const dbConfig = require("./db.config");
const db = require("../models");
const Role = db.role;


// Import custom logger
const logger = require('../logger/index');


process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
})

db.mongoose.set('strictQuery', true);

db.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully.".cyan.underline);
    initial();
  })
  .catch(err => {
    logger.error({
      message: `MongoDB connection error. Please make sure MongoDB is running: ${err?.message}`
    });
    console.log(err.message)
    process.exit();
  })

db.mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db'.bgGreen)
})

db.mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

db.mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
  await db.mongoose.connection.close()
  process.exit(0)
})


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "writer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'writer' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

