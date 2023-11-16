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
        setup_start_time: '17:40:00',
        setup_finish_time: '18:22:30',
        support:'Yes',     
      
    },
    {
        date: '14/11/2023',
        time: '11:24',
        setup_start_time: '09:23:00',
        setup_finish_time: '10:55:10',
        support:'No',     
      
    },
];

const Beaconlogtable = () => {

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
                accessorKey: 'setup_start_time',
                header: 'Setup start time',
            },
            {
                accessorKey: 'setup_finish_time',
                header: 'Setup finish time',
            },
            {
                accessorKey: 'support',
                header: 'Support required',
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

export default Beaconlogtable;
