import Image from "next/image";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useAuth } from "../Auth";
import { db,auth } from '../firebase';
import { Avatar, Box, IconButton, Typography } from "@mui/material";


function Header() {
  const {currentUser,loading} = useAuth();
  const router = useRouter();
  

  return (
    <header className="sticky bg-[#ffffff] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
      <Image
        src="/images/sports2.png"
        alt=""
        width={80}
        height={80}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      {currentUser && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
        </div>
      )}
      {!currentUser ? (
        <button
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-blue hover:text-black transition duration-200"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      ) : (
        <Box   className="ml-auto uppercase border px-2 py-1.5 rounded font-medium tracking-wide hover:bg-blue hover:text-black transition duration-200" sx={{display:'flex',justifyContent:'center'}} mt={1}>

        <IconButton onClick={()=>auth.signOut()}>
        <Avatar src={currentUser && currentUser.photoURL}/>
        </IconButton>
       <div>
       <Typography variant="h6">{currentUser && currentUser.email}</Typography>
        <Typography variant="h8">{currentUser && currentUser.usertype}</Typography> 
       </div>
      </Box>
      )}
    </header>
  );
}

export default Header;
