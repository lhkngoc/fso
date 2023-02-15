import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";


const getDiagnose = async () => {
    const request = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return request.data;
};

export default { getDiagnose };