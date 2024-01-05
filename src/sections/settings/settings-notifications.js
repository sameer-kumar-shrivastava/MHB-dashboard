import { useState, useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChromePicker } from 'react-color';

export const SettingsNotifications = () => {
  const [beaconData, setBeaconData] = useState({
    color: { r: 0, g: 0, b: 0, a: 1 },
    onTime: '',
    offTime: '',
    duration: '',
  });

  const [buzzerData, setBuzzerData] = useState({
    onTime: '',
    offTime: '',
    duration: '',
  });

  const [chargeControlData, setChargeControlData] = useState({
    minBatteryPercentage: '',
  });

  const handleColorChange = (color) => {
    setBeaconData((prevData) => ({
      ...prevData,
      color: color.rgb,
    }));
  };

  const handleInputChange = (event, section, field) => {
    const value = event.target.value;
    switch (section) {
      case 'beacon':
        setBeaconData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'buzzer':
        setBuzzerData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'chargeControl':
        setChargeControlData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSave = (section) => {
    // Handle saving data or API calls here based on section
    switch (section) {
      case 'beacon':
        alert('Saving Beacon Data:' + beaconData.color);
        console.log('Saving Beacon Data:', beaconData);
        break;
      case 'buzzer':
        alert('Saving Buzzer Data: ' + "On-Time: " + buzzerData.onTime);
        console.log('Saving Buzzer Data:', buzzerData);
        break;
      case 'chargeControl':
        alert('Saving Charge Control Data: ' + chargeControlData.minBatteryPercentage + "%");
        console.log('Saving Charge Control Data:', chargeControlData.minBatteryPercentage);
        break;
      default:
        break;
    }
  };


  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const renderBeaconSection = () => (
    <Card>
      <CardHeader title="Beacon Color Palette" />
      <Divider />
      <CardContent>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <ChromePicker color={beaconData.color} onChange={handleColorChange} />
          <TextField
            label="On-Time"
            value={beaconData.onTime}
            onChange={(e) => handleInputChange(e, 'beacon', 'onTime')}
          />
          <TextField
            label="Off-Time"
            value={beaconData.offTime}
            onChange={(e) => handleInputChange(e, 'beacon', 'offTime')}
          />
          <TextField
            label="Duration"
            value={beaconData.duration}
            onChange={(e) => handleInputChange(e, 'beacon', 'duration')}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => handleSave('beacon')}>
          Save
        </Button>
      </CardActions>
    </Card>
  );

  const renderBuzzerSection = () => (
    <Card>
      <CardHeader title="Buzzer" />
      <Divider />
      <CardContent>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="On-Time"
            value={buzzerData.onTime}
            onChange={(e) => handleInputChange(e, 'buzzer', 'onTime')}
          />
          <TextField
            label="Off-Time"
            value={buzzerData.offTime}
            onChange={(e) => handleInputChange(e, 'buzzer', 'offTime')}
          />
          <TextField
            label="Duration"
            value={buzzerData.duration}
            onChange={(e) => handleInputChange(e, 'buzzer', 'duration')}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => handleSave('buzzer')}>
          Save
        </Button>
      </CardActions>
    </Card>
  );

  const renderChargeControlSection = () => (
    <Card>
      <CardHeader title="Charge Control" />
      <Divider />
      <CardContent>
        <Stack
          spacing={2}
          sx={{ maxWidth: 400 }}>
          <TextField
            label="Minimum battery percentage to start charge"
            value={chargeControlData.minBatteryPercentage}
            onChange={(e) =>
              handleInputChange(e, 'chargeControl', 'minBatteryPercentage')
            }
          />

        </Stack>
      </CardContent>
      <Divider />
      <CardActions
        sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={() => handleSave('chargeControl')}>
          Save
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container
        spacing={3}
        direction="column"
        alignItems="stretch">
        <Grid item
          xs={12}
          md={4}>
          {renderBeaconSection()}
        </Grid>
        <Grid item
          xs={12}
          md={4}>
          {renderBuzzerSection()}
        </Grid>
        <Grid item
          xs={12}
          md={4}>
          {renderChargeControlSection()}
        </Grid>
      </Grid>
    </form>
  );


};
