//var players = []; // all the soundcloud player objects here, per song
//var currentSong = 0;

function KyleBox(){
  // initialize soundcloud, and store a reference to it in our instance
  this.players = [];
  this.currentSong = 0;
  this.soundcloud = SC; // copy SC to soundcloud instance variable
  this.soundcloud.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
  });

}


KyleBox.prototype.play = function(){
  this.players[this.currentSong].play();
}

KyleBox.prototype.pause = function(){
  this.players[this.currentSong].pause();
}

KyleBox.prototype.stop = function(){
  this.players[this.currentSong].pause();
  this.players[this.currentSong].seek(0);
}

KyleBox.prototype.next = function(){
    this.currentSong += 1;
    if( this.currentSong >= $("ul li").length) {
      this.currentSong = 0;
    }
    this.play();
}

KyleBox.prototype.searchTracks = function(){
  console.log( "this", this );
  var that = this;
  this.soundcloud.get("/tracks", {q: $("input[name=searchbox]").val()})
    .then(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var art = response[i].artwork_url;
        if( !art ) art = response[i].user.avatar_;
        $("ul").append("<li data-stream='"+ response[i].stream_url.match(/\/tracks\/[0-9]+/)[0] + "' data-index='"+ i +"'data-duration='" + response[i].duration + "'>" + response[i].title + "<img src='"+ art +"' /></li>");
        
      }
    }).then(function(){
    // $("ul li").click(function(event){
    $("ul li").on("click",function(event){
      console.log(event);
      currentSong = parseInt($(event.target).attr('data-index'));
      //console.log( this, this.players);
      if( !that.players[$(event.target).attr('data-index')] ) {
        that.soundcloud.stream( $(event.target).attr('data-stream') ).then(function(player){
          console.log(player);
          // save the player object to players...
          that.players[$(event.target).attr('data-index')] = player;
          that.players[$(event.target).attr('data-index')].play();
          that.players[$(event.target).attr('data-index')].on("finish",function(){
            console.log( "Done" );
          });
        });
      } else {
        that.players[$(event.target).attr('data-index')].play();
        
      }
    });
    console.log("inside then");
  });
}

$(document).ready(function(){

 var jukebox = new KyleBox();

  $("#searchbar").submit(function(event){
    event.preventDefault();
    jukebox.searchTracks();
  }); 
 $("#Play").click(function(){
    jukebox.play();
  });
  $("#Pause").click(function(){
    jukebox.pause();
  });
  
   $("#stop").click(function(){
      jukebox.stop();
  });
   // $("#next").click(function(){
   //   // add next song to empty array 
   // });
   $("#next").click(function(){
    // stop
      jukebox.next();

   });
  

  // $("#playpausebtn").hasClass("play")
  // $("#playpausebtn").removeClass("play")
 //  playbtn = document.getElementById("playpausebtn");
 //  mutebtn = document.getElementById("mutebtn");
 //  stopbtn = document.getElementById("stopbtn");
 //  function player() {
 //    this.playPause = function() {
 //      if(stream.paused){
 //        stream.play();
 //      } else {
 //        stream.pause();
 //      }
 //    }
 //    this.mute = function() {
 //     if(stream.muted){
 //      stream.muted = false;
 //    } else {
 //      stream.muted = true;
 //    }
 //    }
 //    this.stop = function() {
 //      if(stream.play){
 //        stream.pause()
 //        stream.currentTime = 0;
 //      }
 //    }
 //  }
 //  var myJukebox = new player();
 //  playbtn.addEventListener("click",myJukebox.playPause);
 //  mutebtn.addEventListener("click",myJukebox.mute);
 //  stopbtn.addEventListener("click",myJukebox.stop);
 });
