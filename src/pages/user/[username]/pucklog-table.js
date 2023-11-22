import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useRouter } from 'next/router';

export const data = [
    {
        date: '16/11/2023',
        time: '18:20',
        status: "Open",
        open_duration: 5,
        battery_level: 56,
        open_per: 100

      
    },
    {
        date: '14/11/2023',
        time: '11:24',
        status: "Open",
        open_duration: 10,
        battery_level: 57,
        open_per: 84   
      
    },
];

const Pucklogtable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'time',
                header: 'Time',
            },

            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'open_duration',
                header: 'Open Duration(min)',
            },
            {
                accessorKey: 'battery_level',
                header: 'Battery Level',
            },
            {
                accessorKey: 'open_per',
                header: 'Open %',
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
