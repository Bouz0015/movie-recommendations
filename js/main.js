/*****
Wait for DOMContentLoaded event
fetch the configuration info for image locations and sizes
Focus on the text field
Listen for click on search button 
Listen for keypress and <enter> or <return>

After the click / <enter>-press run a fetch
result come back from fetch
show the movie results page
loop thourght the results and build <div>s  <- based on our template

make something in the div clickable
-- when they click on the element then we will trigger movie recomendations --
get the id from the clickable element
fetch the recommendations based on the movie id


*****/

let app = {
    URL: 'http://api.themoviedb.org/3/',
    INPUT: null,
    BaseUrl: 'https://image.tmdb.org/t/p/w500/',
    init: function(){
        //fetch config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        //listen for enter or return
        document.addEventListener('keypress', function(ev){
            let char =ev.char || ev.charCode || ev.which;
             if(char == 10 || char == 13){
                 //if they hit enter or return
                 btn.dispatchEvent(new MouseEvent('click'));
             }
            
        })
    },
    runSearch: function(ev){
        ev.preventDefault();
        
        if(app.INPUT.value ){
            //if they actually typed something other than <enter>
            let url= app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" +app.INPUT.value;
            
            //`${app.URL}search/movie?api_key=${KEY}&query=${app.INPUT.value}`
            
            fetch(url)
            .then( response => response.json() )
            .then( data => {
                console.log(data);
                app.showMovies(data.results);
            } )
            .catch( err => {
                console.log(err);
            } );
            
        }
    },
    showMovies: function(movies){
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        movies.forEach(function(movie){
            
            
            let div = document.createElement('div');
            div.setAttribute('data-movie', movie.id);
            console.log(movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            
          let img = document.createElement('img');
            img.src=''.concat(app.BaseUrl, movie.poster_path);
            
             let title = document.createElement('h1');
            title.textContent=movie.title;
           
            let over = document.createElement('p');
            over.textContent = movie.overview;
            
            
            div.appendChild(title);
            div.appendChild(img);
            div.appendChild(over);
            df.appendChild(div);
            
        });
        section.appendChild(df);
        
    },
    getRecommended: function(ev){
        //part of the url here is the movie id <- included in movie obj
        let movie_id = ev.target.getAttribute('data-movie');
        console.log("You clicked", movie_id);
    }
};


document.addEventListener('DOMContentLoaded', app.init);