import { Box, Container, Grid,Button, Typography, Stack, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ForwardIcon from '@mui/icons-material/Forward';

import React, { useState } from 'react'

function Register() {

    const navigate= useNavigate();
    const [registerObj,setRegisterObj]=useState({
        userName:'',
        email:'',
        password:''
    })


    const userRegister=()=>{
       // sessionStorage.removeItem('users')
        
         console.log(registerObj);
         let userDetails=JSON.parse(sessionStorage.getItem('users'))||[]
         console.log(userDetails);
         
         let userExist =userDetails.find(item=>item.email === registerObj.email)
       
         console.log(userExist);
         
         

        if(registerObj.userName =='' || registerObj.email=='' || registerObj.password==''){

            alert('please fill the forms')
        }
        else{

          if(userExist){
            alert('user already exist')
         }
         else{
          userDetails.push(registerObj)

            sessionStorage.setItem('users',JSON.stringify(userDetails))
            alert('Register successfull')
           navigate('/login')
         }
            
        }

        console.log(registerObj.userName);
        

    }

  return (
    <div>
      <style>
        {`
          .custom-placeholder::placeholder {
            color: gray;
            opacity: 1;
          }
        `}
        </style>
      <Box component='section' sx={{backgroundColor:'black'}}>
        <Container maxWidth='md'>
          
            <Grid container className='min-vh-100'  alignItems={'center'} justifyContent={'center'}>

               
                <Grid size={{sx:6,md:6,sm:6}} className='p-3'> 
                   <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1} sx={{mb:3}}>
                   <LabelImportantIcon    sx={{backgroundColor:'#43b0f1',color:'white'}} className='fs-1 '></LabelImportantIcon>
                   <Typography variant='h4' className='text-white '> Create an account </Typography>
                   <Typography className='fs-6 text-secondary fw-lighter'>Sign up for TaskFlow to manage your tasks</Typography>

                </Stack>
                    <Stack spacing={3} className='shadow-lg p-4 rounded-4 border'  >
                      <Stack>
                        <Typography className='text-start text-white' variant='h6'>Sign Up</Typography>
                        <Typography className='fs-6 text-secondary fw-lighter'>Enter your informations to create an account</Typography>
                      </Stack>
                        <Stack>
                           <label htmlFor="full name" className='text-white mb-1'>Full Name</label>
                    <Stack sx={{position:'relative'}}>
                      {
                        !registerObj.userName &&
                        <PersonIcon  sx={{position:'absolute',top:7,left:7,color:'white'}}></PersonIcon>

                      }
                        
                    <input required  onChange={(e)=>setRegisterObj({...registerObj,userName:e.target.value})} type="text" className='form-control text-white custom-placeholder' style={{backgroundColor:'black'}} placeholder='     Ashik Antony'  />
                    </Stack>

                        </Stack>
                   <Stack>
                    <label htmlFor="email" className='text-white mb-1'>Email</label>
                    <Stack sx={{position:'relative'}}>
                      {
                        !registerObj.email &&
                         <EmailIcon sx={{position:'absolute',top:7,left:7,color:'white'}} ></EmailIcon>

                      }
                    
                     <input required onChange={(e)=>setRegisterObj({...registerObj,email:e.target.value})} type="email" className='form-control text-white custom-placeholder' style={{backgroundColor:'black'}} placeholder='     name@example.com' />

                    </Stack>
                    
                   </Stack>
                    <Stack>
                       <label htmlFor="password" className='text-white mb-1'>Password</label>
                      <Stack sx={{position:'relative'}}>
                        {
                          !registerObj.password &&
                           <LockIcon sx={{position:'absolute',top:7,left:7,color:'white'}}></LockIcon>

                        }
                       
                       <input  required onChange={(e)=>setRegisterObj({...registerObj,password:e.target.value})} type="password" className='form-control text-white custom-placeholder' style={{backgroundColor:'black'}} placeholder='      *********' />
                      </Stack>
                    </Stack>
                    
                     <Stack  alignItems={'center'} justifyContent={'center'}>
                         
                          <Typography className='text-white  fw-light' sx={{fontSize:'.9em'}}>I agree to the <a href="#" className='text-decoration-none'>Terms of Service</a> and <a href="" className='text-decoration-none'>Privacy Policy</a></Typography>
                         <Button onClick={userRegister} className='mt-3' variant='contained' sx={{backgroundColor:'#43b0f1',width:'100%'}}>Create Account</Button>
                       

                       
                       
                     </Stack>
                      <Link className='text-decoration-none text-white' to={'/login'}>
                    <Typography className=''>Already have an account?
                     
                       <span className='mx-2' sx={{color:'#43b0f1'}}>Login</span> </Typography>
                      </Link>
                     
                   
                    </Stack>
                      <Button component={Link} to={'/'} className='text-white mt-3'>
                    
                      Back to TaskFlow   <ForwardIcon className='mx-2'></ForwardIcon> </Button>
                </Grid>
               
            </Grid>

           


        </Container>

      </Box>
    </div>
  )
}

export default Register
