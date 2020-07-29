import React ,{ useState,useEffect,useRef,useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from "history";
import axios from 'axios';

const history = createBrowserHistory({ forceRefresh: true });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function timeoutData(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}


   
export default function SignIn() {
  const classes = useStyles();
  const[username,setUserName]= useState('');
  const[password,setPassword]=useState('');

const[isSending,setIsSending] = useState(false);
const isMounted =useRef(true);

useEffect(() =>{
  return () =>{
    isMounted.current = false
  }
},[])




const sendRequest = useCallback(async (username,password) => {
 
  if(username == "admin" && password=="admin"){

    let url = "http://localhost:8013/api1/get_admin?username=admin&password=admin"

    if(isSending) return;
      setIsSending(true);

    let res = await fetch(
     url,
      { method: 'get'});


      if(res.status == 200){
        history.push({
          pathname: '/admin'
        })
        if(res.status == 404){
          window.alert("User not found.Please register first.")
          history.push("/");
        }

        if(isMounted.current)
        setIsSending(false);
}
  }
  

  else{
//if(isSending) return;
  setIsSending(true);
  //let res = await fetch("http://localhost:8013/login1/?username="+username+"&password="+password,{ method: 'post',  credentials: 'same-origin',});
 let url = "http://localhost:8013/login1/"

  axios({
    method: "POST",
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
    url: url,
  }).then((res) => {
    if(res.status == 200){
      history.push({
        pathname: '/profile',
        search: username,
        state: { username: username }
      })
    }
    if(res.status == 201){
      history.push({
        pathname: '/admin',
        state: { username: username }
      })
    }
    if(res.status == 404){
      window.alert("User not found.Please register first.")
      history.push("/");
    }
    if(isMounted.current)
    setIsSending(false);
  }
  
  );
};


  // }
  })


  
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <h1>PRVYCARD</h1>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={(e)=>setUserName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="user name"
            autoComplete="username"
            autoFocus
          />
          <TextField
          onChange={(e)=>setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSending} 
            onClick={()=>{
              sendRequest(username,password)}
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={()=>history.push("/")}variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}