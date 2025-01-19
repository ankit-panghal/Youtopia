
async function videoDetail(id){
    localStorage.setItem('videoId',id)
    try{
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyAAPv-yP7JbHWvD5ou9EySt5xnD1K-Vlqc`
        const response = await fetch(url);
        const result = await response.json();
        localStorage.setItem('categoryId',result.items[0].snippet.categoryId)
    }
    catch(err){
       console.log(err.message)
    }
    window.location.href = '/videoPage'
}
export default videoDetail
