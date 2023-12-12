import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const columns = [
    {
        name: 'ID',
        selector: row => row.sub,
        sortable: true,
    },
    {
        name: 'Username',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'First Name',
        selector: row => row.given_name,
        sortable: true,
    },
    {
        name: 'Middle Name',
        selector: row => row.middle_name,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: row => row.family_name,
        sortable: true,
    },
    {
        name: 'DOB',
        selector: row => row.birthdate,
        sortable: true,
    },
    {
        name: 'Contact Number',
        selector: row => row.phone_number,
        sortable: true,
    },
    {
        name: 'Hub ID',
        selector: row => row.Hub_id,
        sortable: true,
    },
];

const ExpandTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idToken = localStorage.getItem('idToken');
            const response = await axios.get('https://m1kiyejux4.execute-api.us-west-1.amazonaws.com/dev/api/v1/users/getUsers', {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            <DataTable
                title="Home Hub"
                columns={columns}
                data={data}
            />
            <DataTable
                title="Beacon"
                columns={columns}
                data={data}
            />
            <DataTable
                title="Puck"
                columns={columns}
                data={data}
            />
        </>
    );
};

export default ExpandTable;
