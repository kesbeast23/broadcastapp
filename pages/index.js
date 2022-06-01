import Head from "next/head";
import { useEffect, useState } from 'react'
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import ShowsCollection from "../components/ShowsCollection";
import { useAuth } from "../Auth";
import { useRouter } from 'next/router';
import Loading from "../components/Loading";
import Loggedin from "./loggedin";
import Broadcaster from "./broadcaster";

export default function Home({

  broadcastsProps 
}) {
  const {currentUser,loading} = useAuth();

  const router = useRouter();


  useEffect(() => {
    console.log(currentUser);
    if (!loading && !currentUser)
      router.push('/')
  }, [currentUser, loading])


  return (

    <div>
      <Head>
        <title>
          FunOlympics | 2022
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
 
       {!loading && !currentUser && (<Hero/>)}
       {!loading &&  currentUser?.usertype=='viewer'  && (<Loggedin/>)}
       {!loading &&  currentUser?.usertype=='broadcaster'  && (<Broadcaster/>)}
       {!loading &&  currentUser?.usertype=='admin'  && (<Broadcaster/>)}
  
    </div>

  );
}
