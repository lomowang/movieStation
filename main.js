

// APIURL
const API_KEY = 'api_key=5d7ac24e63419994fda11db9f90c8f2b';
const BASE_URL ='https://api.themoviedb.org/3';
// 電影的api
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
// 影集的api
const API_TVURL = BASE_URL + '/tv/popular?&'+API_KEY;

const IMG_URL= 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL+'/search/movie?'+API_KEY;
const genres = [
  {
    id: 28,
    name: "Action"
    },
    {
    id: 12,
    name: "Adventure"
    },
    {
    id: 16,
    name: "Animation"
    },
    {
    id: 35,
    name: "Comedy"
    },
    {
    id: 80,
    name: "Crime"
    },
    {
    id: 99,
    name: "Documentary"
    },
    {
    id: 18,
    name: "Drama"
    },
    {
    id: 10751,
    name: "Family"
    },
    {
    id: 14,
    name: "Fantasy"
    },
    {
    id: 36,
    name: "History"
    },
    {
    id: 27,
    name: "Horror"
    },
    {
    id: 10402,
    name: "Music"
    },
    {
    id: 9648,
    name: "Mystery"
    },
    {
    id: 10749,
    name: "Romance"
    },
    {
    id: 878,
    name: "Science Fiction"
    },
    {
    id: 10770,
    name: "TV Movie"
    },
    {
    id: 53,
    name: "Thriller"
    },
    {
    id: 10752,
    name: "War"
    },
    {
    id: 37,
    name: "Western"
    }

  


]



const main = document.getElementById('main');
console.log(main)
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEL = document.getElementById('tags');
console.log(tags)
const header = document.getElementById('header');

const trendingTvshow = document.getElementById('trendingTvshow');
console.log(trendingTvshow)



// header
var selectedGenre = []
setGenre();
function setGenre(){
  // 設定空置串
  tagsEL.innerHTML='';
  // 跑回圈
  genres.forEach(genre =>{
    // 創造一個節點元素
    const t = document.createElement('div');

    t.classList.add('tag');
    // 抓取陣列各元素ID
    t.id = genre.id;
    // 抓取陣列各元素名字
    t.innerText = genre.name;

    // 滑鼠點擊事件 抓取值
    t.addEventListener('click',() =>{
      if(selectedGenre.length == 0){
        selectedGenre.push(genre.id);
      }else{
        if(selectedGenre.includes(genre.id)){
          selectedGenre.forEach((id, idx) =>{
            if(id == genre.id){
              selectedGenre.splice(idx,1);
            }
          })
        }else{
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre)
      // 將選取類型渲染到畫面上
      getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
      highlightSelection();

    })
    tagsEL.append(t);
    console.log(t);
  })
}

// 標籤
function highlightSelection(){
  // 移除標籤變色
  const tag = document.querySelectorAll('.tag');
  tag.forEach(tag =>{
    tag.classList.remove('highlight')
  })
  clearBtn()
  // 標籤標記變色
  if (selectedGenre.length !=0){
    selectedGenre.forEach(id =>{
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    })
  }
}






// 這是秀出電影的
// main段落的
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        if(data.results.length !== 0){
           showMovies(data.results);
        }else{
          main.innerHTML =`<h1 class="no-results">No Results</h1>`
        }
    })
}



// main段落的
function showMovies(data){
   main.innerHTML = '';

    data.forEach(movie =>{        
        const {title,poster_path,release_date,vote_average,id} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML=`
  
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movieInfo">
                <h3>${title}</h3>
            </div>
            <p class="green">${vote_average}</p>
            <div class="date">
                <p >${release_date}</p>
            </div>
        </div>
        `
        main.appendChild(movieEL);
        console.log(main)

        })
        
    }
    
  

// 這是秀出影集的

gettvshow(API_TVURL);

function gettvshow(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
        tvshow(data.results);
      } else {
        trendingTvshow.innerHTML = `<h1 class="no-results">No Results</h1>`;
      }
    });
}


function tvshow(data) {
  trendingTvshow.innerHTML = '';


data.forEach(tv =>{        
  const {poster_path, first_air_date, vote_average ,name } = tv;
  const trendingTvElement = document.createElement('div');
  trendingTvElement.classList.add('tv');
  trendingTvElement.innerHTML=`
  <img src="${IMG_URL+poster_path}" alt="${name}">
      <div class="movieInfo">
          <h3>${name}</h3>
      </div>
      <p class="green">${vote_average}</p>
      <div class="date">
          <p >${first_air_date}</p>
      </div>
  </div>
  `
  trendingTvshow.appendChild(trendingTvElement);
  console.log(trendingTvshow)

  })
}



    //  評分投票
     function getColor(vote){
        if(vote>=8){
            return'green'
        }else if(vote >=5){
            return'orange'
        }else{
            return 'red'
        }
     }


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    selectedGenre=[];
    setGenre()
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        // 搜尋清空就回主畫面
        getMovies(API_URL);
    }
})



// const rightBtn =document.getElementsByClassName('rightArrow')[0];
// const lefttBtn = document. getElementsByClassName('leftArrow')[0];
// const trendingMovie = document.getElementsByClassName('trendingMovie')[0];


const rightBtn = document.querySelectorAll('.rightArrow')
console.log(rightBtn)



const trendingMovie = document.querySelectorAll('.trendingMovie')
console.log(trendingMovie)


rightBtn.forEach((rightArrow,i)=>{
  rightArrow.addEventListener("click",()=>{
    trendingMovie[i].style.transform = `translateX(${
      trendingMovie[i].computedStyleMap().get("transform")[10].x.value-270}px)`;
  });
});






// rightBtn.addEventListener('click', ()=> {
//   trendingMovie.scrollLeft -= 140;
// })
// lefttBtn.addEventListener('click', ()=> {
//   trendingMovie.scrollLeft += 140;
// })
