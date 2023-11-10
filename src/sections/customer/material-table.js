import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useRouter } from 'next/router';

export const data = [
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        subRows: [
            {
                firstName: 'Ervin',
                lastName: 'Reinger',
                address: '566 Brakus Inlet',
                city: 'South Linda',
                state: 'West Virginia',
                subRows: [
                    {
                        firstName: 'Jordane',
                        lastName: 'Homenick',
                        address: '1234 Brakus Inlet',
                        city: 'South Linda',
                        state: 'West Virginia',
                    },
                    {
                        firstName: 'Jordan',
                        lastName: 'Clarkson',
                        address: '4882 Palm Rd',
                        city: 'San Francisco',
                        state: 'California',
                    },
                ],
            },
            {
                firstName: 'Brittany',
                lastName: 'McCullough',
                address: '722 Emie Stream',
                city: 'Lincoln',
                state: 'Nebraska',
            },
        ],
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
        subRows: [
            {
                firstName: 'Branson',
                lastName: 'Frami',
                address: '32188 Larkin Turnpike',
                city: 'Charleston',
                state: 'South Carolina',
            },
        ],
    },
];

const Materialtable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'firstName',
                header: 'ID',
            },
            {
                accessorKey: 'lastName',
                header: 'Username',
            },

            {
                accessorKey: 'address',
                header: 'Firstname',
            },
            {
                accessorKey: 'city',
                header: 'Middlename',
            },

            {
                accessorKey: 'state',
                header: 'Lastname',
            },
            {
                accessorKey: 'state',
                header: 'DOB',
            },
            {
                accessorKey: 'state',
                header: 'Contact number',
            },
            {
                accessorKey: 'state',
                header: 'HubID',
            },

        ],
        [],
        //end
    );

    const handleRowClick = (row) => {
        // Extract the username from the clicked row data
        const username = row.original.lastName.toLowerCase(); // Assuming 'lastName' contains the username
    
        // Navigate to a new page with the username in the URL
        router.push(`/user/${username}`);
      };

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: true, //hide expand all double arrow in column header
        enableExpanding: true,
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

export default Materialtable;
