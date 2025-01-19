import timeFormatter from "../utils/timeFormatter.js";
import videoDetail from "../utils/videoDetail.js";

document.querySelector('.go-home').addEventListener('click',() => {
	window.location.href = '/';
 })
document.title = localStorage.getItem('channelName')

document.querySelector('.heading').innerText = `${document.title} Videos`

function renderChannel(data){
	
    document.querySelector('.channel-box').innerHTML = `
	<div>
	   <div class='banner-img'>
	    <img src=${data.brandingSettings.image.bannerExternalUrl} alt='${data.snippet.title}-banner-img'/>
	   </div>
	   <div class='channel-detail'>
	   <img src=${data.snippet.thumbnails.high.url} alt='${data.snippet.title}-img'/>
        <div>
		<h3>${data.snippet.title}</h3>
		<p>${(data.snippet.description)?.slice(0,100)}...</p>
		<span>${data.statistics.subscriberCount} Subscribers</span>
		<span>${data.statistics.videoCount} Videos</span>
		</div>
	   </div>
	</div>`
}

async function fetchChannelData(){
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${localStorage.getItem('channelId')}&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`;
try {
	const response = await fetch(url);
	const result = await response.json();
	console.log(result.items[0]);
	renderChannel(result.items[0])
} catch (error) {
	console.error(error);
}
}
fetchChannelData();

const container = document.querySelector('.channel-videos')

function renderVideos(data){
    container.innerHTML ='';
    data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="video-card">
        <img  class="video-img" src=${item.snippet.thumbnails.high.url} alt="video-thumbnail"/>
        <div class="video-title">${item.snippet.title}</div>
        <div class="published-time">Published ${timeFormatter(item.snippet.publishTime)} ago</div>
        </div>`
        container.appendChild(div); 
        const videoImg = div.querySelector('.video-img');
        videoImg.addEventListener('click',() => videoDetail(item.id.videoId))  
        const videoTitle = div.querySelector('.video-title');
        videoTitle.addEventListener('click',() => videoDetail(item.id.videoId))
})
    }

async function fetchChannelVideos(){
	const url = `https://www.googleapis.com/youtube/v3/search?channelId=${localStorage.getItem('channelId')}&part=snippet&order=date&type=video&maxResults=50&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`;
	try {
		const response = await fetch(url);
		const result = await response.json();
		console.log(result.items);
		renderVideos(result.items);
	} catch (error) {
		console.error(error);
	}
}
fetchChannelVideos();