const nodemailer = require('nodemailer');

async function sendResetEmail(email, token) {
    const resetLink = `http://localhost:4000/users/resetPassword/${token}`;
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'juaninquinientos@gmail.com',
            pass: 'nliz bgnz qpjg savs '
        }
    });

    const mailOptions = {
        from: 'no-reply@yourapp.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    };

    await transporter.sendMail(mailOptions);
}
module.exports={sendResetEmail}

