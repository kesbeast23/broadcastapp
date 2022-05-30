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

function Header2() {
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
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originals</span>
          </a>
        
        </div>
      )}
      {!currentUser ? (
        <button
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-blue hover:text-black transition duration-200"
        
        >
          Login
        </button>
      ) : (
        <Box sx={{display:'flex',justifyContent:'space-between'}} mt={3}>
        <IconButton onClick={()=>auth.signOut()}>
        <Avatar src={currentUser && currentUser.photoURL}/>
        </IconButton>
        <Typography variant="h5">{currentUser && currentUser.email}</Typography>
      </Box>
      )}
    </header>
  );
}

export default Header2;
