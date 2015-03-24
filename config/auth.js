// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '548326145306973', // your App ID
        'clientSecret'  : 'aefd5e896fa6be9da935b0b3d67f7d86', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },
};
