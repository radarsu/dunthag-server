let frisby = require(`frisby`);
let server = `https://localhost:5000/`;

frisby.create(`Getting user schema GET:/user/schema/?type=PERSONAL`)
    .get(`${server}user/schema?type=PERSONAL`, {
        strictSSL: false
    }).expectJSON({
        "$async": true,
        "additionalProperties": false,
        "properties": {
            "accountNumber": {
                "format": "account number",
                "type": "string"
            },
            "address": {
                "format": "no special characters",
                "type": "string"
            },
            "apartmentNumber": {
                "format": "no special characters allow numbers and null",
                "type": "string"
            },
            "buildingNumber": {
                "format": "no special characters allow numbers",
                "type": "string"
            },
            "city": {
                "format": "no special characters",
                "type": "string"
            },
            "country": {
                "format": "no special characters",
                "type": "string"
            },
            "email": {
                "format": "email",
                "type": "string"
            },
            "firstName": {
                "format": "no special characters",
                "minLength": 1,
                "type": "string"
            },
            "login": {
                "minLength": 4,
                "type": "string"
            },
            "password": {
                "minLength": 9,
                "type": "string"
            },
            "passwordRecoveryEmail": {
                "format": "email",
                "type": "string"
            },
            "phone": {
                "format": "phone",
                "minLength": 7,
                "type": "string"
            },
            "postalCode": {
                "format": "numeric",
                "maxLength": 5,
                "minLength": 5,
                "type": "string"
            },
            "repeatedPassword": {
                "minLength": 9,
                "type": "string"
            },
            "surname": {
                "format": "no special characters",
                "minLength": 1,
                "type": "string"
            },
            "type": {
                "enum": [
                    "PERSONAL",
                    "TRADE_BUSINESS_ENTITY",
                    "SELFEMPLOYED",
                    "PUBLIC"
                ],
                "type": "string"
            },
            "idCard": {
                "enum": [
                    "ID",
                    "PASSPORT"
                ],
                "type": "string"
            },
            "idCardSeries": {
                "format": "identity card",
                "type": "string"
            },
            "pesel": {
                "format": "pesel",
                "type": "string"
            }
        },
        "required": [
            "login",
            "password",
            "repeatedPassword",
            "passwordRecoveryEmail",
            "firstName",
            "surname",
            "email",
            "phone",
            "address",
            "buildingNumber",
            "postalCode",
            "city",
            "country",
            "accountNumber"
        ]
    })
.expectStatus(200)
    .toss();
