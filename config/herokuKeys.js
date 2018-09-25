const google = {
    clientID : process.env.GOOGLE_GOOGLEID,
    clientSecret : process.env.GOOGLE_GOOGLE_SECRET
}

const facebook = {
    clientID : process.env.FACEBOOK_CLIENTID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET
}

const mongo = {
    stringURI: process.env.MONGODB_URI
}

const session = {
    key: process.env.SESSION_KEY
}

module.exports = {
    google,
    mongo,
    session,
    facebook
};