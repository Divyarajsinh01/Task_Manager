require('dotenv').config();

const Mailgun = require('mailgun.js')
const formData = require('form-data')

const mailGundomain = "sandbox153a65c8249b497281e0ac7c26d2e500.mailgun.org"

const mailgunApi = process.env.MAILGUN_API_KEY
// console.log(mailgunApi)

const mailgun = new Mailgun(formData)
const client = mailgun.client({ username: 'api', key: mailgunApi })


const welcomeEmail = (email, name) => {
    client.messages.create(mailGundomain, {
        from: 'divyarajsinhrayjada3@gmail.com',
        to: email,
        subject: "thanks for joinning my channel",
        text: `Hello dear ${name}, welcome to my youtube channel`
    })
}

const canceltionEmail = (email, name) => {
    client.messages.create(mailGundomain, {
        from: 'divyarajsinhrayjada3@gmail.com',
        to: email,
        subject: "thanks for joinning my channel",
        text: `Hello dear ${name}, why are you delete your account`
    })
}


module.exports = {welcomeEmail, canceltionEmail}
