
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shantanu@futuristictech.in",
      pass: "ethx acvr zgqm iknh",
    },
  });

 async function sendemail(data) {
    const { email, ticket } = data;
    try {
      const message = {
        from: "shantanu@futuristictech.in",
        to: email,
        subject: "Verify your email",
        text: `Your Ticket has been generated. Your ticket ID is  ${ticket}`,
      };
      await transporter.sendMail(message);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  
  module.exports = {sendemail};  
