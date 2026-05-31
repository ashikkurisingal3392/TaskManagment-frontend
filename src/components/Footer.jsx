import { Container,Box, Typography,Grid,Stack} from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

function Footer() {
  return (
    <div>

      <Box component='section' sx={{backgroundColor:'#5e62a9'}}>
        <Container maxWidth='md'>
          <Grid container>
            <Grid size={{xs:12,md:12}} >
              <Stack direction={'row'} justifyContent={'space-around'} className='p-4'>
                 <Typography variant="h6"  sx={{ color:'#cbc7d8' }}>@ 2026 TaskFlow. All rights reserved</Typography>
              <Stack direction={'row'} spacing={3}>
               <GitHubIcon sx={{color:'#cbc7d8'}}></GitHubIcon>
               <LinkedInIcon sx={{color:'#cbc7d8'}}></LinkedInIcon>
               <MailIcon sx={{color:'#cbc7d8'}}></MailIcon>
              </Stack>

              </Stack>

             
            </Grid>

          </Grid>

        </Container>
      </Box>
      
    </div>
  )
}

export default Footer
