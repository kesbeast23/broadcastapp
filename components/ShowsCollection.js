import ShowThumbnail from "./ShowThumbnail";

function ShowsCollection({ results, title }) {
  results=[
    {  
       "poster_path":"\/fYzpM9GmpBlIC893fNjoWCwE24H.jpg",
       "adult":false,
       "overview":"Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
       "release_date":"2015-12-18",
       "genre_ids":[  
          28,
          12,
          878,
          14
       ],
       "id":140607,
       "original_title":"Star Wars: The Force Awakens",
       "original_language":"en",
       "title":"Star Wars: The Force Awakens",
       "backdrop_path":"\/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg",
       "popularity":79.28243,
       "vote_count":1055,
       "video":false,
       "vote_average":8.05
    },
    {  
       "poster_path":"\/D6e8RJf2qUstnfkTslTXNTUAlT.jpg",
       "adult":false,
       "overview":"Armed with the astonishing ability to shrink in scale but increase in strength, con-man Scott Lang must embrace his inner-hero and help his mentor, Dr. Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.",
       "release_date":"2015-07-17",
       "genre_ids":[  
          878,
          28,
          12
       ],
       "id":102899,
       "original_title":"Ant-Man",
       "original_language":"en",
       "title":"Ant-Man",
       "backdrop_path":"\/kvXLZqY0Ngl1XSw7EaMQO0C1CCj.jpg",
       "popularity":36.106324,
       "vote_count":2063,
       "video":false,
       "vote_average":6.88
    }];
  return (
    <div className="flex flex-col space-y-2 my-8 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {results.map((result) => (
          <ShowThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default ShowsCollection;
