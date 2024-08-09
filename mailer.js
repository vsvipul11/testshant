
// const nodemailer = require("nodemailer");



// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "scripterhunts@gmail.com",
//       pass: "puxg mlws dupg ayxz",
//     },
//   });

//  async function sendOtp(data) {
//     const { email, otp } = data;
//     try {
//       const message = {
//         from: "scripterhunts@gmail.com",
//         to: email,
//         subject: "Verify your email",
//         text: `Please verify your email address by using otp ${otp}`,
//       };
//       await transporter.sendMail(message);
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }
  
  
//   module.exports = {sendOtp};  

const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shantanu@futuristictech.in",
      pass: "ethx acvr zgqm iknh",
    },
  });

 async function sendemail(data) {
  const { email } = data;
  const ticket = data.ticket || `TICKET-${Date.now()}`; // Generate a ticket if not provided

  try {
    const message = {
      from: "shantanu@futuristictech.in",
      to: email,
      subject: "Your Ticket has been Generated",
      text: `Your Ticket has been generated. Your ticket ID is ${ticket}`,
    };
    const info = await transporter.sendMail(message);
    console.log("Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
  
  
  module.exports = {sendemail};  
