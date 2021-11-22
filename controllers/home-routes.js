const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Patient, Role } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', (req, res) => {

  res.render('login')
})
//Homepage route
router.get('/login', (req, res) => {
  // if(req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;
  // }
  res.render('login')
})

// Sign-up route
router.get('/signup', (req, res) => {
  res.render('signup')
})

//User Profile route
router.get('/profile',withAuth, async (req, res) => {
  console.log(req.session.user_id)
  const singleUserData = await User.findByPk(req.session.user_id, {
    attributes: [
      'id',
      'name',
      'last_name',
      'username',
      'email',
      'role_id'
    ],
    include:[
      {
        model:Role,
        attributes:['id', 'name']
      }
    ]
  })

    const multiUserData = await User.findAll({
        attributes: [
          'id',
          'name',
          'last_name',
          'role_id'
        ],
        where: {
          role_id: 1
        },
        include: [
          {
            model: Role,
            attributes: ['name']
          }
        ] 
    })

    const patientsData = await Patient.findAll({
      attribute: [
        'id',
        'p_name',
        'p_lname',
        'p_email',
        'p_dob',
        'p_condition',
        'p_doc_comment',
      ],
      where: {
        p_doc_comment: null
      }
    })

    const roleData = await Role.findAll({
      attribute: [
        'id',
        'name'
      ]
    });
        const user = singleUserData.get({plain: true});
        const doctors = multiUserData.map(user => user.get({plain: true}));
        const patients = patientsData.map(pat => pat.get({plain: true}));
        const roles = roleData.map(role => role.get({plain: true}));
        // console.log(user.role_id)
        // console.log(req.session)
        res.render('profile', {
          user, 
          doctors,
          patients,
          roles,
          loggedIn: req.session.loggedIn,
        })    
});

//patient/1 route 
router.get('/patient/:id',withAuth, async (req, res) => {
  const singleUserData = await User.findByPk(req.session.user_id, {
    attributes: [
      'id',
      'name',
      'last_name',
      'username',
      'email',
      'role_id'
    ],
    include:[
      {
        model:Role,
        attributes:['id', 'name']
      }
    ]
  });

  const singlePatientData = await Patient.findOne({
    attributes: [
      'id',
      'p_name',
      'p_lname',
      'p_email',
      'p_dob',
      'p_condition',
      'p_doc_comment',
    ],
    where: {
      id: req.params.id
    },
  })
    
    //serialize the data
    const singlePatient = singlePatientData.get({plain: true});
    const singleUser = singleUserData.get({plain: true});
    //pass data to template
    res.render('single-patient', {
      singleUser,
      singlePatient,
      loggedIn: true
    });
  
});

// Setting route
router.get('/user/:id',withAuth ,(req,res)=>{
  User.findByPk(req.params.id,{
    attributes:[
      'id',
      'name',
      'last_name',
      'username',
      'email',
      'password',
      'role_id'
    ],
    include:[
      {
        model:Role,
        attributes:['id','name']
      }
    ]
  }).then(dbdata => {
    if(dbdata){
      const user = dbdata.get({ plain:true });
      res.render('setting',{
        user,
        loggedIn: true
      });
    } else {
      res.status(404).end();
    }
  })
  .catch(err =>{
    res.status(500).json(err);
  })
});
module.exports = router;