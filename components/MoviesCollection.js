import MovieThumbnail from "./MovieThumbnail";
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, doc,deleteDoc, onSnapshot, orderBy, query, QuerySnapshot, where, updateDoc, serverTimestamp } from "firebase/firestore"

function MoviesCollection({ broadcastsProps, title }) {
  const [brods, setBrods] = useState([])
  console.log(broadcastsProps)
      
  useEffect(() => {
    console.log(broadcastsProps);
      if (typeof broadcastsProps !== 'undefined') {
  setBrods(JSON.parse(broadcastsProps));
        }
      
  }, []);

      
  // useEffect(() => {
  //   console.log(broadcastsProps);
  //     if (typeof usersProps !== 'undefined') {
  // setBrods(JSON.parse(broadcastsProps));
  //       }
      
  // }, []);

  //   useEffect(() => {


       
  //       const collectionRef = collection(db, "broadcasts");
  //       const q = query(collectionRef, orderBy("timestamp", "desc"));

  //       const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //           setBrods(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id,
  //               timestamp:doc.data().timestamp.toString()})))
  //       });
	// console.log(brods);
  //       return unsubscribe;
    
  //   }, [])

 


  // results=[
  //   {  
  //      "poster_path":"https://firebasestorage.googleapis.com/v0/b/broadcastapp-15206.appspot.com/o/skysports-perisic-mane-ten-hag_5788642.jpeg?alt=media&token=811acc64-bdcc-403b-a242-8365861e088f",
  //      "adult":false,
  //      "overview":"Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
  //      "release_date":"2015-12-18",
  //      "genre_ids":[  
  //         28,
  //         12,
  //         878,
  //         14
  //      ],
  //      "id":140607,
  //      "original_title":"Star Wars: The Force Awakens",
  //      "original_language":"en",
  //      "title":"Star Wars: The Force Awakens",
  //      "backdrop_path":"https://firebasestorage.googleapis.com/v0/b/broadcastapp-15206.appspot.com/o/skysports-perisic-mane-ten-hag_5788642.jpeg?alt=media&token=811acc64-bdcc-403b-a242-8365861e088f",
  //      "popularity":79.28243,
  //      "vote_count":1055,
  //      "video":false,
  //      "vote_average":8.05
  //   },
  //   {  
  //      "poster_path":"https://firebasestorage.googleapis.com/v0/b/broadcastapp-15206.appspot.com/o/skysports-perisic-mane-ten-hag_5788642.jpeg?alt=media&token=811acc64-bdcc-403b-a242-8365861e088f",
  //      "adult":false,
  //      "overview":"Armed with the astonishing ability to shrink in scale but increase in strength, con-man Scott Lang must embrace his inner-hero and help his mentor, Dr. Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.",
  //      "release_date":"2015-07-17",
  //      "genre_ids":[  
  //         878,
  //         28,
  //         12
  //      ],
  //      "id":102899,
  //      "original_title":"Ant-Man",
  //      "original_language":"en",
  //      "title":"Ant-Man",
  //      "backdrop_path":"https://firebasestorage.googleapis.com/v0/b/broadcastapp-15206.appspot.com/o/skysports-perisic-mane-ten-hag_5788642.jpeg?alt=media&token=811acc64-bdcc-403b-a242-8365861e088f",

  //      "popularity":36.106324,
  //      "vote_count":2063,
  //      "video":false,
  //      "vote_average":6.88
  //   }];


  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {brods.map((brod) => (
          <MovieThumbnail key={brod.id} brod={brod} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
