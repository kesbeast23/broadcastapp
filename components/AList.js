import { useState,useEffect,useContext } from "react"
import { db } from '../firebase'
import { collection, doc,deleteDoc, onSnapshot, orderBy, query, QuerySnapshot, where, updateDoc, serverTimestamp } from "firebase/firestore"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from "../Auth"
import { useRouter } from "next/router"
import { Chip, InfoRounded } from "@mui/icons-material"
import MaterialTableNext from "material-table-next";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { Box, Button,IconButton } from "@mui/material"
import ReactPlayer from "react-player/lazy";
import { BContext } from "../pages/BContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { async } from "@firebase/util";


const AList = ({usersProps}) => {
    const [brods, setBrods] = useState([])
    const {currentUser,loading} = useAuth();
    const [showPlayer, setShowPlayer] = useState(false);
    const [playerUrl, setPlayerUrl] = useState("");
    const router = useRouter();
    const [age, setAge] = useState('');

const changeuser = async(data,e) => {
	e.stopPropagation();
	const docRef=  doc(db,"users",data?.id);
	const todoUpdated={...data,usertype:e.target.value,request:'none',timestamp:serverTimestamp()};
	await updateDoc(docRef,todoUpdated);
	window.location.reload();
      };
    
 
    
      const headCells = [

	      {
		id: "email",
		numeric: false,
		disablePadding: false,
		label: "email",
      
	      },
	      {
		id: "usertype",
		numeric: false,
		disablePadding: false,
		label: "usertype",
      
	      },
	      {
		id: "timestamp",
		numeric: false,
		disablePadding: false,
		label: "timestamp",
	      },

	      {
		id: "request",
		numeric: false,
		disablePadding: false,
		label: "request",
	      },
	      {
		id: "id",
		numeric: false,
		disablePadding: false,
		label: "edit",
		onRender: (data) => 
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
		<InputLabel id="demo-select-small">Edit</InputLabel>
		<Select
		  labelId="demo-select-small"
		  id="demo-select-small"
		  value={data?.usertype}
		  label="Edit"
		  onChange={e=>changeuser(data,e)}
		>

		  <MenuItem value={"admin"}>Admin</MenuItem>
		  <MenuItem value={"broadcaster"}>Broadcaster</MenuItem>
		  <MenuItem value={"viewer"}>Viewer</MenuItem>
		  <MenuItem value={"blocked"}>Block</MenuItem>
		</Select>
	      </FormControl>
		      
	      },
	      
      ];
      
      

      useEffect(() => {
	if (!loading && !currentUser)
	  router.push('/')
      }, [currentUser, loading])
    
    
    useEffect(() => {
	    console.log(usersProps);
        if (typeof usersProps !== 'undefined') {
		setBrods(JSON.parse(usersProps));
          }
        
    }, []);


//     useEffect(() => {
//         if (currentUser?.email !== undefined) {

       
//         const collectionRef = collection(db, "users");
//         const q = query(collectionRef, orderBy("timestamp", "desc"));

//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             setBrods(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id,
//                 timestamp:doc.data().timestamp.toString()})))
//         });
// 	console.log(brods);
//         return unsubscribe;
//     }
//     }, [])

    return ( <div> 
      <MaterialTableNext
          title={"Manage Users"}
          searchKeys={["email"]}
          rows={brods}
          headCells={headCells}
          // loading={false}
          onDelete={async(data) => {
            console.log("data", data);
	   
		const docRef=doc(db,"users",data[0]?.id);
		await deleteDoc(docRef);
		window.location.reload();
          }}
	  onEdit={(data) => {
		console.log(data);
		
	      }}

        />
    </div>
    )

}

export default AList;