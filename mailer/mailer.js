const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'yasmine.cruickshank@ethereal.email',
        pass: 'ZK5UqdAhcPYGzaATah'
    }
};

module.exports = nodemailer.createTransport(mailConfig);
