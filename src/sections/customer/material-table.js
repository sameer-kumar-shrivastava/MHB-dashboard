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
    TableRow
} from '@mui/material';

import { useRouter } from 'next/router';

import ExpandableRowGrid from './table';
import ExpandTable from './table';

export const data = [
    {
        sub: "38c67d21-a1f5-430d-90cd-b145d1b28ec8",
        email: "dylan@email.com",
        firstName: 'Dylan',
        middleName: 'S',
        lastName: 'Murray',
        birthdate: "1978-11-07",
        phone_number: "9876543210",
        Hub_id: "161",
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        current_time:"19:33:21",
        homehub: [{
            active: true,
            
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-430d-90cd-b145d1b28ec8",
        email: "raquel@email.com",
        firstName: 'Raquel',
        middleName: 'R',
        lastName: 'Kohler',
        birthdate: "1978-11-07",
        Hub_id: "151",
        phone_number: "75433890864",
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
        current_time:"19:33:21",
        homehub: [{
            active: false,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"
        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-430d-90cd-b145d1b28ec8",
        email: "robert@email.com",
        firstName: "Robert",
        middleName: "J",
        lastName: "Openheimer",
        birthdate: "1919-02-01",
        phone_number: "26210224522",
        Hub_id: "101",
        current_time:"19:33:21",
        homehub: [{
            active: true,
            Hub_id: "101",

            Slaves_Connected: "2",

            Beacon_id: "201",

            Puck_id: "301",

            Hub_Firmware_version: "1.3",

            Landline: "Yes",

            Wifi_Strength: "30Mbps",

            Hub_logs: "2023-02-06"


        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],

    },
    {
        sub: "4bf5ed68-523d-4c32-9563-94154d038a9d",
        email: "alice@example.com",
        firstName: "Alice",
        middleName: "k",
        lastName: "Johnson",
        birthdate: "1985-09-12",
        phone_number: "1234567890",
        current_time:"19:33:21",
        Hub_id: "102"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "8b5c7a34-77f3-4d8c-ae2b-9995e4501f68",
        email: "john.doe@example.com",
        firstName: "John",
        middleName: "A",
        lastName: "Doe",
        birthdate: "1990-03-25",
        phone_number: "9876543210",
        current_time:"19:33:21",
        Hub_id: "103"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "df05d64c-8347-482a-a446-b89b0d1c9ac0",
        email: "mary.smith@example.com",
        firstName: "Mary",
        middleName: "j",
        lastName: "Smith",
        birthdate: "1978-11-07",
        phone_number: "5551234567",
        current_time:"19:33:21",
        Hub_id: "104"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "2ae82b38-543a-4d4e-9643-c19d581352c6",
        email: "sam.jones@example.com",
        firstName: "Sam",
        middleName: "l",
        lastName: "Jones",
        birthdate: "2000-06-30",
        phone_number: "9998887777",
        current_time:"19:33:21",
        Hub_id: "105"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "a9c73c1f-2bb9-42f9-9d8c-7e86b33ef531",
        email: "alex.smith@example.com",
        firstName: "Alex",
        middleName: "y",
        lastName: "Smith",
        birthdate: "1993-04-15",
        phone_number: "4445556666",
        current_time:"19:33:21",
        Hub_id: "106"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "1b4f49ab-58a2-4fe2-b4e0-3a4375f88fc7",
        email: "kate.johnson@example.com",
        firstName: "Kate",
        middleName: "o",
        lastName: "Johnson",
        birthdate: "1982-12-22",
        phone_number: "77788899909",
        current_time:"19:33:21",
        Hub_id: "107"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "1d8f7469-9761-4ab7-9e21-d6d2167e20fb",
        email: "james.wilson@example.com",
        firstName: "James",
        middleName: "t",
        lastName: "Wilson",
        birthdate: "1965-08-02",
        phone_number: "2223334444",
        current_time:"19:33:21",
        Hub_id: "108"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "81cc9185-5d8a-42c2-9e1b-167935edf017",
        email: "linda.taylor@example.com",
        firstName: "Linda",
        middleName: "w",
        lastName: "Taylor",
        birthdate: "1998-01-18",
        phone_number: "6667778888",
        current_time:"19:33:21",    

        Hub_id: "109"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "6f07d1b6-345e-45de-b147-e1cd46cd3ec3",
        email: "peter.miller@example.com",
        firstName: "Peter",
        middleName: "n",
        lastName: "Miller",
        birthdate: "1970-07-10",
        phone_number: "1112223333",
        current_time:"19:33:21",
        Hub_id: "110"
        , homehub: [{
            active: true,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "7d29e9a1-4f59-4d1d-9cfc-c935bdc9d75e",
        email: "susan.brown@example.com",
        firstName: "Susan",
        middleName: "e",
        lastName: "Brown",
        birthdate: "1989-05-28",
        phone_number: "3334445555",
        current_time:"19:33:21",
        Hub_id: "111"
        , homehub: [{
            active: true,

            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "302",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "104F",

            RSSI: "20DBm",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],

        puck: [{
            Puck_id: "301",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    }
];

const Materialtable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'sub',
                header: 'ID',
            },
            {
                accessorKey: 'email',
                header: 'Username',
            },

            {
                accessorKey: 'firstName',
                header: 'Firstname',
            },
            {
                accessorKey: 'middleName',
                header: 'Middlename',
            },

            {
                accessorKey: 'lastName',
                header: 'Lastname',
            },
            {
                accessorKey: 'birthdate',
                header: 'DOB',
            },
            {
                accessorKey: 'phone_number',
                header: 'Contact number',
            },
            {
                accessorKey: 'Hub_id',
                header: 'HubID',
            },
            // {
            //     accessorKey: 'current_time',
            //     header: 'Current Time',
            // },

        ],
        [],
        //end
    );

    const handleRowClick = (row) => {
        // Extract the username from the clicked row data
        const username = row.original.lastName.toLowerCase(); // Assuming 'lastName' contains the username
        const user_id = row.original.sub
        //Make a API call to get geo co-ordinates by sending user_id
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
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                handleRowClick(row);
            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
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
                <Typography variant="h8" gutterBottom component="div">
                    Home Hub
                </Typography>
                <Table size="small">
                    <TableHead>
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
                <Box sx={{}}>
                    <Typography variant="h8" gutterBottom component="div">
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
                <Box sx={{}}>
                    <Typography variant="h8" gutterBottom component="div">
                        Puck
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Battery Level</TableCell>
                                <TableCell >Accelerometer</TableCell>
                                <TableCell >RSSI</TableCell>
                                <TableCell >Firmware Version</TableCell>
                                <TableCell >Puck Logs</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>


                            <TableRow >
                                <TableCell>{row.original.puck[0].Puck_id}</TableCell>
                                <TableCell>{row.original.puck[0].Puck_Battery_Level}</TableCell>
                                <TableCell>{row.original.puck[0].Accelerometer}</TableCell>
                                <TableCell align="right">{row.original.puck[0].RSSI_Signal}</TableCell>
                                <TableCell align="right">
                                {row.original.puck[0].Puck_Firmware_Version}
                                </TableCell>
                                <TableCell>{row.original.puck[0].Puck_logs}</TableCell>
                              
                            </TableRow>

                        </TableBody>

                    </Table>
                </Box>

            </Box>
        ),

    });

    return <MaterialReactTable table={table} />;
};

export default Materialtable;
