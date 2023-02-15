import { Gender,NewPatientEntry,BaseEntry,HealthCheckRating,Entry } from "./types/types";
import { v4 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name")
    }
    return name
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if (!date  || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn")
    }
    return ssn
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation")
    }
    return occupation
}

type Fileds = { name: unknown, dateOfBirth: unknown, ssn: unknown, occupation: unknown, gender: unknown };

// NewPatient
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fileds): NewPatientEntry => {

    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };

    return newEntry
}

// NewEntry

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description ")
    }
    return description
}

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist ")
    }
    return specialist
}

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing criteria ")
    }
    return criteria
}

const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
      throw new Error(
        "HealthCheckRating missing or incorrect value" + `${rating as string}`
      );
    }
    return rating;
  };

export const toNewEntry = (object: any): Entry => {
    const newEntry: BaseEntry = {
        id: uuid(),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes
    };
    switch (object.type) {
        case "HealthCheck":
            return {
                ...newEntry,
                type: 'HealthCheck',
                healthCheckRating: parseRating(object.healthCheckRating)
            };
        case 'Hospital':
            return {
                ...newEntry,
                type: 'Hospital',
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseCriteria(object.discharge.criteria)
                }
            }
        case 'OccupationalHealthcare':
            return {
                ...newEntry,
                type: 'OccupationalHealthcare',
                employerName: parseName(object.employerName),
                sickLeave: {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                }

            }
        default:
            throw new Error(`Incorrect entry type`);
    }
}



