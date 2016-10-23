let frisby = require(`frisby`);
let timestamp = new Date().getTime();

frisby.create(`Creating user test`)
    .post(`https://localhost:5000/user/`, {
        type: `PERSONAL`,
        login: `test${timestamp}`,
        password: `test${timestamp}`,
        repeatedPassword: `test${timestamp}`,
        passwordRecoveryEmail: "rkrohmorath@gmail.com",
        firstName: "Tescin",
        surname: "Testowy",
        email: "rkrohmorath@gmail.com",
        phone: "555666777",
        address: "Testowa",
        buildingNumber: "15",
        postalCode: "12345",
        city: "Testowo",
        country: "Testerland",
        accountNumber: "80899200009467542818091874",
    }, {
        strictSSL: false,
    }).expectJSON({
        id: String,
        login: `test${timestamp}`,
        password: String,
        registrationStatus: "INITIATED",
        registrationTask: String,
        /*
        passwordSalt: String,
        passwordRecoveryEmail: "rkrohmorath@gmail.com",
        registrationStatus: "INITIATED",
        wuis: [{
            // address: "http://localhost:9691"
        }],
        personalDatas: [{
            type: "PERSONAL",
            firstName: "Tescin",
            surname: "Testowy",
            email: "rkrohmorath@gmail.com",
            phone: "555666777",
            address: "Testowa",
            buildingNumber: "15",
            postalCode: "12345",
            city: "Testowo",
            country: "Testerland",
            accountNumber: "80899200009467542818091874"
        }],
        bankAccounts: [{
            name: "konto",
            number: "80899200009467542818091874"
        }],
        settings: [{}]
        */
    })
    .expectStatus(201)
    .toss();
