
function fetchChannel(item){
    localStorage.setItem('channelId',item.snippet.channelId);
    localStorage.setItem('channelName',item.snippet.channelTitle)
     window.location.href = '/ChannelPage'
}

export default fetchChannel