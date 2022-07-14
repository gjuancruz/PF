import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '../../../lib/config'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtEstrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

export default JwtEstrategy;

