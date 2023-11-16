import DataTable from 'react-data-table-component';
import { AWSUserList } from './data';



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


const columns1 = [
    {
        name: 'ID',
        selector: row => row.sub,
        sortable: true,
    },

    {
        name: 'First Name',
        selector: row => row.given_name,
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

const ExpandedComponent = ({ data }) =>
    <pre>
        {/* {JSON.stringify(data, null, 2)} */}
        <DataTable
            title="Home Hub"
            columns={columns1}
            data={[data]} />
        <DataTable
            title="Beacon"
            columns={columns1}
            data={[data]} />
        <DataTable
            title="Puck"
            columns={columns1}
            data={[data]} />
    </pre>;



const data = [
    {
        sub: "38c67d21-a1f5-430d-90cd-b145d1b28ec8",
        email: "robert@email.com",
        given_name: "Robert",
        middle_name: "J",
        family_name: "Openheimer",
        birthdate: "1919-02-01",
        phone_number: "26210224522",
        Hub_id: "101"

    },
    {
        sub: "4bf5ed68-523d-4c32-9563-94154d038a9d",
        email: "alice@example.com",
        given_name: "Alice",
        middle_name: "k",
        family_name: "Johnson",
        birthdate: "1985-09-12",
        phone_number: "1234567890",
        Hub_id: "102"
    },
    {
        sub: "8b5c7a34-77f3-4d8c-ae2b-9995e4501f68",
        email: "john.doe@example.com",
        given_name: "John",
        middle_name: "A",
        family_name: "Doe",
        birthdate: "1990-03-25",
        phone_number: "9876543210",
        Hub_id: "103"
    },
    {
        sub: "df05d64c-8347-482a-a446-b89b0d1c9ac0",
        email: "mary.smith@example.com",
        given_name: "Mary",
        middle_name: "j",
        family_name: "Smith",
        birthdate: "1978-11-07",
        phone_number: "5551234567",
        Hub_id: "104"
    },
    {
        sub: "2ae82b38-543a-4d4e-9643-c19d581352c6",
        email: "sam.jones@example.com",
        given_name: "Sam",
        middle_name: "l",
        family_name: "Jones",
        birthdate: "2000-06-30",
        phone_number: "9998887777",
        Hub_id: "105"
    },
    {
        sub: "a9c73c1f-2bb9-42f9-9d8c-7e86b33ef531",
        email: "alex.smith@example.com",
        given_name: "Alex",
        middle_name: "y",
        family_name: "Smith",
        birthdate: "1993-04-15",
        phone_number: "4445556666",
        Hub_id: "106"
    },
    {
        sub: "1b4f49ab-58a2-4fe2-b4e0-3a4375f88fc7",
        email: "kate.johnson@example.com",
        given_name: "Kate",
        middle_name: "o",
        family_name: "Johnson",
        birthdate: "1982-12-22",
        phone_number: "77788899909",
        Hub_id: "107"
    },
    {
        sub: "1d8f7469-9761-4ab7-9e21-d6d2167e20fb",
        email: "james.wilson@example.com",
        given_name: "James",
        middle_name: "t",
        family_name: "Wilson",
        birthdate: "1965-08-02",
        phone_number: "2223334444",
        Hub_id: "108"
    },
    {
        sub: "81cc9185-5d8a-42c2-9e1b-167935edf017",
        email: "linda.taylor@example.com",
        given_name: "Linda",
        middle_name: "w",
        family_name: "Taylor",
        birthdate: "1998-01-18",
        phone_number: "6667778888",
        Hub_id: "109"
    },
    {
        sub: "6f07d1b6-345e-45de-b147-e1cd46cd3ec3",
        email: "peter.miller@example.com",
        given_name: "Peter",
        middle_name: "n",
        family_name: "Miller",
        birthdate: "1970-07-10",
        phone_number: "1112223333",
        Hub_id: "110"
    },
    {
        sub: "7d29e9a1-4f59-4d1d-9cfc-c935bdc9d75e",
        email: "susan.brown@example.com",
        given_name: "Susan",
        middle_name: "e",
        family_name: "Brown",
        birthdate: "1989-05-28",
        phone_number: "3334445555",
        Hub_id: "111"
    }
]


// const ExpandableRowGrid = () => {

//     const paginationComponentOptions = {
//         rowsPerPageText: 'No. of Users per page',
//         rangeSeparatorText: 'of',
//         selectAllRowsItem: false,
//         selectAllRowsItemText: 'Show All',
//     };

//     return (
//         <DataTable
//             columns={columns}
//             data={data}
//             expandableRows
//             expandableRowsComponent={ExpandedComponent}
//             pagination
//             paginationComponentOptions={paginationComponentOptions}
//             // customStyles={customStyles}
//             highlightOnHover
//             pointerOnHover
//         // theme="dark"
//         />
//     );
// };

// export default ExpandableRowGrid;

const ExpandTable = () => {
    return(
    <>
            <DataTable
            title="Home Hub"
            columns={columns1}
            data={[data]} />
        <DataTable
            title="Beacon"
            columns={columns1}
            data={[data]} />
        <DataTable
            title="Puck"
            columns={columns1}
            data={[data]} />    
    </>);
}

export default ExpandTable;