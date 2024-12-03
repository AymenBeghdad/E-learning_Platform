import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'edulinkapp@gmail.com',
    pass: 'fivw qcyq pkcu wswd'
  }
});

// Function to send mail
const sendMail = (from, to, subject, text, callback) => {
  const mailOptions = {
    from,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(null, info);
  });
};

export default sendMail;
