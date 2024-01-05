import * as React from 'react';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import {
  Menu, MenuItem, Tabs, Tab, Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ChromePicker } from 'react-color';
import Materialtable from 'src/sections/customer/material-table';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const now = new Date();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Page = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const router = useRouter();
  const { username } = router.query;

  const [selectedSubValues, setSelectedSubValues] = useState([]);
  const [defaultSettings, setDefaultSettings] = useState(null);

  const [value, setValue] = React.useState(0);



  const handleBrightnessChange = (event, newValue) => {
    setBeaconData((prevData) => ({
      ...prevData,
      brightness: newValue,
    }));
  };

  const [beaconData, setBeaconData] = useState({
    color: { r: 0, g: 0, b: 0, a: 1 },
    brightness: '50',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = localStorage.getItem('idToken');
        const { username } = router.query;

        if (!username) {
          console.error('Username not provided in the URL.');
          return;
        }
        const response = await axios.get('https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/users/getUsers', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const user = response.data['AWS-result'].find(user => user.family_name === username);

        if (!user) {
          console.error(`User with username ${username} not found.`);
          return;
        }

        const obtainedUserId = user.sub;
        setUserId(obtainedUserId);


        const responseSettings = await axios.post(`https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/devices/getCurrentSettings/${obtainedUserId}`,
          {
            user_id: obtainedUserId
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (responseSettings.data && responseSettings.data.success) {
          setDefaultSettings(responseSettings.data.current_settings);
        } else {
          console.error('Failed to fetch default settings.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username, router]);

  useEffect(() => {
    if (defaultSettings) {
      const beaconDefaultSettings = defaultSettings.find(
        (setting) => setting.Beacon === 'LED'
      );

      const buzzerDefaultSettings = defaultSettings.find(
        (setting) => setting.Beacon === 'Buzzer'
      );

      const chargeControlDefaultSettings = defaultSettings.find(
        (setting) => setting.Beacon === 'Buzzer'
      );

      if (beaconDefaultSettings) {
        setBeaconData({
          color: { r: beaconDefaultSettings.R, g: beaconDefaultSettings.G, b: beaconDefaultSettings.B, a: 1 },
          brightness: beaconDefaultSettings.BRIGHTNESS,
          onTime: beaconDefaultSettings.ON_TIME,
          offTime: beaconDefaultSettings.OFF_TIME,
          duration: beaconDefaultSettings.DURATION,
        });
      }

      if (buzzerDefaultSettings) {
        setBuzzerData({
          onTime: buzzerDefaultSettings.ON_TIME,
          offTime: buzzerDefaultSettings.OFF_TIME,
          duration: buzzerDefaultSettings.DURATION,
        });
      }

      if (chargeControlDefaultSettings) {
        setChargeControlData({
          minBatteryPercentage: chargeControlDefaultSettings.charge_control,
        });
      }
    }
  }, [defaultSettings]);

  const handleSelectedSubValuesChange = (subValues) => {
    setSelectedSubValues(subValues);
  };

  const handleSubmit = async (sub) => {
    try {
      const idToken = localStorage.getItem('idToken');
      const apiUrl = 'https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/devices/storeDeviceProps/';
      const dataToSend = {
        user_id: sub,
        R: beaconData.color.r,
        G: beaconData.color.g,
        B: beaconData.color.b,
        led_BRIGHTNESS: (beaconData.brightness),
        led_ON_TIME: beaconData.onTime,
        led_OFF_TIME: beaconData.offTime,
        led_DURATION: beaconData.duration,
        buzz_ON_TIME: buzzerData.onTime,
        buzz_OFF_TIME: buzzerData.offTime,
        buzz_DURATION: buzzerData.duration,
        charge_control: chargeControlData.minBatteryPercentage,
      };

      console.log('Data to send:', dataToSend);

      const response = await axios.post(apiUrl, dataToSend,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });
      console.log('API Response:', response);

      if (response.status !== 200) {
        throw new Error('Failed to save data');
      }
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleSaveButtonClick = () => {
    const validSubValues = selectedSubValues.filter((sub) => sub.sub !== undefined && sub.sub !== null);

    validSubValues.forEach((sub) => {
      handleSubmit(sub.sub);
    });
  };


  const handleInputChange = (event, section, field) => {
    const value = event.target.value;
    const numericValue = value === '' ? '' : parseFloat(value);
    switch (section) {
      case 'beacon':
        setBeaconData((prevData) => ({
          ...prevData,
          [field]: numericValue,
        }));
        break;
      case 'buzzer':
        setBuzzerData((prevData) => ({
          ...prevData,
          [field]: numericValue,
        }));
        break;
      case 'chargeControl':
        setChargeControlData((prevData) => ({
          ...prevData,
          [field]: numericValue,
        }));
        break;
      default:
        break;
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>
          Customers | MyHomeBeacon
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container
          maxWidth="xl">
          <Stack
            spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">
                Users
              </Typography>
              <SvgIcon
                fontSize="large"
                style={{ cursor: "pointer" }}
                onClick={handleClickOpen}>
                <CogIcon color='black' />
              </SvgIcon>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
              >
                <DialogTitle
                  sx={{ m: 0, p: 2 }}
                  id="customized-dialog-title">
                  User Device Settings
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Stack
                    spacing={1} >
                    <Container
                      sx={{ display: "-webkit-flex" }}>
                      <Card>
                        <CardContent
                          sx={{ display: "flex", paddingBottom: 0, paddingTop: 0 }}>
                          <Stack
                            spacing={1}
                            sx={{ maxWidth: 500 }}>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}>
                              <Typography
                                fontSize={20}
                                fontWeight="bold" >
                                Beacon</Typography>
                            </Box>
                            <ChromePicker
                              color={beaconData.color}
                              onChange={handleColorChange} />
                          </Stack>
                          <Stack
                            spacing={1}
                            paddingLeft={5}
                            sx={{ maxWidth: 500 }}>
                            <Box
                              sx={{ width: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Typography
                                fontSize={20}
                                fontWeight="bold" >
                                LED:</Typography>
                            </Box>

                            <TextField
                              label="Pattern On-Time (ms)"
                              value={beaconData.onTime}
                              onChange={(e) => handleInputChange(e, 'beacon', 'onTime')}
                            />
                            <TextField
                              label="Pattern Off-Time (ms)"
                              value={beaconData.offTime}
                              onChange={(e) => handleInputChange(e, 'beacon', 'offTime')}
                            />
                            <TextField
                              label="Active Duration (sec)"
                              value={beaconData.duration}
                              onChange={(e) => handleInputChange(e, 'beacon', 'duration')}
                            />
                            <Box
                              sx={{ width: 300 }}>
                              <Typography >
                                Brightness:</Typography>
                              <Slider
                                value={beaconData.brightness}
                                onChange={handleBrightnessChange}
                                aria-label="Default"
                                valueLabelDisplay="auto" />
                            </Box>
                          </Stack>
                          <Stack
                            spacing={1}
                            paddingLeft={5}
                            sx={{ maxWidth: 500 }}>
                            <Box
                              sx={{ width: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Typography
                                fontSize={20}
                                fontWeight="bold" >
                                Buzzer :</Typography>
                            </Box>
                            <TextField
                              label="Pattern On-Time (ms)"
                              value={buzzerData.onTime}
                              onChange={(e) => handleInputChange(e, 'buzzer', 'onTime')}
                            />
                            <TextField
                              label="Pattern Off-Time (ms)"
                              value={buzzerData.offTime}
                              onChange={(e) => handleInputChange(e, 'buzzer', 'offTime')}
                            />
                            <TextField
                              label="Active Duration (sec)"
                              value={buzzerData.duration}
                              onChange={(e) => handleInputChange(e, 'buzzer', 'duration')}
                            />
                          </Stack>
                        </CardContent>
                        <Card>
                          <CardHeader
                            title="Charge Control"
                            sx={{ paddingTop: 2, paddingRight: 3, paddingBottom: 2 }} />
                          <CardContent
                            sx={{ paddingBottom: 0, paddingTop: 0 }}>
                            <Stack
                              spacing={1}
                              sx={{ maxWidth: 700 }}>
                              <TextField
                                label="Minimum battery percentage to start charge"
                                value={chargeControlData.minBatteryPercentage}
                                onChange={(e) =>
                                  handleInputChange(e, 'chargeControl', 'minBatteryPercentage')
                                }
                              />
                            </Stack>
                          </CardContent>
                        </Card>
                        <Divider />
                      </Card>
                    </Container>
                    <Container>

                    </Container>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSaveButtonClick();
                    }}>
                    Save
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </Stack>


            <Materialtable
              onSelectedSubValuesChange={handleSelectedSubValuesChange} />

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