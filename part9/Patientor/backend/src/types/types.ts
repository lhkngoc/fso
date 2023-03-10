export enum Gender {
    Male = "male",
    Female = "female",
    Other = 'other'
}

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string

}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn:string,
    gender: Gender,
    occupation: string
    entries: Entry[]
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type SickLeave = {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Discharge = {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;



export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry,"id">

export type NonSsnEntry = Omit<PatientEntry, 'ssn'>

