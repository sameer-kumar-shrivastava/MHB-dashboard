import Head from 'next/head';
import {
    Box, Container, Stack, Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SettingsPassword } from 'src/sections/settings/settings-password';



const Page = () => {


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
                            User Settings
                        </Typography>
                        <SettingsPassword/>             
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
