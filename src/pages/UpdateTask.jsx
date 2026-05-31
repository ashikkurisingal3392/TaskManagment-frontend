import { React, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, TextField, Typography, Stack, Button, Container } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import { deleteTaskAPI, showTaskAPI, showUpdateTaskAPI, updateTaskAPI } from '../services/allAPIs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { commonAPI } from '../services/commonAPIs';
import Swal from 'sweetalert2'
import ListTask from '../components/ListTask';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';

function UpdateTask() {

  const param = useParams()
  const { id } = param
  console.log(id);

  const [updateData, setUpdateData] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    deadline: null
  })
  const[listTaskData,setListTaskData]=useState([])
  //for hiding update page condition
  const[isFinished,setIsFinished]=useState(false)

  /// fetch data for task list
   const fetchTaskData = async () => {
     
         try {
     
           const response = await showTaskAPI()
           console.log(response);
           setListTaskData(response.data)
     
     
         }
         catch (err) {
           console.log(err);
     
         }
       }
  

//showing update form
  const displayTask = async () => {

    try {

      const response = await showUpdateTaskAPI(id)
      console.log(response);
      const data = response.data
      //date convert to dayjs for display
      setUpdateData({ ...data, deadline: dayjs(data.deadline) })

    }
    catch (err) {
      console.log(err);

    }
  }

  //Update task

  const onUpdate = async () => {

    try {
      const deadlineDate = updateData?.deadline ? updateData.deadline.format('YYYY/MM/DD') : null
      const newUpdateData = { ...updateData, deadline: deadlineDate }

      const response = await updateTaskAPI(id, newUpdateData)
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        setUpdateData({
          title: '',
          description: '',
          priority: '',
          status: '',
          deadline: null
        })

        setIsFinished(true)
        fetchTaskData()

      }
      else {

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "something went wrong..",
          showConfirmButton: false,
          timer: 1500
        });
      }


    }
    catch (err) {
      console.log(err);

    }

  }

  //delete task in update page

  // const handleDelete = async () => {

  //   try {


  //     Swal.fire({
  //       title: "Do you want to delete ?",
  //       showCancelButton: true,
  //       confirmButtonText: "Delete",
  //       denyButtonText: `Don't save`
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire("Deleted!", "", "success");
  //         const response = deleteTaskAPI(id)
  //         console.log(response);

  //       }
  //     });

  //     setUpdateData({
  //         title: '',
  //         description: '',
  //         priority: '',
  //         status: '',
  //         deadline: null
  //       })

  //   }
  //   catch (err) {
  //     console.log(err);

  //   }


  // }
  useEffect(() => {

    displayTask()
    fetchTaskData()


  }, [id])

  console.log(updateData);
  console.log(listTaskData);


  return (
    <div>
      <Header />
        {/* top head */}
      <Box>
        <Container maxWidth='md'>
          <Grid container>
            <Grid size={{ xs: 12, md: 12 }} className='mb-5 mt-3 ' >
              <Stack direction={'row'} justifyContent={'space-between'} className='p-4 rounded-pill shadow-sm' sx={{ backgroundColor: '#edf2fa' }}>
                <Stack direction={'row'} spacing={1} className='w-100 mx-3'>
                  <TextField label='Search Task' variant='outlined' size='small' fullWidth sx={{ borderRadius: 50 }}></TextField>
                  <Button variant='contained' className='text-white fw-light' sx={{ backgroundColor: 'black' }} size='sm'><SearchIcon></SearchIcon>Search</Button>

                </Stack>
                <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} className='mx-3'>
                  <EmailIcon className='fs-1'></EmailIcon>
                  <img style={{ height: 40, width: 40 }} className='img-fluid ' src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png" alt="" />

                </Stack>


              </Stack>

            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth='md' >
        {
          isFinished ? 
        <div className='mt-4 mb-4'>
           <ListTask listTaskData={listTaskData} displayTask={fetchTaskData}></ListTask>

        </div>
         
          
          :
          <Stack size={{sx:12,md:12}} direction={{xs:'column',md:"row",sm:"column"}} justifyContent={"center"} spacing={5} className=' mt-5 mb-5 p-3'>
              <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 600,
            mt: 3, mb: 2,
          }}
        >

          <Grid container>
            <Grid >

              <Paper elevation={3} sx={{
                backgroundColor: '#edf2fa', width: '100%', maxWidth:650,
                height: 600,
                p: 3
              }} >
                <Stack direction={'row'}>
                  <Typography variant='h5' sx={{ flexGrow: 1, color: '#5e62a9' }} className='mb-3' >Update Task</Typography>
                  {/* <DeleteIcon onClick={handleDelete} sx={{ color: 'red' }}></DeleteIcon> */}
                </Stack>


                <Stack spacing={3}>
                  <TextField label='Task Title' value={updateData?.title} onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })} ></TextField>
                  <TextField
                    id="outlined-multiline-static"
                    label="Task Description"
                    multiline
                    rows={4}
                    value={updateData.description}
                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}


                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Task Priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updateData?.priority}
                      label="Task Priority"
                      onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}



                    >
                      <MenuItem value='High'>High</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>

                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updateData?.status}
                      label="Task Status"
                      onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}


                    >
                      <MenuItem value='To Do'>To Do</MenuItem>
                      <MenuItem value='In Progress'>In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>

                  </FormControl>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Deadline" value={updateData?.deadline} onChange={(e) => setUpdateData({ ...updateData, deadline: e })} />
                    </DemoContainer>
                  </LocalizationProvider>


                  <Button onClick={onUpdate} variant='contained' sx={{ backgroundColor: '#5e62a9' }}>Update</Button>

                </Stack>



              </Paper>

            </Grid>

          </Grid>


        </Box>
        <Stack>
          <ListTask listTaskData={listTaskData} displayTask={fetchTaskData}></ListTask>
        </Stack>
       

          </Stack>
        
        }
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 600,
            mt: 3, mb: 2,
          }}
        >

          <Grid container>
            <Grid >

              <Paper elevation={3} sx={{
                backgroundColor: '#edf2fa', width: { xs: 300, sm: 500, md: 600 },
                height: 600,
                p: 3
              }} >
                <Stack direction={'row'}>
                  <Typography variant='h5' sx={{ flexGrow: 1, color: '#5e62a9' }} className='mb-3' >Update Task</Typography>
                  <DeleteIcon onClick={handleDelete} sx={{ color: 'red' }}></DeleteIcon>
                </Stack>


                <Stack spacing={3}>
                  <TextField label='Task Title' value={updateData?.title} onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })} ></TextField>
                  <TextField
                    id="outlined-multiline-static"
                    label="Task Description"
                    multiline
                    rows={4}
                    value={updateData.description}
                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}


                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Task Priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updateData?.priority}
                      label="Task Priority"
                      onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}



                    >
                      <MenuItem value='High'>High</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>

                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updateData?.status}
                      label="Task Status"
                      onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}


                    >
                      <MenuItem value='To Do'>To Do</MenuItem>
                      <MenuItem value='In Progress'>In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>

                  </FormControl>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Deadline" value={updateData?.deadline} onChange={(e) => setUpdateData({ ...updateData, deadline: e })} />
                    </DemoContainer>
                  </LocalizationProvider>


                  <Button onClick={onUpdate} variant='contained' sx={{ backgroundColor: '#5e62a9' }}>Update</Button>

                </Stack>



              </Paper>

            </Grid>

          </Grid>


        </Box>
        <ListTask listTaskData={listTaskData}></ListTask> */}

      </Container>



      <Footer />
    </div>
  )
}

export default UpdateTask
