import { useState,useEffect,useContext } from "react"
import { db } from '../firebase'
import { collection, doc,deleteDoc, onSnapshot, orderBy, query, QuerySnapshot, where } from "firebase/firestore"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from "../Auth"
import { useRouter } from "next/router"
import { Chip, InfoRounded } from "@mui/icons-material"
import MaterialTableNext from "material-table-next";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { Box, Button,IconButton } from "@mui/material"
import ReactPlayer from "react-player/lazy";
import { BContext } from "../pages/BContext";

const BList = ({broadcastsProps}) => {
    const [brods, setBrods] = useState([])
    const {currentUser,loading} = useAuth();
    const {showAlert,brod,setBrod }=useContext(BContext);
    const [showPlayer, setShowPlayer] = useState(false);
    const [playerUrl, setPlayerUrl] = useState("");
    const router = useRouter();

    const seeMore=(id,e)=>{
	e.stopPropagation();
	setPlayerUrl(id);
	setShowPlayer(true);

}
 
    
      const headCells = [
	{
	  id: "title",
	  numeric: false,
	  disablePadding: false,
	  label: "title",

	},
	{
		id: "overview",
		numeric: false,
		disablePadding: false,
		label: "overview",
      
	      },
	      {
		id: "email",
		numeric: false,
		disablePadding: false,
		label: "email",
      
	      },
	      {
		id: "code",
		numeric: false,
		disablePadding: false,
		label: "code",
      
	      },
	      {
		id: "timestamp",
		numeric: false,
		disablePadding: false,
		label: "timestamp",
	      },
	      {
		id: "brodcaster",
		numeric: false,
		disablePadding: false,
		label: "brodcaster",
	      },
	      {
		id: "video",
		numeric: false,
		disablePadding: false,
		label: "video",
		onRender: (data) => 
		<IconButton onClick={e=>seeMore(data?.video,e)}>
		<MoreVertIcon />
	</IconButton>
		      
	      },
	      
      ];
      
      

      useEffect(() => {
	if (!loading && !currentUser)
	  router.push('/')
      }, [currentUser, loading])
    
    
    useEffect(() => {
	    console.log(broadcastsProps);
        if (typeof broadcastsProps !== 'undefined') {
		setBrods(JSON.parse(broadcastsProps));
          }
        
    }, []);


//     useEffect(() => {
//         if (currentUser?.email !== undefined) {

       
//         const collectionRef = collection(db, "broadcasts");
//         const q = query(collectionRef,where("email","==",currentUser?.email), orderBy("timestamp", "desc"));

//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             setBrods(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id,
//                 timestamp:doc.data().timestamp?.toDate().getTime()})))
//         });
// 	console.log(brods);
//         return unsubscribe;
//     }
//     }, [])

    return ( <div> 
      <MaterialTableNext
          title={"Broadcasts"}
          searchKeys={["title"]}
          rows={brods}
          headCells={headCells}
          // loading={false}
          onDelete={async(data) => {
            console.log("data", data);
	   
		const docRef=doc(db,"broadcasts",data[0]?.id);
		await deleteDoc(docRef);
		showAlert('error',`broadcast with id  ${data[0]?.id} is deleted successfully`)
		window.location.reload();
          }}
          onEdit={(data) => {
            console.log(data);
	    setBrod(data[0]);
          }}
        />

	{showPlayer && (<div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
         
            <div className="relative pt-[56.25%]">
	
              <ReactPlayer
                url={playerUrl}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
	         <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">

              <span className="font-semibold">Broadcast Trailer</span>
	
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            </div>
          </div>)}
    </div>
    )

}

export default BList;