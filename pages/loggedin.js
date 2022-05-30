import { Alert, Avatar, Container, IconButton, Snackbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth';
import Loading from '../components/Loading';
import Login from '../components/Login';
import { db,auth } from '../firebase';
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import { LockOutlined,Visibility,VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';



export default function Loggedin({ todosProps }) {
  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");
  const [todo, setTodo] = useState({title:'',detail:''});
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
   
    <TodoContext.Provider value={{showAlert,todo,setTodo}}>
    <Container maxWidth="sm">
      <Box sx={{display:'flex',justifyContent:'space-between'}} mt={3}>
        <IconButton onClick={()=>auth.signOut()}>
        <Avatar src={currentUser && currentUser.photoURL}/>
        </IconButton>
        <Typography variant="h5">{currentUser && currentUser.email}</Typography>
      </Box>
      <TodoForm/>
      <Snackbar 
      anchorOrigin={{vertical:'bottom',horizontal:'center'}}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{width:'100%'}}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <TodoList todosProps={todosProps}/>
    </Container>
    </TodoContext.Provider>
    </Container>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    
    const token = await verifyIdToken(cookies.token);
    const {email} = token;
    if (email !== undefined) {
      const collectionRef = collection(db, "todos");
      const q = query(collectionRef,where("email","==",email), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      let todos =[];
      querySnapshot.forEach(doc=>{
        todos.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().getTime()});
      }); 
      return {
        props:{
        todosProps:JSON.stringify(todos) || [],
        }
      };

    }
    return {
      props:{
      todosProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}