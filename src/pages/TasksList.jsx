import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { deleteTaskAPI, historyTaskAPI, showTaskAPI } from '../services/allAPIs'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function TasksList() {

    const [listTaskData, setListTaskData] = useState([])


    //displaytask
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

    const handleDelete = async (id) => {

        try {


            Swal.fire({
                title: "Do you want to delete ?",
                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't save`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire("Deleted!", "", "success");
                    const response = await deleteTaskAPI(id)
                    console.log(response);
                    displayTask();

                }
            });

            // setUpdateData({
            //   title: '',
            //   description: '',
            //   priority: '',
            //   status: '',
            //   deadline: null
            // })

        }
        catch (err) {
            console.log(err);

        }


    }

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
                const formatedDate = `${timezone.toLocaleDateString()} ,  ${timezone.toLocaleTimeString()}`
                console.log(formatedDate);


            }


        } catch (err) {
            console.log(err);

        }

    }

    useEffect(() => {

        displayTask();
    }, [])

    return (
        <div>


            <Header></Header>

            <Box component={'section'}>
                <Container maxWidth='lg'>
                    <Grid container>
                        <Grid item xs={12} className='w-100 mt-5'>

                            <Typography className='fs-1 text-center shadow-lg rounded-3 p-3'> ALL TASKS</Typography>


                        </Grid>


                        <Stack direction={'row'} justifyContent={'center'} className='w-100 mt-4' >
                            <Button onClick={handleDownloadTask} variant='containe' size='xs' className='fs-6 bg-black text-white' >Download</Button>
                        </Stack>




                        <Grid item className="w-100 min-vh-100 my-5">
                            <TableContainer className='shadow-lg rounded-1' id="result">
                                <Table sx={{ width: { xs: "100%", md: '100%' } }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Task Name</StyledTableCell>
                                            <StyledTableCell align="left">Stage</StyledTableCell>
                                            <StyledTableCell align="left">Priority</StyledTableCell>
                                            <StyledTableCell align="left">Duedate</StyledTableCell>
                                            <StyledTableCell align="left">Created Date</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listTaskData.length > 0 ? listTaskData.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.title}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.status}</StyledTableCell>
                                                <StyledTableCell align="left">{row.priority}</StyledTableCell>
                                                <StyledTableCell align="left">{row.deadline}</StyledTableCell>
                                                <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
                                                <StyledTableCell align="center"> <DeleteIcon onClick={() => handleDelete(row.id)} sx={{
                                                    color: 'black',
                                                    cursor: 'pointer',
                                                    '&:hover': { color: 'red' }
                                                }}></DeleteIcon></StyledTableCell>
                                            </StyledTableRow>
                                        )) :

                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No tasks found
                                                </TableCell>
                                            </TableRow>


                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>






                    </Grid>

                </Container>
            </Box>




            <Footer></Footer>

        </div>
    )
}

export default TasksList
