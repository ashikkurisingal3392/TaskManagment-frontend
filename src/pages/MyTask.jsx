import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CreateTask from '../components/CreateTask'
import ListTask from '../components/ListTask'
import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import { historyTaskAPI, showTaskAPI } from '../services/allAPIs'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'




function MyTask() {

  const [isFinished, setIsFinished] = React.useState(false)
  const [listTaskData, setListTaskData] = useState([])
  const [taskData, setTaskData] = useState({

    title: '',
    description: '',
    priority: '',
    status: '',
    deadline: null,
    createdAt: ''
  })

  const displayTask = async () => {

    try {

      const response = await showTaskAPI()
      console.log(response);
      setListTaskData(response.data)


    }
    catch (err) {
      console.log(err);

    }
  }

  //Download task

  const handleDownloadTask = async () => {

    try {
      console.log(listTaskData);
      
      const response = await historyTaskAPI(listTaskData.flat())
      console.log(response);
      if (response.status === 201) {
        //pdf download

        //to get the div content as pdf
        console.log(document.getElementById("result"));
        //to create canvas from the div
        //html2canvas library to take  a "screenshot" of a specific HTML element and convert it into a canvas element.
        const canvas = await html2canvas(document.getElementById("result"), { scale: 3 })
        console.log(canvas);//it returns promise
        //convert canvas to image using toDataURL
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData);
        //PDF generation using jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        //define width and height
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        //add image to pdf
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        //save the pdf
        pdf.save('TaskData.pdf')
        //get current date and time
        const timezone = new Date()
        console.log(timezone);
        //formated date and time
        const formatedDate = `⁠ ${timezone.toLocaleDateString()} ,  ${timezone.toLocaleTimeString()} ⁠`
        console.log(formatedDate);


      }


    } catch (err) {
      console.log(err);

    }

  }

  useEffect(() => {

    displayTask()


  }, [])

  console.log(listTaskData);
  console.log(isFinished);


  return (
    <div>

      <Header></Header>
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
      {/* childrens */}
      {
        isFinished ? <Box>
          <Grid container>
            <Grid size={{xs:12,md:12}}>
               <Stack className='p-3 mb-3' direction={'column'} alignItems={"center"} spacing={5}>
            {/* <CreateTask taskData={taskData} setTaskData={setTaskData} displayTask={displayTask} setIsFinished={setIsFinished}></CreateTask> */}
            <Stack direction={'row'} justifyContent={'center'} >
              <Button onClick={handleDownloadTask} variant='containe' size='xs' className='fs-6 bg-black text-white' >Download</Button>
            </Stack>

            <ListTask listTaskData={listTaskData} id='result' displayTask={displayTask}></ListTask>
            {/* state lifting when  true */}

          </Stack>

            </Grid>
          </Grid>
         

        </Box>

          :
          <Box>
            <Container maxWidth='md'>
              <Grid container>
            <Grid item xs={12} md={12}  className="mt-5">
              <Stack className='p-3   mt-5'direction={{xs:"column",md:'row'}} justifyContent={{xs:"center",md:'center'}} alignItems={{xs:"center",md:'start'}} spacing={6}>
              <CreateTask taskData={taskData} setTaskData={setTaskData} displayTask={displayTask} setIsFinished={setIsFinished}></CreateTask>
              <ListTask listTaskData={listTaskData} displayTask={displayTask} ></ListTask>
              {/* state lifting when  true */}

            </Stack>
            </Grid>
           

          </Grid>

            </Container>
          
           

          </Box>
      }



      <Footer></Footer>

    </div>
  )
}

export default MyTask
