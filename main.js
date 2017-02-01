var players = []; // all the soundcloud player objects here, per song
var currentSong = 0;
var cloudStream = SC.stream( $(event.target).attr('data-stream') ).then(function(player){
          console.log(player);
var Index = players[$(event.target).attr('data-index')]
$(document).ready(function(){
  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
    });
 

  $("#searchbar").submit(function(event){
  	event.preventDefault();
	SC.get("/tracks", {q: $("input[name=searchbox]").val()})
	  .then(function(response) {
	    console.log(response);
	    for (var i = 0; i < response.length; i++) {
	      var art = response[i].artwork_url;
	      if( !art ) art = response[i].user.avatar_;
	      $("ul").append("<li data-stream='"+ response[i].stream_url.match(/\/tracks\/[0-9]+/)[0] + "' data-index='"+ i +"'data-duration='" + response[i].duration + "'>" + response[i].title + "<img src='"+ art +"' /></li>");
	      
	    }
	  })
  
  .then(function(){
    // $("ul li").click(function(event){
    $("ul li").on("click",function(event){
      console.log(event);
      currentSong = parseInt($(event.target).attr('data-index'));
      if( !Index.attr[('data-index')] ) {
      	cloudStream;
	        // save the player object to players...
	        Index = player;
	        Index.play();
	        Index.on("finish",function(){
	          console.log( "Done" );
	        });
	      } else {
      	players[$(event.target).attr('data-index')].play();
      }

      
    });
    console.log("inside then");
  });
}); 
 
 $('#Play').on.click(cloudStream)
 $("#Play").click(function(){
  	players[currentSong].play();
  });
  $("#Pause").click(function(){
  	players[currentSong].pause();
  });
  
   $("#stop").click(function(){
  	players[currentSong].pause();
  	players[currentSong].seek(0);
  });
   // $("#next").click(function(){
   // 	// add next song to empty array 
   // });
   $("#next").click(function(){
   	// stop
   	currentSong += 1;
   	if( currentSong >= $("ul li").length) {
   		currentSong = 0;
   	}
   var Next = $("ul li")[currentSong];
   $(Next).click();

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