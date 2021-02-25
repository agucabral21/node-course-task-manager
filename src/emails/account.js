const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  try {
    const msg = {
      to: email, // Change to your recipient
      from: "agus@vexels.com", // Change to your verified sender
      subject: "Thanks for joining to CaLi Tasks!",
      text: "Welcome " + name,
      html:
        "<br><strong>Let me know how you do with this beautiful app.</strong>",
    };

    sgMail.send(msg);
  } catch (e) {
    console.log(e);
  }
};

const sendGoodbyeEmail = (email, name) => {
  try {
    const msg = {
      to: email, // Change to your recipient
      from: "agus@vexels.com", // Change to your verified sender
      subject: "Thanks for be a part of CaLi tasks!",
      text: "Goodbye " + name,
      html: "<br><strong>Nice to meet you!</strong>",
    };

    sgMail.send(msg);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};

// const msg = {
//   to: "agus@vexels.com", // Change to your recipient
//   from: "agus@vexels.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail.send(msg);
/*.then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })*/
// Create an environment variable
// Update your development environment with your SENDGRID_API_KEY. Run the following in your shell:

//   echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env
