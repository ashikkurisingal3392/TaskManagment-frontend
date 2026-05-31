import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, TextField, Typography, Stack, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import { addTaskAPI } from '../services/allAPIs';
import dayjs from "dayjs";
import { DateField } from '@mui/x-date-pickers/DateField';
import Swal from 'sweetalert2'

function MyTask({ taskData, setTaskData, displayTask,setIsFinished }) {
  console.log(taskData);

  const [todayDate, setTodayDate] = useState(null)
  const HandleaddTask = async () => {
    try {

      // need to do input validation ???
      //task-start-date adding
      const convertToday = todayDate.format('YYYY/MM/DD')
      const convertDeadline = taskData?.deadline ? taskData.deadline.format('YYYY/MM/DD') : null

      const newTaskData = { ...taskData, createdAt: convertToday, deadline: convertDeadline }
      //setTaskData({...taskData,createdAt:todayDate})

      const response = await addTaskAPI(newTaskData)
      console.log(response);

      if (response.status == 201) {
       
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Task Created successfully"
        });
        displayTask()// state lifting for data refresh,  
        setTaskData({
          title: '',
          description: '',
          priority: '',
          status: '',
          deadline: null
        })

        setIsFinished(true) //true to hide create task  

      }
      else {
         const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "error!"
        });


         
      }

    }
     catch (err) {
      console.log(err);

    }

  }

  //todays date 
  const getTodayDate = () => {
    //  const todayDate =new Date().toISOString().split('T')[0];
    const todayDate = dayjs()
    setTodayDate(todayDate)
    console.log(todayDate);
  }

  useEffect(() => {
    getTodayDate()


  }, [])
  return (
    <div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
          mt: 3, mb: 5,
         
          background: "linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)"
        }}
      >

        <Grid container>
          <Grid item>

            <Paper elevation={3} sx={{
              backgroundColor: '#edf2fa', width: '100%',maxWidth:400,
              minHeight: 600,
              p: 3
            }} >
              <Typography variant='h5' sx={{ flexGrow: 1, color: '#5e62a9' }} className='mb-3'>Create Task</Typography>
              <Stack spacing={3}>
                <TextField label='Task Title' error={!taskData.title} helperText='Enter Task Title' onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} value={taskData.title || ''}></TextField>
                <TextField
                  id="outlined-multiline-static"
                  label="Task Description"

                  multiline
                  rows={4}
                  value={taskData.description || ''}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Task Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={taskData.priority || ''}
                    label="Task Priority"
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}


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
                    value={taskData.status || ''}
                    label="Task Status"
                    onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}


                  >
                    <MenuItem value='To Do'>To Do</MenuItem>
                    {/* <MenuItem value='In Progress'>In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem> */}
                  </Select>

                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Stack direction={'row'} spacing={3} justifyContent={'space-between'} className='w-100' >
                      <DateField label='Created At' value={todayDate} />
                      <DatePicker label="Deadline" value={taskData.deadline || null} onChange={(e) => setTaskData({ ...taskData, deadline: e })} />

                    </Stack>

                  </DemoContainer>
                </LocalizationProvider>

                <Button variant='contained' onClick={HandleaddTask} sx={{ backgroundColor: '#5e62a9' }}>Add Task</Button>

              </Stack>



            </Paper>

          </Grid>

        </Grid>


      </Box>




    </div>
  )
}

export default MyTask
