const router = require('express').Router();

const { Role } = require('../../models');

//GET /api/role
router.get('/', (req, res)=>{

    Role.findAll({
        attributes:[
            'id',
            'name'
        ]
    }).then(dbRoleData => res.json(dbRoleData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//GET /api/role/1
router.get('/:id', (req,res)=>{
  
    Role.findOne({
        attributes:[
            'id',
            'name'
        ],
        where:{
            id:req.params.id
        }
    }).then(dbRoleData => {
        if (!dbRoleData){
            res.status(404).json({ message:'No Role found'});
            return;
        }
        res.json(dbRoleData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })

});

//POST /api/role
router.post('/', (req, res) => {
    Role.create({
        name: req.body.name
    })
.then(dbRoleData => res.json(dbRoleData))
    .catch(err =>{
    res.status(500).json(err);
    });
});

//PUT /api/role/1
router.put('/:id', (req, res)=>{
    Role.update(req.body,{
        individualHooks:true,
        where:{
            id:req.params.id
        }
    })
    .then(dbData => {
        if(!dbData[0]){
            res.status(404).json({message: 'No Role Found!'});
            return;
        }
        res.json(dbData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/role/1
router.delete('/:id', (req, res)=>{
 Role.destroy({
     where:{
         id:req.params.id
     }  
 })
    .then(dbRoleData =>{
        if(!dbRoleData){
            res.status(404).json({ message: 'No Role found'});
            return;
        }
        res.json(dbRoleData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;