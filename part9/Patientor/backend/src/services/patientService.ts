import patientsData from "../../data/index";
import { PatientEntry,NonSsnEntry, NewPatientEntry,PublicPatient, Entry } from "../types/types";
import { v4 as uuidv4 } from 'uuid';


const patients: Array<PatientEntry> = patientsData

const getPatientEntry = ():Array<PatientEntry> => {
    return patients
}

const getNonSsnPatientEntry = ():Array<NonSsnEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}

const addPatient = (entry:NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

const getPatient = (id: string): PublicPatient | undefined => {
    const foundPatient = patients.filter(p => p.id === id)
    return foundPatient[0]
}

const addedEntry = (id: string, data: Entry): Entry => {
    const foundPatient: PatientEntry | undefined = patients.find((patients) => patients.id === id)

    if (!foundPatient) {
        throw new Error(`No patient match with id:${id}`)
    }
    foundPatient?.entries.push(data)
    return data
}

export default {
    getPatientEntry,
    getNonSsnPatientEntry,
    addPatient,
    getPatient,
    addedEntry
}