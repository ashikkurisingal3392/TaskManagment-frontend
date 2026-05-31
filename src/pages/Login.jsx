import React, { useState } from 'react'
import { Box, Container, Grid,Button, Typography, Stack, TextField } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Link } from 'react-router-dom'

function Login() {

  const[loginDetails,setLoginDetails]= useState({

    userEmail:'',
    userPassword:''
  })

  const navigation =useNavigate()





  const onLogin =()=>{

    if(loginDetails.userEmail ==='' || loginDetails.userPassword ===''){
      alert('please fill the forms')
    }
    else{

       let existUser=JSON.parse(sessionStorage.getItem("users")) || []
       
       
       let checkUser =existUser.find(item => item.email === loginDetails.userEmail && item.password === loginDetails.userPassword)
      console.log(checkUser);
      console.log(checkUser);

           if(!checkUser){

        alert('user credentials is invalid')

      }
      else{

         
        sessionStorage.setItem('currentUser',JSON.stringify(checkUser) )
          alert('login succesfull')
           
          navigation('/dashboard')
      }


    }



  }



  return (
    <div>
      <Box component='section' sx={{backgroundColor:'black'}}>
        <Container maxWidth='md'>
          
            <Grid container className='min-vh-100'  alignItems={'center'} justifyContent={'center'}>

               
                <Grid size={{sx:6,md:6,sm:6}} className='p-3'> 
                   <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{mb:3}}>
                   <LabelImportantIcon    sx={{backgroundColor:'#43b0f1',color:'white'}} className='fs-1 '></LabelImportantIcon>
                   <Typography variant='h4' className='text-white '> Welcome Back  </Typography>
                   <Typography className='fs-6 text-secondary fw-lighter'>Sign in to your  TaskFlow account</Typography>

                </Stack>
                    <Stack spacing={3} className='shadow-lg p-4 rounded-4 border'  >
                      <Stack>
                        <Typography className='text-start text-white' variant='h6'>Sign In</Typography>
                        <Typography className='fs-6 text-secondary fw-lighter'>Enter your credentials to access your account</Typography>
                      </Stack>
                       
                   <Stack>
                    <label htmlFor="email" className='text-white mb-1'>Email</label>
                    <Stack sx={{position:'relative'}}>
                      {
                        !loginDetails.userEmail &&
                         <EmailIcon sx={{position:'absolute',top:7,left:7,color:'white'}} ></EmailIcon>

                      }
                    
                     <input required onChange={(e)=>setLoginDetails({...loginDetails,userEmail:e.target.value}) } type="email" className='form-control text-white custom-placeholder' style={{backgroundColor:'black'}} placeholder='     name@example.com' />

                    </Stack>
                    
                   </Stack>
                    <Stack>
                      <Stack flexDirection={'row'} justifyContent={'space-between'}>
                         <label htmlFor="password" className='text-white mb-1'>Password</label>
                       <label htmlFor="password" className=' mb-1 text-primary'>forget passowrd?</label>

                      </Stack>
                      
                      <Stack sx={{position:'relative'}}>
                        {
                          !loginDetails.userPassword &&
                           <LockIcon sx={{position:'absolute',top:7,left:7,color:'white'}}></LockIcon>

                        }
                       
                       <input  required onChange={(e)=>setLoginDetails({...loginDetails,userPassword:e.target.value})} type="password" className='form-control text-white custom-placeholder' style={{backgroundColor:'black'}} placeholder='      *********' />
                      </Stack>
                    </Stack>
                    
                     <Stack  alignItems={'center'} justifyContent={'center'}>
                         
                          
                         <Button onClick={onLogin}  className='mb-3' variant='contained' sx={{backgroundColor:'#43b0f1',width:'100%'}}>Sign In</Button>
                        <Link className='text-decoration-none' to={'/register'}>
                        <Typography className='text-white  fw-light' sx={{fontSize:'.9em'}}>Don't have account?<span href="#" className='text-decoration-none mx-2'>Register</span></Typography>

                        </Link>
                       
                       
                     </Stack>
                     

                    </Stack>
                    
                </Grid>
            </Grid>


        </Container>

      </Box>
       
      
    </div>
  )
}

export default Login
