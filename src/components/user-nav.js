import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './user-config';
import { UserNavItem } from './user-nav-item';

export const UserNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3,
        backgroundColor: 'white',
        display:'flex',
        borderRightWidth: '0.2px',
        borderRightColor: 'rgba(108, 115, 127, 0.4)',
        borderRightStyle: 'solid',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: 'black' }}>
          <Box
            component={NextLink}
            href="/customers"
            sx={{
              display: 'inline-flex',
              height: 100,
              width: 100
            }}
          >
            {/* <img src={<Logo />} /> */}
            <Image
              src="/logo.png" // Provide the path to your image in the public directory
              alt="Description of the image"
              width={100} // Set the width of the image
              height={100} // Set the height of the image
            />

          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                MyHomeBeacon
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                Dashboard
              </Typography>
            </div>
            {/* <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon> */}
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <UserNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

UserNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
