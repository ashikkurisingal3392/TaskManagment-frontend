import React, { useEffect, useEffectEvent, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteTaskAPI, showTaskAPI } from '../services/allAPIs';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'



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




function ListTask({ listTaskData,displayTask, id }) {

  //delete task in List page

const handleDelete = async (id) => {

  try {


    Swal.fire({
      title: "Do you want to delete ?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`
    }).then(async(result) => {
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

  console.log(listTaskData);

  return (
    <div>


      <TableContainer id={id} component={Paper} className='shadow-lg rounded-1'>
        <Table sx={{ width:{xs:"100%",md:'100%'} }} aria-label="customized table">
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
            )) : 'error'}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default ListTask
