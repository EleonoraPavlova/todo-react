import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Login = () => {
  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <FormControl>
        <FormLabel sx={{ textAlign: "center" }}>
          <h4>To log in get registered</h4>
        </FormLabel>
        <FormGroup>
          <TextField label="Email" margin="normal" value={"free@samuraijs.com"} />
          <TextField type="password" label="Password"
            margin="normal" value={"free"}
          />
          <FormControlLabel label={'Remember me'} control={<Checkbox />} sx={{ marginBottom: "15px" }} />
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </Grid>
  </Grid>
}