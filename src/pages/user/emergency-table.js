import { useMemo, useState, useEffect } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';

import { useRouter } from 'next/router';

const Emergencytable = () => {
    const [data, setData] = useState([]);

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

                const secondApiResponse = await axios.post('https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/contact/getEC', {
                    user_id: userId, // Place the user_id directly in the request body
                }, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        'Content-Type': 'application/json', // Add content type if needed
                    },
                });

                const data = secondApiResponse.data.data;
                console.log('Data:', data);
                setData(data['AWS-result']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'first_name',
                header: 'First Name',
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
            },

            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone_number',
                header: 'Phone',
            }
        ],
        [],
        //end
    );

    const handleRowClick = (row) => {
        // Extract the username from the clicked row data
        const username = row.original.last_name.toLowerCase(); // Assuming 'lastName' contains the username

        // Navigate to a new page with the username in the URL
        router.push(`/user/${username}`);
    };

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
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                handleRowClick(row);
            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
        }),
    });


    return <MaterialReactTable table={table} />;
};

export default Emergencytable;
