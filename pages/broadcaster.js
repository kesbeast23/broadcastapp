import { Alert, Avatar, Container, IconButton, Snackbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth';
import Loading from '../components/Loading';
import { db,auth } from '../firebase';
import { verifyIdToken } from '../firebaseAdmin';
import { BContext } from './BContext';
import BForm from './BForm';
import nookies from 'nookies';
import { LockOutlined,Visibility,VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import BList from '../components/BList';




export default function Broadcaster({ broadcastsProps }) {
  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");
  const [brod, setBrod] = useState({title:'',overview:'',img:'',video:'',code:'',brodcaster:''});
  const [showPassword, setShowPassword] = useState(false); 

  
  const {currentUser,loading} = useAuth();

  const router = useRouter();


  useEffect(() => {
    if (!loading && !currentUser)
      router.push('/')
  }, [currentUser, loading])


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
  
  return (
    loading?<Loading type="bubbles" color="yellowgreen"/>: <Container>
   
    <BContext.Provider value={{showAlert,brod,setBrod}}>
    <Container maxWidth="sm">
      <Box sx={{display:'flex',justifyContent:'space-between'}} mt={3}>
        <IconButton onClick={()=>auth.signOut()}>
        <Avatar src={currentUser && currentUser.photoURL}/>
        </IconButton>
        <Typography variant="h5">{currentUser && currentUser.email}</Typography>
      </Box>
      <BForm/>

      <Snackbar 
      anchorOrigin={{vertical:'bottom',horizontal:'center'}}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{width:'100%'}}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
    <Box mt={3}/>
          <BList  broadcastsProps={broadcastsProps}/>
	  
    </BContext.Provider>
    </Container>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    
    const token = await verifyIdToken(cookies.token);
    const {email} = token;
    if (email !== undefined) {
      const collectionRef = collection(db, "broadcasts");
      const q = query(collectionRef,where("email","==",email), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let broadcasts =[];
      querySnapshot.forEach(doc=>{
        broadcasts.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      }); 
      console.log(broadcasts)
      return {
        props:{
	broadcastsProps:JSON.stringify(broadcasts) || [],
        }
      };

    }
    return {
      props:{
	broadcastsProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}