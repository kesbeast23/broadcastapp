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
import Admin from "./admin";

export default function Home({
  broadcastsProps,blogsProps,ublogsProps,usersProps }) {
  const {currentUser,loading} = useAuth();

  const router = useRouter();


  useEffect(() => {
    if (currentUser && currentUser?.usertype =='admin')
      router.push('/admin');


    if (currentUser && currentUser?.usertype =='broadcaster')
      router.push('/broadcaster');

    if (currentUser && currentUser?.usertype =='viewer')
      router.push('/viewer');

      
    if (!loading && !currentUser)
      router.push('/');
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
 
<Hero/>

  
    </div>

  );
}
