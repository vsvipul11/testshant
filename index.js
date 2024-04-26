
require('dotenv').config()


const express = require("express");

const  PORT  =  process.env.PORT || 9000
const  databaseConnection  = require("./db");
const userModel = require("./user");
const {sendOtp} = require("./mailer2");
const {sendemail} = require("./mailer");
const otpModal = require("./token");
const cors = require('cors');



const StartServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  await databaseConnection();
 
  const createUser = async (req, res) => {
    const { email , name , phoneNo , confirmPass , password, otp  } = req.body;
    const latestOtp = await otpModal.findOne({ email: email });
    console.log(latestOtp , "this is latest OTP");
    const otpValue = latestOtp.otp;
    if(otpValue == otp){
        const userData = await userModel.create({ email : email , name : name , phoneNo : phoneNo, confirmPass : confirmPass , password : password});
        res.json({
          msg: 'true',
       });
    }
    else{
        res.json({
            msg: 'false',
         });
    }
   ;
};

const otpHandler = async (req, res) => {
  const { email } = req.query;

  // Check if user already exists
  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    // User already exists
    return res.json({
      msg: 'User already exists',
    });
  }

  
  const randomOTP = generateRandomOTP();
  await sendOtp({ email: email, otp: randomOTP });
  await otpModal.create({ email: email, otp: randomOTP });

  res.json({
    msg: 'true',
  });
};

// Function to generate a random OTP
const generateRandomOTP = () => {
  const length = 4; // Length of OTP
  let otp = '';
  for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generate random number between 0-9 and append to OTP
  }
  return otp;
};


const generateRandomTicket = () => {
  const length = 8; // Length of OTP
  let ticket = '#EXIDE';
  for (let i = 0; i < length; i++) {
      ticket += Math.floor(Math.random() * 10); // Generate random number between 0-9 and append to OTP
  }
  return otp;
};


const loginUser = async (req, res) => {
  const { email , password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    // User does not exist
    res.json({
      msg: 'User does not exist',
   });
   return;
  }

  const userPassword = user.password;

  if(userPassword === password) {
    res.json({
      msg: 'true',
   });
  } else {
    res.json({
      msg: 'false',
   });
  }
};


const ticketHandler = async (req, res) => {
  const { email } = req.query;

  // Check if user already exists
  //const existingUser = await userModel.findOne({ email: email });

  // if (existingUser) {
  //   // User already exists
  //   return res.json({
  //     msg: 'User already exists',
  //   });
  // }

  
  const randomTicket = generateRandomTicket();
  await sendemail({ email: email, ticket: randomTicket });
  //await otpModal.create({ email: email, otp: randomOTP });

  res.json({
    msg: 'true',
  });
};

  app.get('/otp' , otpHandler)

  app.get('/sendemail', ticketHandler)

  // app.get('/email' , emailHandler)

  app.post('/signup', createUser);
  
  app.post('/login', loginUser )
 
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      channel.close();
    });
};



StartServer();
