import { useMemo, useEffect, useState } from 'react';
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
import axios from 'axios';


// function getSubByEmail(email) {
//     for (const entry of data) {
//         if (entry.email === email) {
//             return { sub: entry.sub, lat: entry.lat, lon: entry.lon };
//         }
//     }
//     return null;
// }

export let latitude = '';
export let longitude = '';


const Materialtable = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const idToken = localStorage.getItem('idToken');
            const response = await axios.get('https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/users/getUsers', {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            const data = response.data;
            console.log('Data:', data);
            setData(data['AWS-result']);
            data['AWS-result'].forEach(user => {
                if (user.address) {
                    const address = user.address;
                    const pinCodePattern = /\b\d{6}\b/;
                    const match = address.match(pinCodePattern);
                    const pinCode = match ? match[0] : null;
                    const addressWithoutPinCode = address.replace(pinCodePattern, '').trim();
                    console.log(`Pin Code for ${user.first_name} ${user.last_name}:`, pinCode);
                    user.pinCode = pinCode;
                    user.address = addressWithoutPinCode;

                    const cityPattern = /(?:[^,]+,\s*){3}([^,]+)(?=(,|$))/;
                    const matchcity = address.match(cityPattern);
                    const city = matchcity ? matchcity[1].trim() : null;
                    user.city = city;
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'given_name',
                header: 'Firstname',
            },
            {
                accessorKey: 'family_name',
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
                accessorKey: 'pinCode',
                header: 'ZipCode',
            },
            {
                accessorKey: 'email',
                header: 'Email',
                // selector: row => row.email,
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
            },
            


        ],
        [],
        //end
    );

    function getSubByEmail(email) {
        for (const entry of data) {
            if (entry.email === email) {
                return { sub: entry.sub, lat: entry['custom:latitude'], lon: entry['custom:longitude'] };
            }
        }
        return null;
    }

    const handleRowClick = (row) => {
        // Extract the username from the clicked row data
        const username = row.original.family_name; // Assuming 'lastName' contains the username
        const email = row.original.email;
        const body = getSubByEmail(email);
        console.log(email, body);
        latitude = body.lat;
        longitude = body.lon;
        router.push(`/user/${username}`);
    };

    const getBackgroundColor = (family_name) => {
        if (family_name === 'Kumar' || family_name === 'C M') {
            return 'rgba(217, 30, 24, 0.5)';
        }
        return 'inherit';
    };

    const subtable = useMaterialReactTable({
        columns,
        data,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                handleRowClick(row);
            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                backgroundColor: getBackgroundColor(row.original.family_name),
                color: 'red',

            },
        }),
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
                backgroundColor: getBackgroundColor(row.original.family_name),
                color: 'red',

            },
        }),
        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
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
                            <TableRow >
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>ID</TableCell>
                                {/* <TableCell>{row.original.homehub[0].Hub_id}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Slaves Connected</TableCell>
                                {/* <TableCell>{row.original.homehub[0].Slaves_Connected}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                {/* <TableCell >{row.original.homehub[0].Hub_Firmware_version}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Landline</TableCell>
                                {/* <TableCell >{row.original.homehub[0].Landline}</TableCell> */}
                            </TableRow>
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
                                    {/* <TableCell>   {row.original.beacon[0].Beacon_id}</TableCell> */}
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Battery Level</TableCell>
                                    {/* <TableCell> {row.original.beacon[0].Battery_Level}</TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Solar Level</TableCell>
                                    {/* <TableCell>{row.original.beacon[0].Solar_Level}</TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Temprature</TableCell>
                                    {/* <TableCell> {row.original.beacon[0].Temp}</TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>RSSI</TableCell>
                                    {/* <TableCell> {row.original.beacon[0].RSSI}</TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                    {/* <TableCell> {row.original.beacon[0].Firmware_version}</TableCell> */}

                                </TableRow>
                            </Table>
                        </Box>
                    </Stack>
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
                                    {/* <TableCell>{row.original.puck[0].Puck_id}</TableCell> */}

                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Battery Level</TableCell>
                                    {/* <TableCell>{row.original.puck[0].Puck_Battery_Level}</TableCell> */}
                                </TableRow>

                                {/* <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Accelermeter</TableCell>
                                    <TableCell>{row.original.puck[0].Accelerometer}</TableCell>
                                </TableRow> */}

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>RSSI</TableCell>
                                    {/* <TableCell>{row.original.puck[0].RSSI_Signal}</TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Firmware Version</TableCell>
                                    <TableCell >
                                        {/* {row.original.puck[0].Puck_Firmware_Version} */}
                                    </TableCell>
                                </TableRow>
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
