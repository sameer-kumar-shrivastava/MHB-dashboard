// src/pages/settings.js

import Head from 'next/head';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';

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
          <Stack spacing={3}>
            <Typography variant="h4">
              Settings
            </Typography>
            <Stack spacing={4}  sx={{width:'25%'}}>
              {/* Buttons to navigate */}
              <Button variant="contained" color="primary" onClick={handleBeconClick}>
                Beacon Settings
              </Button>
              <Button variant="contained" color="primary" onClick={handleGaragePuckClick}>
                Garage Puck Settings
              </Button>
              <Button variant="contained" color="primary" onClick={handleUserSettingsClick}>
                User Settings
              </Button>
            </Stack>
            {/* <SettingsNotifications /> */}
            {/* <SettingsPassword /> */}
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
