import CloudSyncIcon from '@mui/icons-material/CloudSync';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';
import WorkIcon from '@mui/icons-material/Work';

import {
  AppBar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  {
    label: 'Працівники',
    icon: GroupsIcon,
    url: '/',
  },
  {
    label: 'Магазини',
    icon: StoreIcon,
    url: '/stores',
  },
  {
    label: 'Роботодавці',
    icon: WorkIcon,
    url: '/employers',
  },
  {
    label: 'Синхронізація',
    icon: CloudSyncIcon,
    url: '/update',
  },
];

export const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
            >
              <Diversity3Icon fontSize="large" />
              Staff Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexShrink: 0 }}>
        <Toolbar />
        <List>
          {MENU_ITEMS.map(({ label, icon: Icon, url }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton selected={pathname === url} sx={{ pr: 4 }}>
                <ListItemIcon>
                  <Icon sx={theme => ({ fill: theme.palette.primary.main })} />
                </ListItemIcon>
                <ListItemText>
                  <Link to={url}>{label}</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
