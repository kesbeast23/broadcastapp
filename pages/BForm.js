import { async } from "@firebase/util";
import { Button, TextField ,Box} from "@mui/material";
import { addDoc, collection, serverTimestamp,updateDoc,doc} from "firebase/firestore";
import { useState,useContext, useRef, useEffect } from 'react'
import { useAuth } from "../Auth";
import { db,storage } from "../firebase";
import { BContext } from "./BContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const BForm = () => {
	const inputAreaRef=useRef();

	const {showAlert,brod,setBrod } = useContext(BContext);
	const {currentUser} = useAuth();
	const [imgUrl, setImgUrl] = useState(null);
	const [vdUrl, setVUrl] = useState(null);
	const [progresspercent, setProgresspercent] = useState(0);
	const [vprogresspercent, setVProgresspercent] = useState(0);
      
	

	const handleFileUpload = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		if (!file) return;
		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
	    
		uploadTask.on("state_changed",
		  (snapshot) => {
		    const progress =
		      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		    setProgresspercent(progress);
		  },
		  (error) => {
		    alert(error);
		  },
		  () => {
		    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		      setImgUrl(downloadURL)
		      setBrod({...brod,img:downloadURL})
		      console.log(downloadURL)
		      console.log(progresspercent)
		    });
		  }
		);
	      }
	      const handleFileUploadV = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		if (!file) return;
		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
	    
		uploadTask.on("state_changed",
		  (snapshot) => {
		    const progress =
		      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		    setVProgresspercent(progress);
		  },
		  (error) => {
		    alert(error);
		  },
		  () => {
		    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
			setVUrl(downloadURL)
			setBrod({...brod,video:downloadURL})
		      console.log(downloadURL)
		      console.log(vprogresspercent)
		    });
		  }
		);
	      }
	    

	const onSubmit= async()=>{
		if (brod?.hasOwnProperty('timestamp')) {
			const docRef=  doc(db,"broadcasts",brod.id);
			const todoUpdated={...brod,timestamp:serverTimestamp()};
			await updateDoc(docRef,todoUpdated);
			setBrod({title: '',overview:'',code:'',brodcaster:'',img:'',video:''})
			setImgUrl(null)
			setVUrl(null)
			setProgresspercent(0)
			setVProgresspercent(0)
			showAlert('info',`Broadcast with id ${brod.id} is updated successfully`)
			window.location.reload();
			
		}else{
			const collectionRef=collection(db,"broadcasts")
			const docRef= await addDoc(collectionRef,{...brod,email:currentUser.email,timestamp:serverTimestamp() })
			showAlert('success',`Broadcast with id ${docRef.id} is added successfully`)
			setBrod({title: '',overview:'',code:'',brodcaster:'',img:'',video:''})
			setImgUrl(null)
			setVUrl(null)
			setProgresspercent(0)
			setVProgresspercent(0)
			window.location.reload();
			
		}
	}

	useEffect(()=>{
		const checkIfClickedOtside=e=>{
			if (!inputAreaRef.current.contains(e.target)) {
				console.log('Outside input area');
				setBrod({title: '',overview:'',code:'',broadcaster:'',img:'',video:''}); 
			} else {
				console.log('Inside input area');
			}
		}
		document.addEventListener('mousedown',checkIfClickedOtside);
		return ()=>{
			document.removeEventListener('mousedown',checkIfClickedOtside);
		} 
	},[])
  return (
    <div ref={inputAreaRef}>
	    <TextField fullWidth label="title" margin ="normal"
	    value={brod.title} onChange={e=>setBrod({...brod,title:e.target.value})}/>
	    <TextField fullWidth label="overview" multiline maxRows={4}
	    value={brod.overview} onChange={e=>setBrod({...brod,overview:e.target.value})}/>
	      <TextField fullWidth label="Sporting Code" margin ="normal"
	    value={brod.code} onChange={e=>setBrod({...brod,code:e.target.value})}/>
	      <TextField fullWidth label="Broadcaster" margin ="normal"
	    value={brod.brodcaster} onChange={e=>setBrod({...brod,brodcaster:e.target.value})}/>
	     <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem",mt:3 }}
      >
       {progresspercent==100?"Uploaded":"Upload Image"}
        <input type="file"  hidden onChange={handleFileUpload} />
      </Button>
      <Button 
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem",mt:3 }}
      >
        {progresspercent==100?"Uploaded":"Upload Video"}
        <input type="file"  hidden onChange={handleFileUploadV} />
      </Button>
	    <Button onClick={onSubmit} variant="contained" sx={{mt:3}}>{brod.hasOwnProperty('timestamp')?'Update Broadcast':'Add Broadcast'}</Button>
	  
    </div>
  )
}

export default BForm;