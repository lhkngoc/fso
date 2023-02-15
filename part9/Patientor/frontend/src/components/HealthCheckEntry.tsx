import React from 'react';
import { HealthCheckEntry } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Card, CardContent,Typography } from '@mui/material';
const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    const color = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return "success";
            case 1:
                return "info";
            case 2:
                return "warning";
        }

    };
    return (
        <>
        <Card>
          <CardContent>
            {entry.date} <MedicalServicesIcon/>
            <Typography margin="2px"><i>{entry.description}</i></Typography>
            <Typography margin="2px"><FavoriteIcon color={color()} /></Typography>
            <Typography margin="2px">diagnose by {entry.specialist}</Typography>
          </CardContent>
        </Card>
        </>

    );
};

export default HealthCheck;