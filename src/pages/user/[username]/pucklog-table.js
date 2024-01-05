import { useMemo,useState, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';
import { useRouter } from 'next/router';


const Pucklogtable = () => {

    const [data, setData] = useState([]);
    const router = useRouter();
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

                const userId = user.sub;

                const secondApiResponse = await axios.post(`https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/devices/getPuckLogs/${userId}`,
                    {
                        user_id: userId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        },
                    });

                const data = secondApiResponse.data;
                console.log('Puck logs:', data);
                setData(data['logs']);
                
                data['logs'].forEach(log => {
                    const dateTime = new Date(log.date_time);
                    const formattedDate = dateTime.toLocaleDateString();
                    const formattedTime = dateTime.toLocaleTimeString();
                    log.formattedDate = formattedDate;
                    log.formattedTime = formattedTime;

                    const open_close_string = String(log.Open_Close);
                    log.open_close_string = open_close_string;
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [router]);

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'formattedDate',
                header: 'Date',
            },
            {
                accessorKey: 'formattedTime',
                header: 'Time',
            },
            {
                accessorKey: 'device_id',
                header: 'Device Id',
            },
            {
                accessorKey: 'Operated_by',
                header: 'Operated By',
            },
            {
                accessorKey: 'Operation',
                header: 'Operation',
            },
            {
                accessorKey: 'open_close_string',
                header: 'Open or Close',
            },
            {
                accessorKey: 'Battery_Percentage',
                header: 'Puck Battery',
            }
        ],
        [],
        //end
    );


    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false, //hide expand all double arrow in column header
        enableExpanding: false,
        filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
        initialState: { expanded: true }, //expand all rows by default
        paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
        filterFromLeafRows: true,
        enableFullScreenToggle: false,
        // muiTableBodyRowProps: ({ row }) => ({
        //     onClick: (event) => {
        //       handleRowClick(row);
        //     },
        //     sx: {
        //       cursor: 'pointer', //you might want to change the cursor too when adding an onClick
        //     },
        //   }),
    });

    return <MaterialReactTable table={table} />;
};

export default Pucklogtable;
