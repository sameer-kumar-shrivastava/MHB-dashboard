// src/pages/settings.js

import Head from 'next/head';
import { Box, Container, Stack, Typography, Button, Grid } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
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
            <Stack spacing={4} direction="row" sx={{ width: '100%' }}>
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
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
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
