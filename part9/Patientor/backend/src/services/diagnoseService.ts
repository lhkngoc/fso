import diagnoses from '../../data/diagnose'

import { DiagnoseEntry } from '../types/types'


const getDiagnoseEntries = ():Array<DiagnoseEntry> => {
    return diagnoses
}

export default {
    getDiagnoseEntries
}