import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {  Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskIcon from '@mui/icons-material/Task';

function Header() {


  // drawer 
     const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //logout
  const navigate =useNavigate()
    const logoutUser =()=>{
  
      sessionStorage.removeItem('currentUser')
      navigate('/login')
    }

   const DrawerList = (
    <Box sx={{ width: 250,backgroundColor:'#f7f9fcff',height:'100%'}} role="presentation" onClick={toggleDrawer(false)}>
        <Stack direction={'column'} alignItems={'center'} spacing={2} className='mt-5'>
          <LabelImportantIcon    sx={{backgroundColor:'#white',color:'#5e62a9'}} className='fs-1 me-2 '></LabelImportantIcon>
         
          <Typography variant="h5"  sx={{ color:'#5e62a9' }}>
            TaskFlow
          </Typography>
        </Stack>
        <Typography className='fs-6 text-center  mt-3' component="div" sx={{ flexGrow: 1,color:'#5e62a9' }}>
            Main Navigation
          </Typography>
      <List sx={{color:'cbc7d8'}}>
        <ListItem>
            <Link to={'/dashboard'} className='text-decoration-none'>
          <ListItemButton>
            <ListItemIcon><HomeIcon sx={{color:'#5e62a9'}}></HomeIcon></ListItemIcon>
            <ListItemText sx={{color:'#a38dedff'}}>Dashboard</ListItemText>
          </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon><GroupIcon sx={{color:'#5e62a9'}}></GroupIcon></ListItemIcon>
            <ListItemText sx={{color:'#a38dedff'}} >Members</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Link to={'/mytasks'} className='text-decoration-none'>
           <ListItemButton>
            <ListItemIcon><AddTaskIcon sx={{color:'#5e62a9'}}></AddTaskIcon></ListItemIcon>
            <ListItemText sx={{color:'#a38dedff'}}>Create Task</ListItemText>
          </ListItemButton>
          </Link>
         
        </ListItem>
        <ListItem>
         <Link to={'/tasks'} className='text-decoration-none'>
        
          <ListItemButton>
            <ListItemIcon><TaskIcon sx={{color:'#5e62a9'}}></TaskIcon></ListItemIcon>
            <ListItemText sx={{color:'#a38dedff'}}>All Tasks</ListItemText>
          </ListItemButton>
           </Link>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon><LogoutIcon sx={{color:'#5e62a9'}}></LogoutIcon></ListItemIcon>
            <ListItemText sx={{color:'#a38dedff'}} onClick={logoutUser}>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

    
      
    </Box>
  );

  //drawer -end


  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

 <Box sx={{ flexGrow: 1 }} >
 
      <AppBar position="static" sx={{backgroundColor:'#5e62a9'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* drawer click */}
            <MenuIcon onClick={toggleDrawer(true)} sx={{color:'#cbc7d8'}} />
          </IconButton>
          {/* drawer */}
          <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
       <LabelImportantIcon    sx={{backgroundColor:'#5e62a9',color:'#43b0f1'}} className='fs-1 me-2 '></LabelImportantIcon>
         
        <Link>
        </Link>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1,color:'#cbc7d8' }}>
            TaskFlow
          </Typography>
      
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
      
    </div>
  )
}

export default Header
