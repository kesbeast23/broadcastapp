import { Button, Grid,TextField,InputAdornment, IconButton , Alert, Typography, Avatar, Link, Snackbar }  from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { LockOutlined,Visibility,VisibilityOff } from '@mui/icons-material';
import Head from "next/head";
import Image from "next/image";
import Header from '../components/Header2';
import Header2 from '../components/Header2';




export default function Login({ todosProps }) {
	const [email, setEmail] = useState("");
	const [passwordOne, setPasswordOne] = useState("");
	const [open,setOpen]=useState(false);
	const [alertType,setAlertType]=useState("success");
	const [alertMessage,setAlertMessage]=useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const [error, setError] = useState(null);
	
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const showAlert=(type,message)=>{
		setAlertType(type);
		setAlertMessage(message);
		setOpen(true);
	      }  
	const handleClose=(event,reason)=>{
		if (reason === 'clickaway') {
		  return;
		}
		setOpen(false);
	      };
	 
	      
	const onSubmit = e => {
		e.stopPropagation();
		setError(null)
		signInWithEmailAndPassword(auth,email, passwordOne)
		.then(authUser => {
		console.log(authUser);
		  console.log("Success. The user is created in firebase")
		router.push("/");
            showAlert("success","Successfully logged in");
		})
		.catch(error => {
		  setError(error.message)
		  console.log(error.message)
		  showAlert("error",error.message);
		});
		event.preventDefault();
	
	
	}
	     

  return (

	<section className="relative">
	<Head>
	  <title>Log in | FunOlympics</title>
	  <link rel="icon" href="/favicon.ico" />
	</Head>
	    <Header2/>
	<div className="relative min-h-[calc(100vh-72px)]">
	  <Image
	    src="/images/hero-background.jpg"
	    layout="fill"
	    objectFit="cover"
	  />
	</div>
	<div className="flex justify-center items-center">
	  <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
	  <form  onSubmit={onSubmit}>
	<Grid 
	container
	spacing={0}
	direction="column"
	alignItems="center"
	justifyContent="center"
	style={{minHeight:'100vh'}}>
		  <Avatar >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
		  <div >
		
	    <TextField    variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus 
	    value={email} onChange={e=> setEmail(e.target.value)}/>
	    <TextField variant="outlined" margin="normal"  required name="password" type={showPassword ? "text" : "password"}  id="password" autoComplete="current-password" fullWidth label="password"  value={passwordOne} onChange={e=> setPasswordOne(e.target.value)} InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}/>
	    <Button type="submit" variant="contained" sx={{mt:3}}>Login</Button>
	  <div>
	    <Grid item xs>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
	    </div>
    </div>
   
	</Grid>
	<Snackbar 
      anchorOrigin={{vertical:'bottom',horizontal:'center'}}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{width:'100%'}}>
          {alertMessage}
        </Alert>
      </Snackbar>
	</form>
	  </div>
	</div>
      </section>

    );
	
}

