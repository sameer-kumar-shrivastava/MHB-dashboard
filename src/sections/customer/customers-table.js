import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  SvgIcon,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import SearchIcon from '@mui/icons-material/Search';


function CollapsibleRow(props) {
  const { row, open, onToggle } = props;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
   

      <TableBody>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={onToggle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.address.city}</TableCell>
          <TableCell>{row.address.state}</TableCell>
          {/* <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
        </TableRow>
      </TableBody>
      </Table>


      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Home Hub
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Slaves Connected</TableCell>
                    <TableCell >Beacon ID</TableCell>
                    <TableCell >Puck ID</TableCell>
                    <TableCell >Firmware Version</TableCell>
                    <TableCell >Landline</TableCell>
                    <TableCell >WiFi Strength</TableCell>
                    <TableCell >Hub Logs</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {row.history && Array.isArray(row.history) && row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Beacon
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Battery Level</TableCell>
                    <TableCell >Solar Level</TableCell>
                    <TableCell >Temprature</TableCell>
                    <TableCell >RSSI</TableCell>
                    <TableCell >Firmware Version</TableCell>
                    <TableCell >Beacon Logs</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {row.history && Array.isArray(row.history) && row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Puck
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Battery Level</TableCell>
                    <TableCell >Accelerometer</TableCell>
                    <TableCell >RSSI</TableCell>
                    <TableCell >Firmware Version</TableCell>
                    <TableCell >Puck Logs</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {row.history && Array.isArray(row.history) && row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>


  );
}

CollapsibleRow.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter((customer) => {
    const searchTerms = Object.values(customer).map(String);
    return searchTerms.some((term) =>
      term.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const selectedSome = (selected.length > 0) && (selected.length < filteredItems.length);
  const selectedAll = (filteredItems.length > 0) && (selected.length === filteredItems.length);

  const [openRows, setOpenRows] = useState({});

  const handleRowToggle = (id) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  };

  const allRowsCollapsed = Object.values(openRows).every((row) => !row);

  return (

    <>

      {/* //Search bar card */}

      <Card sx={{ p: 2 }}>
        <OutlinedInput
          value={searchQuery}
          fullWidth
          placeholder="Search customer"
          onChange={(e) => handleSearch(e.target.value)}
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{ maxWidth: 500 }}
        />
      </Card>

      <Card>

        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>

            <div>

              <IconButton
                variant="outlined"
                onClick={() => {
                  const newOpenRows = {};
                  filteredItems.forEach((customer) => {
                    newOpenRows[customer.id] = allRowsCollapsed;
                  });
                  setOpenRows(newOpenRows);
                }}
              >
                {allRowsCollapsed ? (
                  <Button variant="contained">
                    <ExpandCircleDownIcon style={{ marginRight: '8px' }} />
                    Expand All
                  </Button>
                ) : (
                  <Button variant="contained">
                    <DoDisturbOnIcon style={{ marginRight: '8px' }} />
                    Collapse All
                  </Button>
                )}
              </IconButton>
            </div>
            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
            </Table> */}

            <Table>


              <TableBody>
                {filteredItems.map((customer) => (
                  <React.Fragment key={customer.id}>
                    <TableRow>
                      <CollapsibleRow
                        row={customer}
                        open={openRows[customer.id] || false}
                        onToggle={() => handleRowToggle(customer.id)}
                      />
                      {/* <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address.city}</TableCell>
                      <TableCell>{customer.address.state}</TableCell> */}
                      {/* Additional table cells for other attributes */}
                    </TableRow>


                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};


