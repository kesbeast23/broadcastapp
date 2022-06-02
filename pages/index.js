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

  broadcastsProps ,blogsProps
}) {
  const {currentUser,loading} = useAuth();

  const router = useRouter();


  useEffect(() => {
    if (currentUser && currentUser?.usertype =='admin')
      router.push('/admin');


    if (currentUser && currentUser?.usertype =='broadcaster')
      router.push('/broadcaster');

    if (currentUser && currentUser?.usertype =='viewer')
      router.push('/loggedin');

      
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


export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    
    const token = await verifyIdToken(cookies.token);
    const {email} = token;
    console.log("email:"+email);
    if (email !== undefined) {
      const collectionRef = collection(db, "broadcasts");
      const collectionRef1 = collection(db, "blog");
      const q = query(collectionRef,where("email","==",email), orderBy("timestamp", "desc"));
      const q1 = query(collectionRef1, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      let broadcasts =[];
      let blogs =[];
      querySnapshot.forEach(doc=>{
        broadcasts.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });
      querySnapshot1.forEach(doc=>{
        blogs.push({...doc.data(),id:doc.id,timestamp:doc.data().timestamp.toDate().toString()});
      });  
      console.log(blogs)
      return {
        props:{
	broadcastsProps:JSON.stringify(broadcasts) || [],
	blogsProps:JSON.stringify(blogs) || [],
        }
      };

    }
    return {
      props:{
	broadcastsProps:{},
	blogsProps:{},
      }
    };
   

  } catch (error) {
    return {props:{}};
  }
}
