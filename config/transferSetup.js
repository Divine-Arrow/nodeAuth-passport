const _ = require('lodash');

setUserData = (dbUser) => {
    if (dbUser.gThumbnail) {
        dbUser.gThumbnail480 = `${dbUser.gThumbnail.split('?sz')[0]}?sz=480`
        dbUser.gThumbnail25 = `${dbUser.gThumbnail.split('?sz')[0]}?sz=25`
    }
    var userData = _.pick(dbUser, ['gThumbnail', 'fThumbnail', 'isFThumnailDefault', 'name', 'email', 'firstName', 'lastName', 'gender', 'birthdate', 'hometown', 'location', 'id']);

    for (var prop in userData) {
        if (prop === 'isFThumnailDefault') {
            continue;
        } else if (!userData[prop]) {
            userData[prop] = '-----';
        }
    }
    return userData;
}

module.exports = setUserData;