/* tslint:disable:max-line-length */
import {
    Ajv, _, game, ibantools, validatePolish,
} from "../utility/importer";
/* tslint:enable:max-line-length */

let ajv = Ajv({
    allErrors: true,
});

let Helper = {
    characterGroupsUsed: (str: string) => {
        let characterGroupsUsed = 0;
        if (Helper.hasNumber(str)) {
            characterGroupsUsed++;
        }

        if (Helper.hasLowerCase(str)) {
            characterGroupsUsed++;
        }

        if (Helper.hasUpperCase(str)) {
            characterGroupsUsed++;
        }

        if (Helper.hasSpecialCharacter(str)) {
            characterGroupsUsed++;
        }

        return characterGroupsUsed;
    },
    hasLowerCase: (str: string) => {
        return (/[a-z]/.test(str));
    },
    hasNumber: (str: string) => {
        return (/\d/.test(str));
    },
    hasSpecialCharacter: (str: string) => {
        return (/^[a-zA-Z0-9- ]*$/.test(str) === false);
    },
    hasUpperCase: (str: string) => {
        return (/[A-Z]/.test(str));
    },
    isLetter: (str: string) => {
        return str.length === 1 && str.match(/[a-zA-Z]/i);
    },
    isNumeric: (str: string) => {
        return !isNaN(parseInt(str, 10));
    },
};

ajv.addFormat("protocol", (val: string) => {
    if (val === "http" || val === "https") {
        return true;
    }

    return false;
});

// should contain also always 1 normal character
ajv.addFormat("groupsPassword", (val: string) => {
    return Helper.characterGroupsUsed(val) >= 2;
});

ajv.addFormat("phone", (val) => {
    let var1 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(val);
    let var2 = /^\(?([0-9]{3})\)\?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val);
    let var3 = /^\d{10}$/.test(val);
    let var4 = /^\d{9}$/.test(val);
    let out = (var1 || var2 || var3 || var4);
    return out;
});

ajv.addFormat("sex", (value) => {
    let object = _.find(game.sexes, (item) => {
        return item.code === value;
    });

    if (object) {
        return true;
    }

    return false;
});

ajv.addFormat("race", (value) => {
    let object = _.find(game.races, (item) => {
        return item.code === value;
    });

    if (object) {
        return true;
    }

    return false;
});

ajv.addFormat("numeric", Helper.isNumeric);

ajv.addFormat("pesel", validatePolish.pesel);

ajv.addFormat("nip", validatePolish.nip);

ajv.addFormat("regon", validatePolish.regon);

ajv.addFormat("identity card", validatePolish.identityCard);

ajv.addFormat("account number", (val) => {
    if (!Helper.isLetter(val.charAt(0)) && !Helper.isLetter(val.charAt(1))) {
        val = "PL" + val;
    }

    return ibantools.isValidIBAN(val);
});

let noSpecial = "^[a-zA-Z" +
    "àáâäãåąčćęèéêëėįìíîïłńòóôöõøśùúûüųūÿýżź" +
    "ñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØŚÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";

let noSpecialAllowNumbers = "^[a-zA-Z0-9" +
    "àáâäãåąčćęèéêëėįìíîïłńòóôöõøśùúûüųūÿýżź" +
    "ñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØŚÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";

let onlySpecial = "^[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]*$";

export let onlySpecialCharacters = new RegExp(onlySpecial);

export let noSpecialCharacters = new RegExp(noSpecial);
export let noSpecialAllowNumbersCharacters = new RegExp(noSpecialAllowNumbers);

ajv.addFormat("no special characters", (val) => {
    return noSpecialCharacters.test(val);
});

ajv.addFormat("no special characters allow numbers", (val) => {
    return noSpecialAllowNumbersCharacters.test(val);
});

ajv.addFormat("no special characters allow numbers and null", (val) => {
    let var1 = noSpecialAllowNumbersCharacters.test(val);
    let var2 = val ? false : true;
    let out = (var1 || var2);
    return out;
});

export { ajv };
