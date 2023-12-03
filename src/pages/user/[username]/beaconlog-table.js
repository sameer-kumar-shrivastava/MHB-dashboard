import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';

export const data = [
    {
        date: '11-04-2023',
        time: '18:20',
        battery_start: 75,      
        battery_end: 50,
        color: "Red",
        output_power: "5W",
        temp_start: "25°C",
        temp_end: "28°C",
        home: "NO"
    },
    {
        date: '02-14-2023',
        time: '11:24',
        battery_start: 80,      
        battery_end: 55,
        color: "Green",
        output_power: "5W",
        temp_start: "25°C",
        temp_end: "28°C",
        home: "YES"
      
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
                accessorKey: 'battery_start',
                header: 'Battery Level at  Start',
            },
            {
                accessorKey: 'battery_end',
                header: 'Battery Level at end',
            },
            {
                accessorKey: 'color',
                header: 'Color',
            },
            {
                accessorKey: 'output_power',
                header: 'Output Power',
            },
            {
                accessorKey: 'temp_start',
                header: 'Temperature at Start',
            },
            {
                accessorKey: 'temp_end',
                header: 'Temperature at End',
            },
            {
                accessorKey: 'home',
                header: 'In Home',
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
