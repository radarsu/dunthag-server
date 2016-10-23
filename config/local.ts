/* tslint:disable:max-line-length */
import {
    //
} from "../main/utility/importer";
/* tslint:enable:max-line-length */

let config = {

    // json web token
    jwt: {
        AUTH_TOKEN_EXPIRATION: `12h`, // expires in 12 hours
        PASSWORD_RECOVERY_TOKEN_EXPIRATION: `6h`, // expires in 6 hours
        // maybe randomly generated on lift?
        SUPER_SECRET: "example_secret",
    },

    orm: {
        _hookTimeout: 120000,
    },

};

// fix other port than 443 security.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = `0`;

module.exports = config;
