import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import {
    Box, Typography, Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Divider,
    Stack
} from '@mui/material';


import { useRouter } from 'next/router';

import ExpandableRowGrid from './table';
import ExpandTable from './table';


export const data = [
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "dylan@email.com",
        firstName: 'Dylan',
        lastName: 'Murray',
        birthdate: "11-07-1978",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        lon: "77.743729",
        lat: "13.173898",
        city: 'East Daphne',
        zip: "824872",
        state: 'Kentucky',
        current_time: "19:33:21",
        os:"iOS",
        offline: "8",
        homehub: [{
            active: true,

            Hub_id: "102",

            Slaves_Connected: "2",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "raquel@email.com",
        firstName: 'Raquel',
        lastName: 'Kohler',
        birthdate: "11-07-1978",
        phone_number: "(123) 456-7890",
        address: '769 Dominic Grove',
        lon: "77.743729",
        lat: "13.173898",
        city: 'Columbus',
        zip: "364872",
        state: 'Ohio',
        current_time: "19:33:21",
        os : "Android",
        offline: "3",
        homehub: [{
            active: false,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"
        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "robert@email.com",
        firstName: "Robert",
        lastName: "Openheimer",
        birthdate: "02-01-1919",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "6",
        homehub: [{
            active: true,
            Hub_id: "101",

            Slaves_Connected: "2",

            Beacon_id: "201",

            Puck_id: "251",

            Hub_Firmware_version: "1.3",

            Landline: "Yes",

            Wifi_Strength: "25Mbps",

            Hub_logs: "02-06-2023"


        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],

    },
    {
        sub: "4bf5ed68-523d-4c32-9563-94154d038a9d",
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Johnson",
        birthdate: "09-12-1985",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "53",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "8b5c7a34-77f3-4d8c-ae2b-9995e4501f68",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        birthdate: "03-25-1990",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "72",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "df05d64c-8347-482a-a446-b89b0d1c9ac0",
        email: "mary.smith@example.com",
        firstName: "Mary",
        lastName: "Smith",
        birthdate: "11-07-1978",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "26",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "2ae82b38-543a-4d4e-9643-c19d581352c6",
        email: "sam.jones@example.com",
        firstName: "Sam",
        lastName: "Jones",
        birthdate: "06-25-2000",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "93",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "a9c73c1f-2bb9-42f9-9d8c-7e86b33ef531",
        email: "alex.smith@example.com",
        firstName: "Alex",
        lastName: "Smith",
        birthdate: "04-15-1993",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "2",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "1b4f49ab-58a2-4fe2-b4e0-3a4375f88fc7",
        email: "kate.johnson@example.com",
        firstName: "Kate",
        lastName: "Johnson",
        birthdate: "12-22-1982",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "13",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "1d8f7469-9761-4ab7-9e21-d6d2167e20fb",
        email: "james.wilson@example.com",
        firstName: "James",
        lastName: "Wilson",
        birthdate: "08-02-1965",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "27",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "81cc9185-5d8a-42c2-9e1b-167935edf017",
        email: "linda.taylor@example.com",
        firstName: "Linda",
        lastName: "Taylor",
        birthdate: "01-18-1998",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "4",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "6f07d1b6-345e-45de-b147-e1cd46cd3ec3",
        email: "peter.miller@example.com",
        firstName: "Peter",
        lastName: "Miller",
        birthdate: "07-10-1970",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "6",
        homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    },
    {
        sub: "7d29e9a1-4f59-4d1d-9cfc-c935bdc9d75e",
        email: "susan.brown@example.com",
        firstName: "Susan",
        middleName: "e",
        lastName: "Brown",
        birthdate: "05-28-1989",
        phone_number: "(123) 456-7890",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        zip: "824872",
        lon: "77.743729",
        lat: "13.173898",
        offline: "8",
        homehub: [{
            active: true,

            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "02-07-2023"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20dBm",

            Firmware_version: "1.1",

            Beacon_logs: "02-05-2023"
        }],

        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40dBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "05-02-2023",

            Accelerometer: "15",
        }],
    }
];
function getSubByEmail(email) {
    for (const entry of data) {
        if (entry.email === email) {
            return { sub: entry.sub, lat: entry.lat, lon: entry.lon, offline: entry.offline };
        }
    }
    return null;
}

export let latitude = '';
export let longitude = '';
export let offline = '';


const Materialtable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            // {
            //     accessorKey: 'sub',
            //     header: 'ID',
            // },


            {
                accessorKey: 'firstName',
                header: 'Firstname',
            },
            {
                accessorKey: 'lastName',
                header: 'Lastname',
            },
            {
                accessorKey: 'address',
                header: 'Address'
            },
            {
                accessorKey: 'city',
                header: 'City'
            },
            {
                accessorKey: 'zip',
                header: 'ZipCode'
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone_number',
                header: 'Contact number',
            },
            {
                // accessorFn: (originalRow) => new Date(originalRow.birthdate), //convert to date for sorting and filtering
                accessorKey: 'birthdate',
                header: 'Date of Birth',
                // filterVariant: 'date-range',
                // Cell: ({ cell }) => cell.getValue().toLocaleDateString(), // convert back to string for display
                filterVariant: 'range',
                
            },
            {
                accessorKey: 'os',
                header: 'Operating system',
            }


        ],
        [],
        //end
    );



    const handleRowClick = (row) => {
        // Extract the username from the clicked row data
        const username = row.original.lastName.toLowerCase(); // Assuming 'lastName' contains the username
        const email = row.original.email;
        const body = getSubByEmail(email);
        console.log(email, body);
        latitude = body.lat;
        longitude = body.lon;
        offline = body.offline;
        //Make a API call to get geo co-ordinates by sending sub
        // Navigate to a new page with the username in the URL
        router.push(`/user/${username}`);
    };

    const subtable = useMaterialReactTable({
        columns,
        data
    });

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: true, //hide expand all double arrow in column header
        enableExpanding: true,
        filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
        initialState: { expanded: false }, //expand all rows by default
        paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
        filterFromLeafRows: true,
        enableFullScreenToggle: false,
        columnFilterDisplayMode: 'popover',
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                handleRowClick(row);
            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                backgroundColor: [2, 5, 7].includes(row.index) ? 'rgba(217, 30, 24,0.5)' : 'inherit',
                color:'red',
            },
        }),
        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
                    // display: 'grid',
                    // margin: 'auto',
                    // gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                }}
            >
                <Stack direction="row" spacing={5}>



                    <Stack sx={{ width: "25%", overflowX: "scroll" }} textAlign='center'>
                        <Typography variant="h6" sx={{ fontSize: "14px" }} gutterBottom component="div">
                            {"User Provided Name"}
                        </Typography>
                        <Divider />
                        <Typography sx={{ fontSize: "12px" }} >
                            Home Hub
                        </Typography>



                        <Table size="small">
                            {/* <TableHead > */}
                            {/* <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Slaves Connected</TableCell>
                                <TableCell >Beacon ID</TableCell>
                                <TableCell >Puck ID</TableCell>
                                <TableCell >Firmware Version</TableCell>
                                <TableCell >Landline</TableCell>
                                <TableCell >WiFi Strength</TableCell>
                                <TableCell >Hub Logs</TableCell>
                            </TableRow> */}
                            {/* </TableHead> */}
                            {/* <TableBody> */}
                            <TableRow >
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>ID</TableCell>
                                <TableCell>{row.original.homehub[0].Hub_id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Slaves Connected</TableCell>
                                <TableCell>{row.original.homehub[0].Slaves_Connected}</TableCell>
                            </TableRow>

                            {/* <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Beacon ID</TableCell>
                                <TableCell>{row.original.homehub[0].Beacon_id}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Puck ID</TableCell>
                                <TableCell >{row.original.homehub[0].Puck_id}</TableCell>
                            </TableRow> */}

                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                <TableCell >{row.original.homehub[0].Hub_Firmware_version}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Landline</TableCell>
                                <TableCell >{row.original.homehub[0].Landline}</TableCell>
                            </TableRow>

                            {/* <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>WiFi Strength</TableCell>
                                <TableCell >{row.original.homehub[0].Wifi_Strength}</TableCell>
                            </TableRow> */}

                            {/* <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>HomeHub Logs</TableCell>
                                <TableCell >{row.original.homehub[0].Hub_logs}</TableCell>
                            </TableRow> */}

                            {/* </TableBody> */}
                        </Table>
                    </Stack>
                    <Stack sx={{ width: "25%", overflowX: "scroll" }} textAlign='center'>
                        <Box sx={{}}>
                            <Typography variant="h6" sx={{ fontSize: "14px" }} gutterBottom component="div">
                                {"User Provided Name"}
                            </Typography>
                            <Divider />
                            <Typography sx={{ fontSize: "12px" }} >
                                Beacon
                            </Typography>

                            <Table size="small" align="center">

                                <TableRow >
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>ID</TableCell>
                                    <TableCell>   {row.original.beacon[0].Beacon_id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Battery Level</TableCell>
                                    <TableCell> {row.original.beacon[0].Battery_Level}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Solar Level</TableCell>
                                    <TableCell>{row.original.beacon[0].Solar_Level}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Temprature</TableCell>
                                    <TableCell> {row.original.beacon[0].Temp}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>RSSI</TableCell>
                                    <TableCell> {row.original.beacon[0].RSSI}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                    <TableCell> {row.original.beacon[0].Firmware_version}</TableCell>

                                </TableRow>
                                {/* <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Beacon Logs</TableCell>
                                    <TableCell> {row.original.beacon[0].Beacon_logs}</TableCell>
                                </TableRow> */}

                            </Table>
                        </Box>
                    </Stack>



                    {/* <Stack sx={{width:"20%", overflowX:"scroll"}} textAlign='center'>
                        <Typography variant="h6" sx={{fontSize:"14px"}} gutterBottom component="div">
                         {"User Provided Name"}
                            <Divider/>
                            Home Hub     
                       
                        </Typography>
                        <Table size="small">
                            <TableHead >
                                
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Slaves Connected</TableCell>
                                    <TableCell >Beacon ID</TableCell>
                                    <TableCell >Puck ID</TableCell>
                                    <TableCell >Firmware Version</TableCell>
                                    <TableCell >Landline</TableCell>
                                    <TableCell >WiFi Strength</TableCell>
                                    <TableCell >Hub Logs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell>{row.original.homehub[0].Hub_id}</TableCell>
                                    <TableCell>{row.original.homehub[0].Slaves_Connected}</TableCell>
                                    <TableCell>{row.original.homehub[0].Beacon_id}</TableCell>
                                    <TableCell >{row.original.homehub[0].Puck_id}</TableCell>
                                    <TableCell >{row.original.homehub[0].Hub_Firmware_version}</TableCell>
                                    <TableCell >{row.original.homehub[0].Landline}</TableCell>
                                    <TableCell >{row.original.homehub[0].Wifi_Strength}</TableCell>
                                    <TableCell >{row.original.homehub[0].Hub_logs}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Stack>
                    <Stack sx={{width:"20%", overflowX:"scroll"}}>
                        <Box sx={{}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Beacon
                            </Typography>
                            <Table size="small" align="center">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Battery Level</TableCell>
                                        <TableCell >Solar Level</TableCell>
                                        <TableCell >Temprature</TableCell>
                                        <TableCell >RSSI</TableCell>
                                        <TableCell >Firmware Version</TableCell>
                                        <TableCell >Beacon Logs</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>


                                    <TableRow>
                                        <TableCell>
                                            {row.original.beacon[0].Beacon_id}
                                        </TableCell>
                                        <TableCell> {row.original.beacon[0].Battery_Level}</TableCell>
                                        <TableCell > {row.original.beacon[0].Solar_Level}</TableCell>
                                        <TableCell > {row.original.beacon[0].Temp} </TableCell>
                                        <TableCell> {row.original.beacon[0].RSSI}</TableCell>
                                        <TableCell> {row.original.beacon[0].Firmware_version}</TableCell>
                                        <TableCell> {row.original.beacon[0].Beacon_logs}</TableCell>
                                    </TableRow>

                                </TableBody>

                            </Table>
                        </Box>
                    </Stack> */}
                    <Stack sx={{ width: "25%", overflowX: "scroll" }} textAlign='center'>
                        <Box sx={{}}>
                            <Typography variant="h6" sx={{ fontSize: "14px" }} gutterBottom component="div">
                                {"User Provided Name"}
                            </Typography>
                            <Divider />
                            <Typography sx={{ fontSize: "12px" }} >
                                Puck
                            </Typography>
                            <Table size="small">                    

                                <TableRow >
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>ID</TableCell>
                                    <TableCell>{row.original.puck[0].Puck_id}</TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Battery Level</TableCell>
                                    <TableCell>{row.original.puck[0].Puck_Battery_Level}</TableCell>
                                </TableRow>

                                {/* <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Accelermeter</TableCell>
                                    <TableCell>{row.original.puck[0].Accelerometer}</TableCell>
                                </TableRow> */}

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>RSSI</TableCell>
                                    <TableCell>{row.original.puck[0].RSSI_Signal}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                    <TableCell >
                                        {row.original.puck[0].Puck_Firmware_Version}
                                    </TableCell>
                                </TableRow>

                                {/* <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Puck Logs</TableCell>
                                    <TableCell>{row.original.puck[0].Puck_logs}</TableCell>
                                </TableRow> */}
                          




                                {/* <TableRow >
                                    <TableCell>{row.original.puck[0].Puck_id}</TableCell>
                                    <TableCell>{row.original.puck[0].Puck_Battery_Level}</TableCell>
                                    <TableCell>{row.original.puck[0].Accelerometer}</TableCell>
                                    <TableCell align="right">{row.original.puck[0].RSSI_Signal}</TableCell>
                                    <TableCell align="right">
                                        {row.original.puck[0].Puck_Firmware_Version}
                                    </TableCell>
                                    <TableCell>{row.original.puck[0].Puck_logs}</TableCell>

                                </TableRow> */}



                            </Table>
                        </Box>
                    </Stack>
                </Stack>

            </Box >
        ),

    });

    return <MaterialReactTable table={table} />;
};

export default Materialtable;
