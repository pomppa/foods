import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  ClickAwayListener,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomThemeContext } from '../themeContext';
import { useContext, useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSession, signOut } from 'next-auth/react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  mobile?: number;
}>(({ theme, open, mobile }) => ({
  flexGrow: 1,
  padding: mobile ? theme.spacing(0) : theme.spacing(1),

  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const { data: session } = useSession();
  const name = session?.user?.name || '';
  const image = session?.user?.image;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const { isDarkTheme, toggleTheme } = useContext(CustomThemeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Icon = (props) => {
    const { icon } = props;
    const TheIcon = icon;
    return <TheIcon {...props} />;
  };

  const menu = [
    { title: 'Plan a meal', icon: KitchenIcon, link: '/plan' },
    {
      title: 'Foods',
      icon: FastfoodIcon,
      link: '/ingredients/fineli',
    },
    ...(session
      ? [
          { title: 'Your foods', icon: KitchenIcon, link: '/ingredients/list' },
          { title: 'Meals', icon: RestaurantMenuIcon, link: '/meals/list' },
        ]
      : []),
    { title: 'About', icon: InfoIcon, link: '/about' },
  ];

  const prefetchLinks = () => {
    menu.forEach((item) => {
      router.prefetch(item.link);
    });
    router.prefetch('/login');
  };

  prefetchLinks();

  const handleLoginLogout = async () => {
    setShowBackdrop(true);

    if (session) {
      await signOut();
    } else {
      router.push('/login');
    }
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const [loading, setLoading] = useState(false);

  const handleClick = (href) => {
    setShowBackdrop(true);
    handleDrawerClose();
    router.push(href);
  };

  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    if (showBackdrop) {
      const timeoutId = setTimeout(() => {
        setLoading(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    }

    setLoading(false);
  }, [showBackdrop]);

  useEffect(() => {
    const handleCompleteAction = () => {
      setShowBackdrop(false);
    };

    router.events.on('routeChangeComplete', handleCompleteAction);

    return () => {
      router.events.off('routeChangeComplete', handleCompleteAction);
    };
  }, [router]);

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Box sx={{ display: 'flex' }}>
        {loading && (
          <Backdrop
            open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/about"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FOODS
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                marginLeft: 'auto',
                color: 'inherit',
              }}
            >
              {session && (
                <IconButton
                  color="inherit"
                  aria-label="profile"
                  onClick={handleProfile}
                >
                  {session.user.image ? (
                    <Avatar
                      src={image}
                      alt={name}
                      sx={{ width: '32px', height: '32px' }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
              )}
              <Button
                sx={{
                  fontSize: '0.75rem',
                  backgroundColor: 'primary',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto',
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                onClick={handleLoginLogout}
              >
                {session ? 'SIGN OUT' : 'SIGN IN'}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader onClick={handleDrawerClose}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((element) => (
              <ListItem key={element.link} disablePadding>
                <ListItemButton onClick={() => handleClick(element.link)}>
                  <ListItemIcon>
                    <Icon
                      icon={element.icon}
                      sx={{
                        color: 'text.primary',
                        fontSize: '1.25rem',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={element.title}
                    primaryTypographyProps={{
                      sx: {
                        textTransform: 'uppercase',
                        letterSpacing: '0.1rem',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ marginTop: 'auto', p: 2 }}>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.1rem',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                  }}
                >
                  Appearance
                </Typography>
              </ListItemText>
              <Switch
                checked={isDarkTheme}
                onChange={handleThemeToggle}
                icon={
                  <LightModeIcon
                    fontSize="small"
                    color="action"
                    style={{
                      verticalAlign: 'middle',
                    }}
                  />
                }
                checkedIcon={
                  <DarkModeIcon
                    fontSize="small"
                    style={{
                      verticalAlign: 'middle',
                    }}
                  />
                }
                color="secondary"
              />
            </ListItem>
          </Box>
        </Drawer>
        <Main open={open} mobile={mobile ? 1 : 0}>
          <DrawerHeader />
        </Main>
      </Box>
    </ClickAwayListener>
  );
}
