import { Alert, Avatar, Container, IconButton,  Snackbar, Typography } from '@mui/material'
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
import AList from '../components/AList';
import Slider from '../components/Slider';
import MoviesCollection from '../components/MoviesCollection';





export default function View({ broadcastsProps,blogsProps,ublogsProps,usersProps }) {
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
	  router.push('/viewer');
    
	  
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
    loading?<Loading type="bubbles" color="yellowgreen"/>: <div>
	  

   <Header/>

    <BContext.Provider value={{showAlert,brod,setBrod}}>
    <Box mt={3}/>
    <main className="relative min-h-screen after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          {/* <Slider /> */}

	  <MoviesCollection
            broadcastsProps={broadcastsProps}
            title="cart"
          />
	   <MoviesCollection
            blogsProps={blogsProps}
            title="favourites"
          />
	   <MoviesCollection
            broadcastsProps={broadcastsProps}
            title="Broadcasts"
          />
	  </main>
    </BContext.Provider>
 
    </div>
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
      const collectionRef3 = collection(db, "users");
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      const q1 = query(collectionRef1,where("code","==","favourite"), orderBy("timestamp", "desc"));
      const q2 = query(collectionRef2,orderBy("timestamp", "desc"));
      const q3 = query(collectionRef3,orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      const querySnapshot2 = await getDocs(q2);
      const querySnapshot3 = await getDocs(q3);
      let broadcasts =[];
      let blogs =[];
      let ublogs =[];
      let users =[];
      querySnapshot.forEach(doc=>{
        broadcasts.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot1.forEach(doc=>{
        blogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot2.forEach(doc=>{
        ublogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot3.forEach(doc=>{
        users.push({...doc.data(),timestamp:doc.data().timestamp.toDate().toString()});
      });
      console.log(users)
      return {
        props:{
	broadcastsProps:JSON.stringify(broadcasts) || [],
	blogsProps:JSON.stringify(blogs) || [],
	ublogsProps:JSON.stringify(ublogs) || [],
  usersProps:JSON.stringify(users) || [],
        }
      };

    }
    return {
      props:{
	broadcastsProps:{},
	blogsProps:{},
	ublogsProps:{},
  usersProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}