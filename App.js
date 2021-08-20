// import logo from './logo.svg';
import './App.css';
// import Header from './Header';
// import Photo from './Photo';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


function App() {

  let [movieInfo,setMovieInfo] = useState(null);
  let [title,setTitle] = useState("The Suicide Squad")

   function readTitle(value){
    setTitle(value);
  }

  function getMovieInfo (){
    let url = `https://omdbapi.com/?t=${title}&apikey=784a9d41`;

    fetch(url)
    .then((response)=>(response.json()))
    .then((movie)=>{
      console.log(movie);
      setMovieInfo(movie);
    }
    )
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getMovieInfo();
  },[])

  return (
    <div className="App">
      
          
      <div className='container mt-5'>
              <center><h1 className="header">MOVIES | TV SERIES DATABASE</h1></center>
              <input type="text" id="myInput" placeholder="Enter Movie Name" onChange={(event)=>{readTitle(event.target.value)}} className="input"/>
              <Button variant="success" id="myBtn" onClick={getMovieInfo}>Get Movie</Button> 
              
            {
              movieInfo?.Error===undefined?(
                <div className="movie">
                <div className="poster">
                  <img src={movieInfo?.Poster} alt="Poster" className="img-poster"/>
                </div>
                <div className="details">

                      <div className="padd">
                            <h2>{movieInfo?.Title}</h2>
                            <hr></hr>
                            <p><strong>Genre : </strong>{movieInfo?.Genre}</p>
                            <p><strong>Language : </strong>{movieInfo?.Language}</p>
                            <p><strong>Rated : </strong>{movieInfo?.Rated}</p>
                            <p><strong>Cast : </strong>{movieInfo?.Actors}</p>
                            <p><strong>Directed By : </strong>{movieInfo?.Director}</p>
                            <p><strong>Story : </strong>{movieInfo?.Plot}</p>
                            <p><strong>Released : </strong>{movieInfo?.Released}</p>
                            <p><strong>Runtime : </strong>{movieInfo?.Runtime}</p>

                            <div className="ratings">
                  
                                {
                                  movieInfo?.Ratings.map((rating,index)=>(
                                    
                                    <div key={index}>
                                        <strong>{rating.Source}</strong>
                                        <h5>{rating.Value}</h5>
                                    </div>
                                  ))
                                }
                            <div>
                        </div>
                  </div>
          </div>

         </div>

        </div>

              ):(
              <h1 className="not-found">Movie Not Found... :(  Try with some exact keywords</h1>
              )
            }
            

      </div>

    </div>
          
  );
}

export default App;

