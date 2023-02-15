import express from 'express';
import diagnoseService from '../services/diagnoseService'
const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoseEntries()
  res.json(diagnoses)
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;