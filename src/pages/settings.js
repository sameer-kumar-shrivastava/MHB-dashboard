// src/pages/settings.js
import { useState, useCallback } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Button, Grid } from '@mui/material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { ChromePicker } from 'react-color';
import Slider from '@mui/material/Slider';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';

const Page = () => {
  const router = useRouter();

  const handleBeconClick = () => {
    router.push('/settings/beacon');
  };

  const handleGaragePuckClick = () => {
    router.push('/settings/garagepuck');
  };

  const handleUserSettingsClick = () => {
    router.push('/settings/usersetting');
  };

  const [beaconData, setBeaconData] = useState({
    color: { r: 0, g: 0, b: 0, a: 1 },
    onTime: '',
    offTime: '',
    duration: '',
  });

  const [buzzerData, setBuzzerData] = useState({
    onTime: '',
    offTime: '',
    duration: '',
  });

  const handleColorChange = (color) => {
    setBeaconData((prevData) => ({
      ...prevData,
      color: color.rgb,
    }));
  };

  const [chargeControlData, setChargeControlData] = useState({
    minBatteryPercentage: '',
  });



  const handleInputChange = (event, section, field) => {
    const value = event.target.value;
    switch (section) {
      case 'beacon':
        setBeaconData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'buzzer':
        setBuzzerData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'chargeControl':
        setChargeControlData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSave = (section) => {
    // Handle saving data or API calls here based on section
    switch (section) {
      case 'beacon':
        alert('Saving Beacon Data:' + beaconData.color);
        console.log('Saving Beacon Data:', beaconData);
        break;
      case 'buzzer':
        alert('Saving Buzzer Data: ' + buzzerData);
        console.log('Saving Buzzer Data:', buzzerData);
        break;
      case 'chargeControl':
        alert('Saving Charge Control Data: ' + chargeControlData.minBatteryPercentage + "%");
        console.log('Saving Charge Control Data:', chargeControlData.minBatteryPercentage);
        break;
      default:
        break;
    }
  };


  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Head>
        <title>
          Settings | MyHomeBeacon
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} >
            <Typography variant="h4">
              Settings
            </Typography>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                {/* <AccountProfile /> */}
              </Grid>
            </Grid>
          </Stack>
        </Container>

      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
