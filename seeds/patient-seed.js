const {Patient} = require('../models');



const patientData = [
    {
        p_name:'Jacob',
        p_lname:'Stwart',
        p_email:'j.stwart@me.com',
        p_dob:'1985-09-14',
        p_condition:'headache',
        p_doc_comment:'drink 8oz of water every hour, take a tylenol before bed',
        user_id:1
    }
];

const seedPatient = () => Patient.bulkCreate(patientData);

module.exports =  seedPatient;