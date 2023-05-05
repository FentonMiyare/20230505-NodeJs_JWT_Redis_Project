require('dotenv').config();

module.exports = {
    url : process.env.DB_URL,
    illegalUsernames: ['user', 'writer','admin','users', 'writers','admins'],
    SALT: process.env.SALT,
    PORT: 5000,
    HOST: 'localhost',
    WEBSITE_URL : `http://localhost:5000`,
    API_VERSION: process.env.API_VERSION,
    secret : process.env.TOKEN_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    jwtExpiration: 6000,
    jwtRefreshExpiration: 12000,
};
