const { Role } = require("../models")

const roleData = [
    {
       name:'Doctor' 
    },
    {
        name:'Nurse'
    }
];

const seedRole = () => Role.bulkCreate(roleData);

module.exports = seedRole;