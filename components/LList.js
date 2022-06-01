import { useState,useEffect,useContext } from "react"
import { useAuth } from "../Auth"
import { useRouter } from "next/router"

import MaterialTableNext from "material-table-next";


const LList = ({blogsProps}) => {
    const [brods, setBrods] = useState([])
    const {currentUser,loading} = useAuth();

    const router = useRouter();


    
      const headCells = [
	{
	  id: "log",
	  numeric: false,
	  disablePadding: false,
	  label: "log",

	},
	
	   
	      {
		id: "timestamp",
		numeric: false,
		disablePadding: false,
		label: "timestamp",
	      }
	    
      ];
      
      

      useEffect(() => {
	if (!loading && !currentUser)
	  router.push('/')
      }, [currentUser, loading])
    
    
    useEffect(() => {
	    console.log(blogsProps);
        if (typeof blogsProps !== 'undefined') {
		setBrods(JSON.parse(blogsProps));
          }
        
    }, []);


    return ( <div> 
      <MaterialTableNext
          title={"Broadcast logs"}
          searchKeys={["log"]}
          rows={brods}
          headCells={headCells}
          // loading={false}
          onDelete={(data) => {
            console.log("data", data);
          }}
          onEdit={(data) => {
            console.log(data);
          }}
        />
    </div>
    )

}

export default LList;