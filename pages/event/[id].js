import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import { useAuth } from "../../Auth";
import { auth, db } from "./../../firebase";
import { collection, getDoc,doc,deleteDoc, onSnapshot, orderBy, query, QuerySnapshot, where, updateDoc, serverTimestamp } from "firebase/firestore"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Movie({ result }) {
  const {currentUser,loading} = useAuth();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [brod, setBrod] = useState([])


const changeuser = async(brod,e) => {
	e.stopPropagation();
	const docRef=  doc(db,"broadcasts",brod?.id);
	const todoUpdated={...brod,code:e.target.value,timestamp:serverTimestamp()};
	await updateDoc(docRef,todoUpdated);
	window.location.reload();
      };
    
 
    

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  // const index = result.videos.results.findIndex(
  //   (element) => element.type === "Trailer"
  // );
  useEffect(() => {
    console.log(result);
      if (typeof result !== 'undefined') {
          setBrod(JSON.parse(result));
          console.log(brod);
        }
      
  }, []);

  console.log(brod);
  return (
    <div className="relative">
      <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!currentUser ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
           {brod && brod.img && (<Image
              src={brod?.img}
              layout="fill"
              objectFit="cover"
            />)}
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {brod.title}
            </h1>
            

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>
              <div className="flex items-center space-x-3 md:space-x-5">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
		<InputLabel id="demo-select-small">Status</InputLabel>
		<Select
		  labelId="demo-select-small"
		  id="demo-select-small"
		  value={brod.code}
		  label="Status"
		  onChange={e=>changeuser(brod,e)}
		>

		  <MenuItem value={"favourite"}>Favourite</MenuItem>
		  <MenuItem value={"cart"}>Cart</MenuItem>
		  <MenuItem value={"none"}>None</MenuItem>
		</Select>
	      </FormControl>


            </div>

            <p className="text-xs md:text-sm">
              {brod.code} •{" "}

              {brod.brodcaster+ " "}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{brod.overview}</h4>
          </div>

          {/* Bg Overlay */}
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}

          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={brod.video}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Movie;

export async function getServerSideProps(context) {
  const { id } = context.query;

  // const request = await fetch(
  //   `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  // ).then((response) => response.json());
  

  const docRef=doc(db,'broadcasts',id);
  const docSnap = await getDoc(docRef);
  let request={...docSnap.data(),id:id};
  return {
    props: {
      result: JSON.stringify(request) || [],
    },
  };
}
