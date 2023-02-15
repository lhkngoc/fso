import express from 'express';

const ping = express.Router();

ping.get('/', (_req, res) => {
  res.send('pong');
});

export default ping;