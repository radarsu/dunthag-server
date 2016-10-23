/**
 * ------------------------------------------------------------------------
 *                             Policy Mappings
 * ------------------------------------------------------------------------
 */

type Policy = "userLoginAuth" | "characterLoginAuth";

module.exports.policies = {

    CharacterController: {
        "*": "characterLoginAuth",
        create: [<Policy>"userLoginAuth"],
        login: [<Policy>"userLoginAuth"],
    },
    UserController: {
        "*": <Policy>"userLoginAuth",
        create: true,
        login: true,
    },

    // '*': true,

    // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture	: 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
    // }
};
