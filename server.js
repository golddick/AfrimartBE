const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
// Enable CORS
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Handle contact form submissions
app.post('/submit-contact-form', async (req, res) => {
  try {
    // const emailBody = <Email/>;
    const transporter = nodemailer.createTransport({
      host: "mail.afrimartcommerce.com",
      port: '198.38.83.196',
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'Support@afrimart.biz , saas@afrimartcommerce.com',
      subject: 'Contact Form Submission',
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: orange;
              font-size:20px;
            }
            .label {
              font-weight: bold;
              font-size:15;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email from Contact Form</h1>
            <p>Here is the information submitted through the form:</p>
            
            <p class="label"> Name:</p>
            <p>${req.body.cname}</p>
            
            <p class="label">Email:</p>
            <p>${req.body.email}</p>
            
            <p class="label">Phone Number:</p>
            <p>${req.body.pNumber}</p>
            
           
            <p class="label">Purpose:</p>
            <p>${req.body.subject}</p>
            
            <p class="label">Description:</p>
            <p>${req.body.des}</p>
          </div>
        </body>
      </html>
    `,
      //  text: JSON.stringify(req.body, null, 2),
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Contact form email sent successfully!' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ message: 'Failed to send contact form email.' });
  }
});
 

 
app.post('/submit-form', async (req, res) => {
  try { 
    const transporter = nodemailer.createTransport({
      host: "mail.afrimartcommerce.com",
      port: '198.38.83.196',
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify transporter to catch authentication errors
    // await transporter.verify();

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'Support@afrimart.biz,saas@afrimartcommerce.com',
      subject: 'Enterprise Form',
      // html: emailBody,
      // text: 'hello word',
      // text: JSON.stringify(req.body, null, 2),
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: orange;
              font-size:20px;
            }
            .label {
              font-weight: bold;
              font-size:15;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email from Enterprise Form</h1>
            <p>Here is the information submitted through the form:</p>
            
            <p class="label">Company Name:</p>
            <p>${req.body.companyName}</p>
            
            <p class="label">Sector:</p>
            <p>${req.body.sector}</p>
            
           
            <p class="label">Business Type:</p>
            <p>${req.body.businessType}</p>

            <p class="label">Turn over</p>
            <p>${req.body.annualTurnover}</p>
            
            <p class="label">Registration Number:</p>
            <p>${req.body.registrationNo}</p>
            
            <p class="label">Business Address:</p>
            <p>${req.body.businessAddress}</p>
            
            <p class="label">Business Website:</p>
            <p>${req.body.businessWebsite}</p>
            
           
            <p class="label">Employees:</p>
            <p>${req.body.employees}</p>
           
            <p class="label">Country:</p>
            <p>${req.body.country}</p>
            
            <p class="label">City:</p>
            <p>${req.body.city}</p>
            
           
            <p class="label">Full Name:</p>
            <p>${req.body.fullName}</p>
            
            <p class="label">Phone Number:</p>
            <p>${req.body.telephone}</p>
            
           
            <p class="label">Email Address:</p>
            <p>${req.body.emailAddress}</p>
            
            <p class="label">Description:</p>
            <p>${req.body.description}</p>
            
           
          </div>
        </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!!' });
  } catch (error) {
    if (error.code === 'EAUTH') {
      // Handle authentication errors
      console.error('Authentication error:', error.message);
      res.status(401).json({ message: 'Email authentication failed. Please check your credentials.' });
    } else {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email.' });
    }


  }
});



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
});
