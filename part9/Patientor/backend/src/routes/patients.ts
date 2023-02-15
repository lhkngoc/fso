import express from 'express'
import patientService from '../services/patientService';
import {toNewPatientEntry} from '../utils';
import {toNewEntry} from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
    res.json(patientService.getNonSsnPatientEntry())
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedEntry = patientService.addPatient(newPatientEntry)
        res.json(addedEntry)
    } catch (e) {
        res.status(400).send("input error")
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id
        const patient = patientService.getPatient(id)
        res.json(patient)
    } catch (e) {
        res.send('not found')
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id
        const data = toNewEntry(req.body)
        const addedEntryToPatient = patientService.addedEntry(id, data)
        res.json(addedEntryToPatient)
    } catch (er) {
        res.status(400).send("something wrong").json(req.body)
    }
})

export default router;