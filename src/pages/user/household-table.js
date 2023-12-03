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
        email: 'dylan.murray@hotmail.com',
        phone: '(123) 456-7890',     
      
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        email: 'raquel.murray@gmail.com',
        phone: '(123) 456-7890'   
    },
];

const Householdtable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },

            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            }
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

export default Householdtable;
