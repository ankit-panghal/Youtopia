import videoDetail from "../utils/videoDetail.js";
import fetchChannel from "../utils/channelDataSetter.js";
document.querySelector('.go-home').addEventListener('click',() => {
   window.location.href = '/';
})

const video = document.getElementById("yt-video");
const sideVideos = document.getElementById("side-videos");
const videoId = localStorage.getItem("videoId");
const categoryId = localStorage.getItem('categoryId')
video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

const videoInfo = document.getElementById("video-info"); 

//  Fetching Clicked Video Data
async function fetchVideoDetails(){
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${localStorage.getItem('videoId')}&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        // console.log(result.items[0]);
        renderData(result.items[0])
    } catch (error) {
        console.error(error);
    }
}
fetchVideoDetails();

// Rendering Video Data on UI
function renderData(item){
    // console.log(item)
        const titleWithStats = document.createElement("div");
        titleWithStats.className = "title-with-stats";
        titleWithStats.innerHTML = `
        <div class="video-title">${item.snippet.title}</div>
        <div class="statistics">
        <span class="views">${item.statistics.viewCount} views</span>
        <div class="right">
        <div class="item">
       <span> <i class="fa-regular fa-heart"></i><span>
        <span>${item.statistics.likeCount??'Not found' }</span>
        </div>
        <div class="item">
        <i class="fa-regular fa-share-from-square"></i><span>Share</span>
        </div>
        <div class="item">
        <span>Save</span>
        </div>
        </div>
        </div>`
        const channel = document.createElement("div");
        channel.className = "channel"
        channel.innerHTML=`<div class="channel-top">
        <div class="channel-name">${item.snippet.channelTitle}</div>
        <button class="subscribe">Subscribe</button>
         </div>
         <div class="description">${item.snippet.description.substr(0,300)}</div>
         `
        videoInfo.append(titleWithStats,channel);

        const channelName = channel.querySelector('.channel-name');
        channelName.addEventListener('click',() => fetchChannel(item))
}
  
  
//   Fetching comments data
  async function fetchComments(){
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`;
   
    try {
        const response = await fetch(url);
        const result = await response.json();
        addComments(result.items)
    } catch (error) {
        console.error(error);
    }
  }
  fetchComments();

//   Rendering Comments on UI
 function addComments(data){
    const commentsContainer = document.createElement("div")
    commentsContainer.className = "commentsBox"
    commentsContainer.innerHTML = `<div class="comments-top">Comments</div>`
    data.forEach(item => {
        commentsContainer.innerHTML += `<div class="comment-item"><img src= ${item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profile-img"><div><p class="comment">${item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div class ="comment-bottom">
        <i class="fa-duotone fa-solid fa-thumbs-up"></i>
        <i class="fa-duotone fa-solid fa-thumbs-down"></i>
        <button>Reply</button>
        </div>
        </div>
        </div>`
    });
    
    // Adding Comments Btn
     const commentsBtn = document.createElement('button');
    commentsBtn.className = 'comments-btn show'
    commentsBtn.innerText = 'Unshow Comments'
    videoInfo.append(commentsBtn,commentsContainer);
    
    // Show - Unshow Comments
    document.querySelector('.comments-btn').addEventListener('click',(e) => {
        const btn = e.target;
        if(btn.className === 'comments-btn'){
            btn.classList.add('show')
            btn.innerText = 'Unshow Comments'
            document.querySelector('.commentsBox').style.display = 'unset'
        }
        else{
            btn.classList.remove('show')
             btn.innerText = 'Show Comments'
              document.querySelector('.commentsBox').style.display = 'none'
        } 
      })
     
 }
  
// Fetching Side Videos Data
async function fetchSideVideos(){
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=${categoryId}&maxResults=30&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`;
    try {
	const response = await fetch(url);
	const result = await response.json();
    // console.log(result.items);
    getVideos(result.items)
    } catch (error) {
	console.error(error);
    }
}
fetchSideVideos();

// Rendering Side Videos on UI
function getVideos(data){
    // console.log(data)
    data.forEach(item => {
         const videoCard = document.createElement("div");
         videoCard.className = "video-card";
         videoCard.innerHTML = `
         <img class='video-img' src=${item.snippet.thumbnails?.medium?.url} alt="something" />
        <div class="about-video">
           <div class="title video-title">${item.snippet.title.substr(0,50)}...</div>
           <div class="channel-name">${item.snippet.channelTitle}</div>
        </div>`
           sideVideos.appendChild(videoCard);

           const videoImg = videoCard.querySelector('.video-img');
           videoImg.addEventListener('click',() => videoDetail(item.id))  
           const videoTitle = videoCard.querySelector('.video-title');
           videoTitle.addEventListener('click',() => videoDetail(item.id))
           const channel = videoCard.querySelector('.channel-name');
           channel.addEventListener('click',() => fetchChannel(item))
    })
}
