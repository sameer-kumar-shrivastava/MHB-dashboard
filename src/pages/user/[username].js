// pages/user/[username].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Button, Container, Stack, SvgIcon, Typography, Menu, MenuItem } from '@mui/material';
import Head from 'next/head';
import Emergencytable from './emergency-table';
import Householdtable from './household-table';
import { latitude, longitude } from '../../sections/customer/material-table';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const handleButtonClick = (logType) => {
    // Navigate to the corresponding URL based on the logType
    router.push(`/user/${username}/${logType.toLowerCase()}`);
  };

  const [anchorElHomeHub, setAnchorElHomeHub] = useState(null);
  const [anchorElBeacon, setAnchorElBeacon] = useState(null);
  const [anchorElPuck, setAnchorElPuck] = useState(null);

  const handleMenuClick = (event, device) => {
    switch (device) {
      case 'HomeHub':
        setAnchorElHomeHub(event.currentTarget);
        break;
      case 'Beacon':
        setAnchorElBeacon(event.currentTarget);
        break;
      case 'Puck':
        setAnchorElPuck(event.currentTarget);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setAnchorElHomeHub(null);
    setAnchorElBeacon(null);
    setAnchorElPuck(null);
  };

  const handleMenuItemClick = (device, logType) => {
    let route = '';
    switch (logType) {
      case 'HomeHubLogs':
        route = 'homehublog';
        break;
      case 'HomeHubErrors':
        route = 'homehuberror';
        break;
      case 'BeaconLogs':
        route = 'beaconlog';
        break;
      case 'BeaconErrors':
        route = 'beaconerror';
        break;
      case 'PuckLogs':
        route = 'pucklog';
        break;
      case 'PuckErrors':
        route = 'puckerror';
        break;
      default:
        break;
    }

    router.push(`/user/${username}/${route}`);
    handleClose();
  };

  const TimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(null);
    const [geoCoordinates, setGeoCoordinates] = useState({ latitude: latitude, longitude: longitude });

    useEffect(() => {
      const getTimeForCoordinates = async () => {
        try {
          const response = await fetch(`https://www.timeapi.io/api/Time/current/coordinate?latitude=${geoCoordinates.latitude}&longitude=${geoCoordinates.longitude}`);

          if (!response.ok) {
            throw new Error('Failed to fetch time data');
          }

          const data = await response.json();
          setCurrentTime(new Date(data.dateTime));
        } catch (error) {
          console.error('Error fetching time data:', error);
        }
      };


      const interval = setInterval(() => {
        getTimeForCoordinates();
      }, 1000);


      return () => clearInterval(interval);
    }, [geoCoordinates]);

    if (!currentTime) {
      return <Typography variant="h6" textAlign='end'>Loading...</Typography>;
    }

    return (
      <Typography variant="h6" textAlign='end'>
        Device Current Time: {currentTime.toLocaleTimeString()}
      </Typography>
    );
  };





  return (
    <div>
      {/* <h1>User Page: {username}</h1> */}
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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >

              <Stack spacing={1}>
                <Typography variant="h4">
                  User Page: {username}
                </Typography>
              </Stack>

            </Stack>
            <Box
              component="main"
            // sx={{
            //   flexGrow: 1,
            //   py: 8,
            //   textAlign: 'center',
            // }}
            >
              <TimeDisplay />
            </Box>
            <Stack direction="row" spacing={3}>
              <Button variant="contained" onClick={(event) => handleMenuClick(event, 'HomeHub')}>
                HomeHub
              </Button>
              <Menu
                anchorEl={anchorElHomeHub}
                open={Boolean(anchorElHomeHub)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('HomeHub', 'HomeHubLogs')}>
                  HomeHub Logs
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('HomeHub', 'HomeHubErrors')}>
                  HomeHub Errors
                </MenuItem>
              </Menu>
              <Button variant="contained" onClick={(event) => handleMenuClick(event, 'Beacon')}>
                Beacon
              </Button>
              <Menu
                anchorEl={anchorElBeacon}
                open={Boolean(anchorElBeacon)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('Beacon', 'BeaconLogs')}>
                  Beacon Logs
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Beacon', 'BeaconErrors')}>
                  Beacon Errors
                </MenuItem>
              </Menu>
              <Button variant="contained" onClick={(event) => handleMenuClick(event, 'Puck')}>
                Puck
              </Button>
              <Menu
                anchorEl={anchorElPuck}
                open={Boolean(anchorElPuck)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('Puck', 'PuckLogs')}>
                  Puck Logs
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Puck', 'PuckErrors')}>
                  Puck Errors
                </MenuItem>
              </Menu>
            </Stack>


            <Stack spacing={2}>

              <Typography variant="h6">SET-UP Time : November 19, 2023 3:30 PM </Typography>
              <Typography variant="h6" style={{ marginBottom: '20px' }}>SET-UP Requested: YES </Typography>
              <Typography variant="h6">Emergency Contacts</Typography>

              <Emergencytable />
            </Stack>


            <Stack spacing={1}>
              <Typography variant="h6">Household Members</Typography>
              <Householdtable />
            </Stack>


          </Stack>
        </Container>
      </Box>

    </div>
  );
};

UserPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default UserPage;
