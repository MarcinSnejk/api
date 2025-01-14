const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-praser');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Endpoint do wysyłania wiadomości
app.post('/api/send-message', (req, res) => {
    const {name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        }
    });

    //opcje maila
    const mailOptions = {
        from: email,
        to: '',
        subject: `Message from ${name}`,
        text: message
    };

    //wysyłanie
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
        {
            console.log(error);
            return res.status(500).json({ succes: false });
        }

        console.log('Message send:' + info.response);
        res.json({ succes: true });
    })
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});