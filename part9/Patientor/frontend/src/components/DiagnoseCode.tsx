import { Diagnosis } from "../types";
import { useState,useEffect } from "react";
import diagnoseService from "../services/diagnoses";

const ListDiagnose = ({ code }: { code: string | null }) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

    useEffect(() => {
        diagnoseService.getDiagnose().then(response => setDiagnoses(response));
    }, [code]);
    return (
        <div>
            {diagnoses?.map(diagnose => {
                return (
                    <div key={code}>
                        {diagnose.code === code ? (
                            <li key={code}>{diagnose.code} - {diagnose.name}</li>
                        ) : null}
                    </div>
                );
            })};
        </div>
    );
};


const DiagnoseCode = ({ diagnose }: { diagnose: Array<Diagnosis['code']> | undefined }) => {

    return (
        <div>
            <ul>
                {diagnose?.map(code => (
                    <ListDiagnose code={code} key={ code} />
                ))}
            </ul>
        </div>
    );
};

export default DiagnoseCode;