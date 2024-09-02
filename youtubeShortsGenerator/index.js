
let singleVideo;

function getVideo(){
    let channelId = "UCy2vByAZhHucf8wV1Lr8hKw";
    let apiKey = "AIzaSyCwwRATaVK1tZIGB_TDVCfFpZ8tjGr8CU4";
    let videosUrl = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + channelId + "&maxResults=50&key=" + apiKey;
    // Get all videos of channel
    let ajax = new XMLHttpRequest();
    ajax.open("GET", videosUrl, true)
    ajax.send();
    ajax.onreadystatechange = function(){
        // Check if the request is completed
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let json = JSON.parse(this.responseText);
            let videos = json.items;
            console.log(videos);
            let randomNumber = Math.floor(Math.random() * (videos.length + 1));
            let randomVideo = videos[randomNumber];
            console.log(randomVideo);
            let videoId = randomVideo.id.videoId;
            let videoUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&part=snippet,contentDetails,statistics&key=" + apiKey;
            // Get single video data
            let ajax = new XMLHttpRequest();
            ajax.open("GET", videoUrl, true);
            ajax.send();
            ajax.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                    let json = JSON.parse(this.responseText);
                    singleVideo = json.items[0].id;
                    let youtubeUrl = "https://www.youtube.com/watch?v=" + singleVideo;
                    console.log(youtubeUrl);

                    // Open in new window
                    
                    window.open(youtubeUrl, "window_name", "toolbar=yes");
                }

            }
        }
    }
}

/*
let player;

function onYouTubeIframeAPIReady(){
    console.log("api is loaded")
    player = new YT.Player("player", {
        height:500,
        width:900,
        videoId:singleVideo,
        playerVars:{
            playerinline:1,
            autoplay:0,
            controls:1
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });
}

function onPlayerReady(){
    console.log("ready")
}

let done = false;

function onPlayerStateChange(event){
    if(event.data == YT.PlayerState.PLAYING && !done){
        done = true;
    }
}
    */