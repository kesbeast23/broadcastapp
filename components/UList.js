import { useState,useEffect,useContext } from "react"
import { useAuth } from "../Auth"
import { useRouter } from "next/router"

import MaterialTableNext from "material-table-next";


const UList = ({ublogsProps}) => {
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
	    console.log(ublogsProps);
        if (typeof ublogsProps !== 'undefined') {
		setBrods(JSON.parse(ublogsProps));
          }
        
    }, []);


    return ( <div> 
      <MaterialTableNext
          title={"User logs"}
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

export default UList;