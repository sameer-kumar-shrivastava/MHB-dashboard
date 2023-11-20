// pages/user/[username].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import Head from 'next/head';
import Emergencytable from './emergency-table';
import Householdtable from './household-table';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const handleButtonClick = (logType) => {
    // Navigate to the corresponding URL based on the logType
    router.push(`/user/${username}/${logType.toLowerCase()}`);
  };

  const TimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(null);
    const [geoCoordinates, setGeoCoordinates] = useState({ latitude: 13.173898, longitude: 77.743729 });
  
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
        Current Time: {currentTime.toLocaleTimeString()}
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
              <Button variant='contained' onClick={() => handleButtonClick('HomeHub')}>HomeHub Logs</Button>
              <Button variant='contained' onClick={() => handleButtonClick('Beacon')}>Beacon Logs</Button>
              <Button variant='contained' onClick={() => handleButtonClick('Puck')}>Puck Logs</Button>
            </Stack>


            <Stack spacing={2}>

              <Typography variant="h6">SET-UP Time : November 19, 2023 3:30 PM </Typography>

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
