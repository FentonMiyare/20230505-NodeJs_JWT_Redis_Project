require('dotenv').config();

module.exports = {
    url : process.env.DB_URL,
    illegalUsernames: ['user', 'writer','admin','users', 'writers','admins'],
    SALT: process.env.SALT,
    PORT: process.env.NODE_PORT || 5000,
    HOST: process.env.NODE_HOST || 'localhost',
    WEBSITE_URL : process.env.WEBSITE_URL || `https://localhost@production:5000`,
    API_VERSION: process.env.API_VERSION,
    secret : process.env.TOKEN_SECRET,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    jwtExpiration: parseInt(process.env.ACCESS_TOKEN_KEY_EXPIRE_TIME),
    jwtRefreshExpiration: parseInt(process.env.REFRESH_TOKEN_KEY_EXPIRE_TIME),
}
