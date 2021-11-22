
const seedRole =require('./role-seed');
const seedUser = require('./user-seed');
const seedPatient = require('./patient-seed');






const sequelize = require('../config/connection');




const seedAll = async ()=>{
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');
    
    

    await seedRole();
    console.log('\n------ROLE SEEDED-----\n');

    await seedUser();
    console.log('\n-----USER SEEDED-----\n');
    
    await seedPatient();
    console.log('\n-----PATIENT SEEDED-----\n');
   

    process.exit(0);
};

seedAll();