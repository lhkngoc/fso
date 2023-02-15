import { Card, CardContent,Typography } from '@mui/material';
import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';
const OccupationalHeathCare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          {entry.date} <WorkIcon/> {entry.employerName}
          <Typography margin="2px"><i>{entry.description}</i></Typography>
          <Typography margin="2px">diagnose by {entry.specialist}</Typography>
          {entry.sickLeave && <Typography margin="2px">Date: from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</Typography> }
        </CardContent>
      </Card>
    </>
  );
};

export default OccupationalHeathCare;