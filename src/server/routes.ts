import * as express from 'express';
import { JsonDatabase } from './database.model';

export const ApiRoutes = express.Router();

// ApiRoutes.get('/info', (req, res) => {
//   res.json(JsonDatabase.get('/info')).send();
// });
// ApiRoutes.put('/info', (req, res) => {
//   res.json(JsonDatabase.set('/info', req.body)).send();
// });
// ApiRoutes.get('/skills', (req, res) => {
//   res.json(JsonDatabase.get('/skills')).send();
// });
// ApiRoutes.put('/skills', (req, res) => {
//   res.json(JsonDatabase.set('/skills', req.body)).send();
// });
// ApiRoutes.get('/resume_sections', (req, res) => {
//   res.json(JsonDatabase.get('/resume_sections')).send();
// });
// ApiRoutes.put('/resume_sections', (req, res) => {
//   res.json(JsonDatabase.set('/resume_sections', req.body)).send();
// });
// ApiRoutes.get('/projects', (req, res) => {
//   res.json(JsonDatabase.get('/projects')).send();
// });
// ApiRoutes.put('/projects', (req, res) => {
//   res.json(JsonDatabase.set('/projects', req.body)).send();
// });

ApiRoutes.post('/contact', (req, res) => {
  const nodemailer = require("nodemailer");

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


  if (
    !req.body.email ||
    !req.body.subject ||
    !req.body.message ||
    !emailRegexp.test(req.body.email)
  ) {
    res.status(500).send({
      message: 'Invalid Request!',
      errors: [
        (!req.body.email ? 'Email address cannot be empty.' : undefined),
        (!req.body.subject ? 'Subject cannot be empty.' : undefined),
        (!req.body.message ? 'Message cannot be empty.' : undefined),
        (!emailRegexp.test(req.body.email) ? 'Email address format is invalid.' : undefined),
      ].filter(i => i != undefined)
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mr2hossam@gmail.com',
      pass: 'nqvwcaeumwwxqbik'
    }
  });
  const mailOptions = {
    from: req.body.email,
    to: 'mr2hossam@gmail.com',
    subject: `[devhus.com] ${req.body.subject}`,
    html: `<b>From:<b>${req.body.email}<br><b>Subject:<b>${req.body.subject}<br><b>Message:<b>${req.body.message}<br>`
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
      res.status(404).send({ message: 'failed to send message' });
    } else {
      res.send({ message: 'message was sent' });
    }
  });
});

ApiRoutes.get('/**', (req, res) => {
  const data = JsonDatabase.get(req.url);
  if (data) {
    res.json(data);
    return;
  }

  res.status(404).send({ message: 'not found.' });
});
ApiRoutes.post('/**', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      message: 'data updated.'
    });
    return;
  }
  const updated = JsonDatabase.set(req.url, req.body);
  if (updated) {
    res.json(req.body);
    return;
  }

  res.status(404).send({ message: 'not found.' });
});

