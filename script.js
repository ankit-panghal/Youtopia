import videoCategories from "./utils/videoCategories.js";
import videoDetail from "./utils/videoDetail.js";

let searchInput = document.getElementById("searchInput");
const searchIcon = document.querySelector('.searchIcon')
const container = document.getElementById("container");

searchIcon.addEventListener('click',() => {
    fetchDetails(searchInput.value)
})

// Rendering Categories
function renderCategories(data){
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = item;
        document.querySelector('.container-top').appendChild(div);
    })
}
renderCategories(videoCategories)


document.querySelector('.container-top').addEventListener('click',(e) => {
    const text = e.target.innerText;
    const arr = Array.from(document.querySelectorAll('.item'));
 
 for(let i = 0; i < arr.length; i++){
    if(arr[i].classList[1] === 'active'){
        arr[i].className = 'item';
        break;
    }
 }
    e.target.classList.add('active')
    fetchDetails(text);
})

const loader = document.createElement('div');
loader.className = 'loader'
document.getElementById('container').appendChild(loader);

    async function fetchDetails(search){
        if(loader.className === 'loader')loader.classList.add('active')
        
        if(search === 'All') search = '';
       const url =  `https://www.googleapis.com/youtube/v3/search?q=${search}&part=snippet&chart=mostPopular&maxResults=50&type=video&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`
        try {
            const response = await fetch(url);
            const result = await response.json();
            // console.log(result.items);
            renderVideos(result.items)
        } catch (error) {
            loader.classList.remove('active');
            console.error(error);
        } 
    }
   fetchDetails('');

    function fetchChannel(item){
        localStorage.setItem('channelId',item.snippet.channelId);
        localStorage.setItem('channelName',item.snippet.channelTitle)
         window.location.href = './ChannelPage'
    }

    //Rendering videos on UI
     function renderVideos(data){
        container.innerHTML ="";
        data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="video-card">
        <img  class="video-img" src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"/>
        <div class="video-title">${item.snippet.title.substr(0,50)}...</div>
        <div class="channel-name">${item.snippet.channelTitle}</div>
        </div>`
        container.appendChild(div); 
        loader.classList.remove('active');
        const videoImg = div.querySelector('.video-img');
        videoImg.addEventListener('click',() => videoDetail(item.id.videoId))  
        const videoTitle = div.querySelector('.video-title');
        videoTitle.addEventListener('click',() => videoDetail(item.id.videoId))
        const channel = div.querySelector('.channel-name');
        channel.addEventListener('click',() => fetchChannel(item))
})}
