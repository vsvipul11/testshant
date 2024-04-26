
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "shantanu@futuristictech.in",
        pass: "ethx acvr zgqm iknh",
    },
  });

 async function sendOtp(data) {
    const { email, otp } = data;
    try {
      const message = {
        from: "shantanu@futuristictech.in",
        to: email,
        subject: "Verify your email",
        text: `Please verify your email address by using otp ${otp}`,
      };
      await transporter.sendMail(message);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  
  module.exports = {sendOtp};  