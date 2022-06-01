
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Image from "next/image";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import nookies from 'nookies';
import { useRouter } from 'next/router';
import Head from "next/head";
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import ShowsCollection from "../components/ShowsCollection";
import { useAuth } from "../Auth";
import { auth, provider } from '../firebase';
import { Avatar, Box, Icon, IconButton, Typography } from '@mui/material';



export default function Loggedin({   popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows, }) {
  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");
  const [todo, setTodo] = useState({title:'',detail:''});
  const [showPassword, setShowPassword] = useState(false); 
  
  const {currentUser,loading} = useAuth();

  const router = useRouter();


  useEffect(() => {
    console.log(currentUser);
    if (!loading && !currentUser && currentUser.usertype!=='viewer')
      router.replace('/loggedin','/')
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
    loading?<Loading type="bubbles" color="yellowgreen"/>: 

   <div>
      <Head>
        <title>
          FunOlympics | 2022
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <Typography variant="h8">{currentUser && currentUser.email}</Typography> 
       </div>
      </Box>
      )}
    </header>

    
        <main className="relative min-h-screen after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          <Slider />
          <Brands />
          <MoviesCollection results={popularMovies} title="Popular Movies" />
          <ShowsCollection results={popularShows} title="Popular Shows" />

          <MoviesCollection
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
        </main>
  
    </div>


  )
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);
 //
   // const [
   //   popularMoviesRes,
   //   popularShowsRes,
   //   top_ratedMoviesRes,
   //   top_ratedShowsRes,
   // ] = await Promise.all([
   //   fetch(
   //     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
   //   ),
   //   fetch(
   //     `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
   //   ),
   //   fetch(
   //     `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
   //   ),
   //   fetch(
   //     `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
   //   ),
   // ]);
   // const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
   //   await Promise.all([
   //     popularMoviesRes.json(),
   //     popularShowsRes.json(),
   //     top_ratedMoviesRes.json(),
   //     top_ratedShowsRes.json(),
   //   ]);
 
   return {
     props: {
 
       popularMovies: {},
       popularShows: {},
       top_ratedMovies: {},
       top_ratedShows: {},
     },
   };
 }
 