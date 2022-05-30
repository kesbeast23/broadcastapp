import { Button, Grid,TextField,InputAdornment, IconButton ,Alert, Typography, Avatar, Link, Snackbar }  from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { LockOutlined,Visibility,VisibilityOff } from '@mui/icons-material';
import PasswordStrengthBar from 'react-password-strength-bar';
import ReCAPTCHA from 'react-google-recaptcha'

const SITE_KEY="6LcRIu4fAAAAAOP3LNy-S5QpnaA9scxTAaraJLIa";



const Register = ({type,color}) => {
	const [email, setEmail] = useState("");
	const [passwordOne, setPasswordOne] = useState("");
	const [passwordTwo, setPasswordTwo] = useState("");
  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(false);

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

  const onChange=async(value)=> {
    console.log('Captcha value:', value);
    if (value != null) {
      setCaptcha(true);
    }else{
      setCaptcha(false);
    }
      
  }
  
	const onSubmit = e => {
		e.stopPropagation();
    setError(null)
    let capsCount, smallCount, numberCount, symbolCount,whitespaceCount;
    const passwordLength= passwordOne.length;
    if(passwordOne === passwordTwo){
      
      if (passwordOne.length < 6) {
        setError("Password must be minimum 6 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");
        showAlert("error","Password must be minimum 6 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");

      }
      else {
        capsCount = (passwordOne.match(/[A-Z]/g) || []).length
        smallCount = (passwordOne.match(/[a-z]/g) || []).length
        numberCount = (passwordOne.match(/[0-9]/g) || []).length
        symbolCount = (passwordOne.match(/\W/g) || []).length
        whitespaceCount = (passwordOne.match(/^$|\s+/g) || []).length

      let strongRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
      let goodRegExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
        const goodPassword= goodRegExp.test(passwordOne);
        const strongPassword= strongRegExp.test(passwordOne);

        console.log(whitespaceCount)
        if(whitespaceCount>0){
          setError("Must not contain whitespaces");
          showAlert("error","Must not contain whitespaces");
 
        }else if (capsCount < 1) {
          setError("Must contain one UPPERCASE letter");
          showAlert("error","Must contain one UPPERCASE letter");
     
        }
        else if (smallCount < 1) {
          setError("Must contain one lowercase letter");
          showAlert("error","Must contain one lowercase letter");

        }
        else if (numberCount < 1) {
          setError("Must contain one number");
          showAlert("error","Must contain one number"); 
        }
        else if (symbolCount < 1) {
          setError("Must contain one special character: @$! % * ? &");
          showAlert("error","Must contain one special character: @$! % * ? &"); 
       
        }else{
        // to check strong Password
        if(strongPassword){
          if (captcha) {
            createUserWithEmailAndPassword(auth,email, passwordOne)
            .then(authUser => {
              console.log("Success. The user is created in firebase")
              router.push("/loggedin");
              showAlert("success","Successfully registered.Strong Password used!");
            })
            .catch(error => {
              setError(error.message)
              showAlert("error",error.message);
            });
            
          } else {
            setError("select captcha")
            showAlert("error","Select Captcha");
          }
        
        }else if(goodPassword){

          //good passworld
          if (captcha) {
            createUserWithEmailAndPassword(auth,email, passwordOne)
            .then(authUser => {
              console.log("Success. The user is created in firebase")
              router.push("/loggedin");
              showAlert("success","Successfully registered.Good Password used!");
            })
            .catch(error => {
              setError(error.message)
              showAlert("error",error.message);
            });
            
          } else {
            setError("select captcha")
            showAlert("error","Select Captcha");
          } 
        }else{
          //weak password
          setError("Password is Weak");
          showAlert("error","Password is Weak.Please use a stronger password!");  
        }
        
        
        }
      
    
      }
    }
     
   else {
      setError("Passwords do not match")
      showAlert("error","Passwords do not match");
    }
    event.preventDefault();
  
 }
	    

  return (
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
          Register
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
      <TextField variant="outlined" margin="normal"  required name="passwordTwo" type={showPassword ? "text" : "password"}  id="passwordTwo" autoComplete="current-password" fullWidth label="passwordTwo"  value={passwordTwo} onChange={e=> setPasswordTwo(e.target.value)} InputProps={{
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
      <PasswordStrengthBar minLength={6} password={passwordOne} />

       <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={onChange}
      />
    
	    <Button type="submit" variant="contained" sx={{mt:3}}>Register</Button>
	  <div>
  
    

    <Grid 	spacing={2}  paddingTop={2} item xs>
              <Link href="/" variant="body2">
                {"Already have an account? Login"}
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
  )
}

export default Register