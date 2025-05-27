import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'


 
export default class EmailOtpService{
  constructor(saltRounds = 10) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.APP_PASSWORD
      }
    })
    
      this.saltRounds = saltRounds
    
  }

async sendVerificationEmail(toEmail,code){
  
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: toEmail,
      subject: "Your Verification Code",
      html:`
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
        <div style="max-inline-size: 500px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(to right, #4f46e5, #6366f1); padding: 20px 30px;">
            <h2 style="color: white; margin: 0; font-size: 22px; text-align: center;">🔐 Verify Your Password Change</h2>
          </div>
          <div style="padding: 30px 30px 20px 30px; text-align: center;">
            <p style="font-size: 16px; color: #333;">Use the code below to confirm your password change:</p>
            <div style="margin: 25px 0;">
              <span style="display: inline-block; background: #f1f5f9; color: #111827; font-size: 36px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 8px;">
                ${code}
              </span>
            </div>
            <p style="font-size: 14px; color: #6b7280;">This code is valid for 5 minutes. Do not share it with anyone.</p>
          </div>
          <div style="padding: 0 30px 30px 30px; text-align: center;">
            <p style="font-size: 13px; color: #9ca3af;">If you didn’t request this, no changes will be made to your account.</p>
            <p style="font-size: 13px; color: #9ca3af;">– The Workbridge Security Team</p>
          </div>
        </div>
      </div>
    `,
    };
    try {
     const result =  await this.transporter.sendMail(mailOptions);
     console.log("Verification email sent!");
     return code
    } catch (error) { 
      console.error("Error sending email:", error);
      return null
    }
  };

  async hashing(otpCode){
    const saltRounds =10
    const otpAsString = String(otpCode);
    return await bcrypt.hash(otpAsString, saltRounds);
  }
}