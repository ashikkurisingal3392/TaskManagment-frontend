import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box, Button, Grid, Typography, Stack, Container } from '@mui/material'
import { showTaskAPI } from '../services/allAPIs'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {

  const [checked, setChecked] = React.useState([1]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const [search, setSearch] = useState('')
  const [showTask, setShowTAsk] = useState([])

  //display task grid
  const displayTask = async () => {

    try {

      const response = await showTaskAPI()
      console.log(response);
      setShowTAsk(response.data)


    }
    catch (err) {
      console.log(err);

    }
  }
  console.log(showTask);

  const [userLogin, setUserLogin] = useState('')
  const [dateTime, setDateTime] = useState('')
  //to get user login details
  const userLoginDetails = () => {

    const userLogin = JSON.parse(sessionStorage.getItem('currentUser'))
    const date = new Date()
    setDateTime(date.toDateString())
    setUserLogin(userLogin.userName);

  }



  useEffect(() => {

    displayTask()
    userLoginDetails()

  }, [])

  console.log(search);


  return (
    <div>
      <Header></Header>
      {/* heading section */}
      <Box component={'section'}>
        <Container maxWidth='lg'>
          <Grid container >
            <Grid item xs={12}   className='mt-4  w-100 ' sx={{ backgroundColor: '#edf2fa' ,p:{xs:3,md:4},borderRadius: { xs: 8, md: 10 },}} >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, sm: 2, md: 3 }} alignItems={{ xs: "stretch", md: "center" }} justifyContent={'space-between'}>
                <Stack alignItems={{xs:'center',md:"start"}} justifyContent={'start'}  >

                  <Typography variant='h5' className='fw-bold mb-2' sx={{ color: '#5e62a9' }}>Welcome {userLogin.toUpperCase()} !</Typography>
                  <Typography className='fs-6 fw-light'>{dateTime}</Typography>

                </Stack>

                <Stack>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', md: 400 } }}
                  >

                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Task Titles"
                      inputProps={{ 'aria-label': 'Search Task Titles' }}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px', color: "black" }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                    {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}

                  </Paper>

                </Stack>

                <Stack alignItems={{xs:'center',md:"start"}}>
                  <Link to='/mytasks'>
                    <Button variant="contained" size="large" className='rounded-5' sx={{ backgroundColor: 'black', color: 'white' }}><AddIcon></AddIcon> New task</Button>
                  </Link>

                </Stack>

              </Stack>


            </Grid>
          </Grid>

        </Container>

      </Box>
      {/* calender secion */}
      <Box>
        <Container maxWidth='md' sx={{marginTop:20}}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={10} justifyContent={'space-between'} alignItems={'center'} className=' shadow-sm  mb-3 mt-4 w-100'>
             {/* calender */}
                <Stack className='w-100'>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer
                      components={[
                        'StaticDatePicker',
                      ]}

                    >
                      <DemoItem label="">
                        <StaticDatePicker defaultValue={dayjs()} />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>

                </Stack>
              {/* my task list */}
                <Stack className='w-100'>
                  <Typography className='text-center fw-light fs-4 fw-bold '>My Tasks</Typography>
                  <List dense  sx={{ display: 'flex', flexDirection: 'column',gap:3, alignItems: 'start', width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                    {showTask.map((value) => {
                      const labelId = `checkbox-list-secondary-label-${value}`;
                      return (
                       
                             <ListItem
                          key={value.id}
                          secondaryAction={
                            <Checkbox
                              edge="start"
                              onChange={handleToggle(value)}
                              checked={checked.includes(value)}
                              inputProps={{ 'aria-labelledby': labelId }}
                             
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            {/* <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar> */}
                           
                            <ListItemText  id={labelId} primary={value.title} sx={{textAlign:'center'}}/>
                            <ListItemText id={labelId} primary={value.deadline} className='mx-2 '  sx={{ textAlign: "right", minWidth: 100 }} />
                          </ListItemButton>
                        </ListItem>


                      
                      );
                    })}
                  </List>
                  <Stack className='mt-3' direction={'row'} justifyContent={"space-evenly"}>
                     <Button><EditDocumentIcon></EditDocumentIcon></Button>
                      <Button><DeleteIcon></DeleteIcon></Button>
                  </Stack>
                 
                </Stack>

              </Stack>


            </Grid>

          </Grid>
        </Container>
      </Box>

      {/*  task grid section */}
      <Box component={'section'} className='min-vh-100' sx={{marginTop:30}}>

        <Typography variant='h3' className='mb-3 mt-4 text-center fw-bold'>Task Overview</Typography>
        <Grid container spacing={3} className='mt-4 mb-4 p-3'>


          {

            showTask.length > 0 ? showTask.filter(item => {

              return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search.toLowerCase())
            }).map((item, index) => (



              <Grid key={index} size={{ xs: 12, md: 4 }} className='shadow-sm p-4 rounded-4' sx={{ backgroundColor: '#edf2fa' }}>
                <Link to={`/updatetask/${item.id}`} className='text-decoration-none'>

                  <Stack >
                    <Stack direction={'row'} spacing={4} className='mb-3'>
                      <Button variant="outlined" size="small" sx={{
                        borderColor:
                          item.status == 'Completed' ? "green" :
                            item.status == "In Progress" ? "orange" : "blue",
                        color:
                          item.status == 'Completed' ? "green" :
                            item.status == "In Progress" ? "orange" : "blue",

                      }}>
                        {item.status}</Button>
                      <Button variant="outlined" size="small" sx={{
                        borderColor:
                          item.priority == 'High' ? "red" :
                            item.priority == "Medium" ? "orange" : "green",
                        color:
                          item.priority == 'High' ? "red" :
                            item.priority == "Medium" ? "orange" : "green",
                      }}>{item.priority}</Button>
                    </Stack>
                    <Typography variant='h5' className='fw-bold mb-3 text-dark'>{item.title ? item.title : 'Task Title'}</Typography>
                    <Typography variant='p' className='fs-6 fw-light mb-3 text-secondary'>{item.description ? item.description : 'Task Description'}</Typography>
                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                      <Stack>
                        <Typography className='fw-bold text-dark' >Start Date</Typography>
                        <Typography className='fw-light text-secondary'>{item.createdAt}</Typography>
                      </Stack>
                      <Stack>
                        <Typography className='fw-bold text-dark'>Due Date </Typography>
                        <Typography className='fw-light text-secondary'>{item.deadline}</Typography>
                      </Stack>


                    </Stack>


                  </Stack>
                </Link>

              </Grid>

            )) : 'erorr fetching'

          }

        </Grid>

      </Box>


      <Footer></Footer>
    </div>
  )
}

export default Dashboard
