
const { User }=require('../models')

const userData = [
    {
        name:'Mike',
        last_name:'Jones',
        username:'mjones1',
        email:'m.jones@me.com',
        password:'password1',
        role_id:2 
    }
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUser;