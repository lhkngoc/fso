import React from 'react';
import { HospitalEntry } from '../types';
import { Card, CardContent, Typography } from '@mui/material';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <>
        <Card variant="outlined">
            <CardContent>
                {entry.date}
                <Typography margin="2px"><i>{entry.description}</i></Typography>
                <Typography margin="2px">diagnose by {entry.specialist}</Typography>
                <Typography>Discharge:{entry.discharge.date} - criteria:{entry.discharge.criteria }</Typography>
            </CardContent>
        </Card>
        </>
    );
};

export default Hospital;