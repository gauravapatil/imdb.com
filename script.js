let searchQuery="dil";
let search=document.getElementById("search");
let btn=document.getElementById("btn");
let container=document.getElementById("movies-container");
btn.addEventListener("click",movies)
function movies(){
    let searchText=search.value;
    searchQuery=searchText;
    console.log(searchQuery);
    
    updateonUI();
    
    

}
const loading= (isLoading)=>
    {
        
        const load= document.getElementById("loading");
        if(isLoading)
        {
            load.classList.remove('hidden');
            
        }
        else{
            load.classList.add('hidden');
        }
    
    }




async function fetchMovies() {
    let response=await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=eea945ad`);
    let data=await response.json();
    console.log(data);
    
    return data;
    
}

// async function imdb(){
//          let res=await fetchMovies();
//          console.log(res);
//          let arr=[];
         
//          for(let i=0;i<res.Search.length;i++){
//             let id=res.Search[i].imdbID;
//             console.log(id);
//             let response=await fetch(`http://www.omdbapi.com/?i=${id}&apikey=eea945ad`);
//              let data=await response.json();
//              console.log(data);
//              arr.push(data);
             
             
//          }
//          return arr;

         

// }
// imdb();
 async function updateonUI(){
    container.innerText="";
    try{
    loading(true);
    let res=await fetchMovies();
    const defaultImg = 'https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg';
    
    


    loading(false);
    console.log(res);
     
    if(res.Response==="True"){
        for(let i=0;i<res.Search.length;i++){

            let id=res.Search[i].imdbID;
            console.log(id);
            let response=await fetch(`http://www.omdbapi.com/?i=${id}&apikey=eea945ad`);
             let data=await response.json();
             console.log(data);
             
             
             const posterSrc = data.Poster && data.Poster !== 'N/A' ? data.Poster : defaultImg;
             let div=document.createElement("div");
             div.innerHTML=`<div class="individualMovieDiv">
                                   <div class="img-div">
                                   <a href="details.html?imdbID=${data.imdbID}"><img src="${posterSrc}" alt="${res.Title} poster"></img></a>
                                   </div>
                                   <h2>${data.Title}</h2>
                                   <h3>⭐${data.imdbRating}</h3>
                                </div>`;
            container.appendChild(div);
    
             console.log(data);
        }
    }
    else{
        container.innerHTML = '<p>No movies found</p>';
    }
    }
    catch(error){
        console.error('Error fetching movies:', error);
        container.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
    }
    
    
         
    

    
    

// updateonUI();


