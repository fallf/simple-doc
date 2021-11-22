const router = require('express').Router();
const { Patient, User} = require('../../models');
const nodemailer = require('nodemailer');

// create transporter 
// let transporter = nodemailer.createTransport({
//     host: 'smtp.mail.yahoo.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'simpledoctesting@yahoo.com',
//         pass: 'thwgaegabxokxyml',
//     },
//     tls:{
//         rejectUnauthorized: false
//     }
// });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'simpledoctest@gmail.com',
      pass: 'sfvsf123' // naturally, replace both with your real credentials or an application-specific password
    }
  });

router.get('/', (req, res)=>{

    Patient.findAll({
        attributes:[
            'id',
            'p_name',
            'p_lname',
            'p_email',
            'p_dob',
            'p_condition',
            'p_doc_comment',
            'user_id'
            
        ],
        include:[
            {
               model:User,
               attributes:[
                'id', 'name','last_name'  
               ] 
            }
        ]
        
    }).then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req,res)=>{
  Patient.findOne({
      where:{
          id:req.params.id
      },
      attributes:[
        'id',
        'p_name',
        'p_lname',
        'p_email',
        'p_dob',
        'p_condition',
        'p_doc_comment',
        'user_id'
      ],
      include:[
        {
           model:User,
           attributes:[
            'id', 'name','last_name'  
           ] 
        }
    ]
  })
  .then(dbData => {
      if(!dbData){
          res.status(404).json({message: 'No Patient Found'});
          return;
      }
      res.json(dbData);
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json(err);
  })
})

router.post('/',(req,res)=>{
    console.log(req.body)
    Patient.create({
        p_name:req.body.p_name,
        p_lname:req.body.p_lname,
        p_email:req.body.p_email,
        p_dob:req.body.p_dob,
        p_condition:req.body.p_condition,
        p_doc_comment:req.body.p_doc_comment,
        user_id:req.body.user_id
    })
    .then(dbData => res.json(dbData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', async (req,res)=>{
   const dbPatData = await Patient.update(req.body, {
       where: {
           id: req.params.id
       }
   });

   //html output
   const output = `
   <h3>Hello ${req.body.p_name},</h3>
   <p>Thank you for visiting SimpleDoc hospital today. You can find your consultation note below:</p>
   <p>${req.body.p_doc_comment}</p>
   <p>Sincerely,</p>
   <small>Simple Doc</small>
   <footer style="background-color: #92BDE7; color:#eeeee4; text-align: center; margin: auto auto 1px auto">
       <h3 style="text-decoration:underline; border-color: #EEEEE4; padding:5px">Contact Us</h3>
       <ul style="list-style-type:none; padding-bottom: 10px;">
           <li>Telephone: (222)222-2222</li>
           <li>Email:
               <a style="text-decoration: none; color:#eeeee4" href= "mailto: simpledoctesting@yahoo.com">simpledoctesting@yahoo.com</a>
           </li>
           <li>Address: 333 West 59th St.<br>
               10019, New York, New York
           </li>
       </ul>
   </footer>
   `


    //send mail with defined transport object
        let mailOptions = {
        from: '"SimpleDoc Consultation"<simpledoctesting@yahoo.com>', // sender address
        to: `${req.body.p_email}`, //list of receivers 


        subject: 'Consultation Notes',
        text: 'Consultation Notes',

        html: output, // html body
        };


        transporter.sendMail(mailOptions, (error, info)=> {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          
        });
   res.json(dbPatData);
})

router.delete('/:id', (req,res)=>{
  console.log('id', req.params.id);

  Patient.destroy({
      where:{
          id: req.params.id
      }
  })
  .then(dbData => {
      if (!dbData){
        res.status(404).json({ message:'No Patient found!'});
        return;
      }
      res.json(dbData);
  })
  .catch(err =>{
      console.log(err);
      res.status(500).json(err);
  })
})

module.exports= router;