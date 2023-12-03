import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useRouter } from 'next/router';

export const data = [
    {
        date: '11-23-2023 08:30:00',
        time: '18:20',
        status: "Open",
        open_duration: 5,
        battery_level: 56,
        open_per: 100

      
    },
    {
        date: '10-13-2023 14:15:00',
        time: '11:24',
        status: "Open",
        open_duration: 10,
        battery_level: 57,
        open_per: 84   
      
    },
];

const Puckerrortable = () => {

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
                header: 'Remote Sync Status ',
            },
            {
                accessorKey: 'bat_fully_discharged',
                header: 'Calibration Status',
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

export default Puckerrortable;
