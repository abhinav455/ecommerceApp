module.exports = {
    mongoURI: process.env.DB_PROD,
    jwtSecret: process.env.JWT_SECRET,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeEndpointSecret : process.env.STRIPE_ENDPOINT_SECRET
};