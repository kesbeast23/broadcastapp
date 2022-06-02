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
import Header from '../components/Header';
import UList from '../components/UList';




export default function Admin({ broadcastsProps,blogsProps,ublogsProps }) {
  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");
  const [brod, setBrod] = useState({title:'',overview:'',img:'',video:'',code:'',brodcaster:''});
  const [showPassword, setShowPassword] = useState(false); 

  
  const {currentUser,loading} = useAuth();

  const router = useRouter();

  useEffect(() => {
	if (currentUser && currentUser?.usertype =='admin')
	  router.push('/admin');
    
    
	if (currentUser && currentUser?.usertype =='broadcaster')
	  router.push('/broadcaster');
    
	if (currentUser && currentUser?.usertype =='viewer')
	  router.push('/loggedin');
    
	  
	if (!loading && !currentUser && !currentUser?.usertype)
	  router.push('/');
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
   <Header/>
    <BContext.Provider value={{showAlert,brod,setBrod}}>

    	 <UList ublogsProps={ublogsProps}/>
	     <Box mt={3}/>
          <BList  broadcastsProps={broadcastsProps}/>

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
    console.log("email:"+email);
    if (email !== undefined) {
      const collectionRef = collection(db, "broadcasts");
      const collectionRef1 = collection(db, "blog");
      const collectionRef2 = collection(db, "ulog");
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      const q1 = query(collectionRef1, orderBy("timestamp", "desc"));
      const q2 = query(collectionRef2,orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
      let broadcasts =[];
      let blogs =[];
      let ublogs =[];
      querySnapshot.forEach(doc=>{
        broadcasts.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot1.forEach(doc=>{
        blogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot2.forEach(doc=>{
        ublogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      console.log(blogs)
      return {
        props:{
	broadcastsProps:JSON.stringify(broadcasts) || [],
	blogsProps:JSON.stringify(blogs) || [],
	ublogsProps:JSON.stringify(ublogs) || [],
        }
      };

    }
    return {
      props:{
	broadcastsProps:{},
	blogsProps:{},
	ublogsProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}