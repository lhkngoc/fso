import React from 'react';
import { Header} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from "../constants";
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import OccupationalHeathCare from '../components/OccupationalHeathCare';
import HealthCheck from '../components/HealthCheckEntry';
import Hospital from '../components/HospitalEntry';
import  { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import axios from 'axios';
import { addEntry, useStateValue } from '../state';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';


//Entry Details
const Entries = ({ entry }: { entry: Entry | undefined}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  if (!entry) {
    return null;
  }
  const entryDetails = () => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHeathCare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  console.log(entry);
  return (
    <div>
      {entryDetails()}
    </div>
  );
};

// Patient Detail(Main)
const PatientDetailPage = () => {
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null | undefined>(null);

  React.useEffect(() => {
    if (id) {
      try {
        patientService
          .fetchById(id)
          .then(data => setPatient(data));
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);


 // gender Icon
  const gender = () => {
    switch (patient?.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return ;
    }
  };

  // addNewEntry
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      return setError(`can not find Patient with ${id}`);
    } else {
      try {
        const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
        dispatch(addEntry(newEntry,id));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };


  return (
    <div className="App">
      <Header as="h2">
        {patient?.name} {gender()}
      </Header>
      <div>ssn:{patient?.ssn}</div>
      <div>occupation:{patient?.occupation}</div>
      <Header as="h3"><b>entries</b></Header>
          {patient?.entries.map(entry => (
              <Entries key={entry.id}entry={entry} />
          ))}

      <AddEntryModal
      modalOpen={modalOpen}
      onSubmit={submitNewEntry}
      error={error}
      onClose={closeModal}
      />
    <Button variant="contained" onClick={() => openModal()}>
      Add New Entry
    </Button>
    </div>
  );
};

export default PatientDetailPage;