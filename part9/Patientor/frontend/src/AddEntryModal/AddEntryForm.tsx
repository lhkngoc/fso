import { Entry, EntryType,HealthCheckRating} from '../types';
import { Formik, Form,Field } from "formik";
import { useStateValue } from '../state';
import { DiagnosisSelection, EntryTypeOption, SelectField} from '../AddPatientModal/FormField';
import { TextField,Option } from '../AddPatientModal/FormField';
import { Grid, Button } from "@material-ui/core";

export type EntryFormValues = Omit<Entry, "id">;


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const ratingOption: Option[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const entryOption: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  {value: EntryType.OccupationalHealthcare, label :"Occupational Health Care"}
];




const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const fieldsEntry = (type: EntryType) => {
    switch (type) {
      case "HealthCheck":
        return (
          <SelectField label="Health Rating" name="healthCheckRating" options={ratingOption} />
        );
      case "Hospital":
        return (
          <div>
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria for discharge"
              name="discharge.criteria"
              component={TextField}
            />
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Employer"
              placeholder="Employer's name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
        default:
          break;
    }
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate:"",
        },
        discharge: {
          date: "",
          criteria:"",
        },
        diagnosisCodes: []
      }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const formatError = "Invalid format";
            const errors: { [field: string]: string | number } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!/^[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}?$/.test(values.date)) {
              errors.date = formatError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if (values.type === EntryType.HealthCheck) {
              errors.healthCheckRating = requiredError;
            }
            if (values.type === EntryType.Hospital && (!values.discharge.criteria || !values.discharge.date)) {
              errors.discharge = requiredError;
            }
            if (values.type === EntryType.OccupationalHealthcare && !values.employerName) {
              errors.employerName = requiredError;
            }
            return errors;
        }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched,values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryOption} />
           <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {fieldsEntry(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

export default AddEntryForm;