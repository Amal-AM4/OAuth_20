const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const TestUser = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.user_uuid); // assuming that is create a cookie and store the user_uuid value
});

passport.deserializeUser(async (user_uuid, done) => {
    // Deserialize the user by finding them in the database using their UUID
    try {
        const user = await TestUser.findOne({ where: { user_uuid: user_uuid } });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback fn
        console.log('passport callback fn fired');
        // console.log(profile);

        // check if user already exists in our db
        const findUser = await TestUser.findOne({
            where: { googleId: profile.id}
        });
        
        if (findUser) {
            //  already have the user
            console.log(`${findUser.username} is already exists in the db!`);

            done(null, findUser);
        } else {
            // if not, create user in our db
            try {
                const user = await TestUser.create({
                    googleId: profile.id,
                    username: profile.displayName,
                });
                console.log('user created');
                console.log('new use created: ', user);
                console.log('done up');

                // Simulate session regeneration by updating the session ID
                // req.sessionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                // req.session.save(); // Save the updated session
                
                
                done(null, user);

            } catch (error) {
                console.error(error);
            }
        }


    })
);