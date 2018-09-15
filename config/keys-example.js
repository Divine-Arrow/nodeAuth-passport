// after filling all empty space.. rename this file to keys.js

const google = {
    clientID : ""/* your client id from google console API */,
    clientSecret "": /* your client secrect from google console API */
}

const mongo = {
    stringURI: '' /* Mongo URL localhost or mlab */
}

const session = {
    key: '', /* key for encryption  choose your own words to create key example: 'whateverkey' */
}


module.exports = {
    google,
    mongo,
    session
};