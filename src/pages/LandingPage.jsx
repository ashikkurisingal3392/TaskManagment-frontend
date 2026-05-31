import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Grid, Paper, Stack } from '@mui/material';
import { Link } from "react-router-dom";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';


const pages = ['Home', 'Contact', 'Blog'];
const settings = ['Profile', 'Login', 'Logout'];

function LandingPage() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <div>
         
   {/* header */}
         <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           <LabelImportantIcon    sx={{backgroundColor:'#white',color:'#5e62a9'}} className='fs-1 me-2 '></LabelImportantIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           TASK FLOW
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LabelImportantIcon    sx={{backgroundColor:'#white',color:'#5e62a9',display: { xs: 'flex', md: 'none' }, mr: 1}} className='fs-1 me-2 '></LabelImportantIcon>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TASK FLOW
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/219/219988.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} className='shadow-lg p-4 '   sx={{width:200 ,color:'black',borderColor:'black'}}>
                  <Typography sx={{ textAlign: 'center',width:'100%' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
         </AppBar>

         {/* Main content section */}
       {/* hero section */}
         <Box
        sx={{
          background: "linear-gradient(135deg, #5e62a9, #1f1f1f)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Organize Your Tasks Effortlessly
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
          A simple, powerful task management tool to boost your productivity.
        </Typography>
      
        <Button
        component={Link}
        to={'/register'}
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: "white",
            color: "#5e62a9",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Get Started
        </Button>
      
       
      </Box>

        {/* FEATURES SECTION */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          sx={{ mb: 5 }}
        >
          Why Choose Task Flow?
        </Typography>

        <Grid container spacing={6}>
          {[
            {
              title: "Easy Task Management",
              desc: "Create, edit, delete and organize tasks with ease.",
            },
            {
              title: "Smart Searching",
              desc: "Searching tasks by task title.",
            },
            {
              title: "Secure Login",
              desc: "Your data stays safe with secure authentication.",
            },
            {
              title:"Download Report",
              desc:"Download task details with ease"
            }
          ].map((feature, index) => (
            <Grid item size={{xs:12,md:6}}  key={index}>
              <Paper
                elevation={4}
                sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {feature.title}
                </Typography>
                <Typography sx={{ mt: 1, opacity: 0.8 }}>
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

            {/* CTA SECTION */}
      <Box
        sx={{
          backgroundColor: "#5e62a9",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Ready to Boost Your Productivity?
        </Typography>
        <Typography sx={{ mt: 2, opacity: 0.9 }}>
          Start managing your tasks like a pro.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: "white",
            color: "#5e62a9",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Create Your First Task
        </Button>
      </Box>
       


    {/* Footer */}
    <Box component='section' sx={{backgroundColor:'black'}}>
        <Container maxWidth='md'>
          <Grid container>
            <Grid size={{xs:12,md:12}} >
              <Stack direction={'row'} justifyContent={'space-around'} className='p-4'>
                 <Typography variant="h6"  sx={{ color:'white' }}>@ 2026 TaskFlow. All rights reserved</Typography>
              <Stack direction={'row'} spacing={3}>
               <GitHubIcon sx={{color:'white'}}></GitHubIcon>
               <LinkedInIcon sx={{color:'white'}}></LinkedInIcon>
               <MailIcon sx={{color:'white'}}></MailIcon>
              </Stack>

              </Stack>

             
            </Grid>

          </Grid>

        </Container>
      </Box>
      
    </div>
  )
}

export default LandingPage
