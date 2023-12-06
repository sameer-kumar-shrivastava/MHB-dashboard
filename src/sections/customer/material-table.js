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


export const existingData = [
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "dylan@email.com",
        firstName: 'Dylan',
        lastName: 'Murray',
        birthdate: "1978-11-07",
        phone_number: "9876543210",
        address: '261 Erdman Ford',
        lon: "77.743729",
        lat: "13.173898",
        homehub: [{
            active: true,

            Hub_id: "102",

            Slaves_Connected: "2",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"

        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20DBM",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "raquel@email.com",
        firstName: 'Raquel',
        lastName: 'Kohler',
        birthdate: "1978-11-07",
        phone_number: "75433890864",
        address: '769 Dominic Grove',
        lon: "77.743729",
        lat: "13.173898",
        homehub: [{
            active: false,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"
        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20DBM",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    },
    {
        sub: "38c67d21-a1f5-425d-90cd-b145d1b28ec8",
        email: "raquel@email.com",
        firstName: 'Raquel',
        lastName: 'Kohler',
        birthdate: "1978-11-07",
        phone_number: "75433890864",
        address: '769 Dominic Grove',
        lon: "77.743729",
        lat: "13.173898",
        homehub: [{
            active: false,
            Hub_id: "102",

            Slaves_Connected: "1",

            Beacon_id: "202",

            Puck_id: "252",

            Hub_Firmware_version: "1.3",

            Landline: "No",

            Wifi_Strength: "28Mbps",

            Hub_logs: "2023-02-07"
        }],

        beacon: [{
            Beacon_id: "201",

            Battery_Level: "98%",

            Solar_Level: "5",

            Temp: "50°C",

            RSSI: "20DBM",

            Firmware_version: "1.1",

            Beacon_logs: "2023-02-05"
        }],
        puck: [{
            Puck_id: "251",

            Puck_Battery_Level: "97%",

            RSSI_Signal: "40DBm",

            Puck_Firmware_Version: "1.1",

            Puck_logs: "2023-05-02",

            Accelerometer: "15",
        }],
    }
    
    
];
function getSubByEmail(email) {
    for (const entry of existingData) {
        if (entry.email === email) {
            return { sub: entry.sub, lat: entry.lat, lon: entry.lon };
        }
    }
    return null;
}

export let latitude = '';
export let longitude = '';


const Materialtable = () => {
    const token = localStorage.getItem('idToken');
    const apiUrl = 'https://x4oa3p0wff.execute-api.us-west-1.amazonaws.com/dev/api/v1/users/getUsers';
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            // Add any other headers if needed
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(apiResponse => {
            // Replace the top-level data in each item with the API response
            apiResponse["AWS-result"].forEach((apiItem, index) => {
                if (existingData[index]) {
                    existingData[index].sub = apiItem?.sub || " ";
                    existingData[index].email = apiItem?.email || " ";
                    existingData[index].firstName = apiItem?.given_name || " ";
                    existingData[index].lastName = apiItem?.family_name || " ";
                    existingData[index].birthdate = apiItem?.birthdate || " ";
                    existingData[index].phone_number = apiItem?.phone_number || " ";
                    existingData[index].address = apiItem?.address || " ";
                    existingData[index].lon = apiItem['custom:longitude'] || " ";
                    existingData[index].lat = apiItem['custom:latitude'] || " ";

                    
                }
            });
    
           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

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
        //Make a API call to get geo co-ordinates by sending sub
        // Navigate to a new page with the username in the URL
        router.push(`/user/${username}`);
    };

    // const subtable = useMaterialReactTable({
    //     columns,
    //     existingData
    // });
  
    const table = useMaterialReactTable({
        columns,
        existingData,
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
                                <TableCell >{row?.original?.homehub[0]?.Hub_Firmware_version}</TableCell>
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

                                <TableRow>
                                    <TableCell variant="head" sx={{ backgroundColor: '#f3f3f3' }}>Accelermeter</TableCell>
                                    <TableCell>{row.original.puck[0].Accelerometer}</TableCell>
                                </TableRow>

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