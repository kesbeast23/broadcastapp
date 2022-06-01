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
import LList from '../components/LList';




export default function Broadcaster({ broadcastsProps,blogsProps }) {
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
	  <Box mt={3}/>
	  <LList blogsProps={blogsProps}/>
	  
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
      const collectionRef1 = collection(db, "blog");
      const q = query(collectionRef,where("email","==",email), orderBy("timestamp", "desc"));
      const q1 = query(collectionRef1, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      let broadcasts =[];
      let blogs =[];
      querySnapshot.forEach(doc=>{
        broadcasts.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot1.forEach(doc=>{
        blogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });  
      console.log(blogs)
      return {
        props:{
	broadcastsProps:JSON.stringify(broadcasts) || [],
	blogsProps:JSON.stringify(blogs) || [],
        }
      };

    }
    return {
      props:{
	broadcastsProps:{},
	blogsProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}