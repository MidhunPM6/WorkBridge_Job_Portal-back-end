import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.APP_PASSWORD
  }
})

 // 6-digit code


export const sendVerificationEmail = async (toEmail, code) => {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: toEmail,
      subject: "Your Verification Code",
      html: `<p>Your verification code is: <b>${code}</b></p>`,
    };
  
    try {
     const result =  await transporter.sendMail(mailOptions);
     console.log("Verification email sent!");
     return result
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };