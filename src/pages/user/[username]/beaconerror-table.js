import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';

export const data = [
    {
        date: '11-23-2023 08:30:00',
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
        date: '10-23-2023 14:15:00',
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

const Beaconerrortable = () => {

    const router = useRouter();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'date',
                header: 'DateTime',
            },
            {
                accessorKey: 'low_battery',
                header: 'Low Battery',
            },
            {
                accessorKey: 'battery_disconnected',
                header: 'Battery Disconnected',
            },
            {
                accessorKey: 'battery_voltage',
                header: 'Battery Voltage',
            },
            {
                accessorKey: 'over_heat_shudown',
                header: 'Over heat shutdown',
            },
            {
                accessorKey: 'bat_fully_discharged',
                header: 'battery fully discharged',
            },
            {
                accessorKey: 'device_reset',
                header: 'Device reset',
            },
            
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

export default Beaconerrortable;
