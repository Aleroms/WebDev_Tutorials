var buttonColors = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  PlaySound(userChosenColor);
  AnimatePress(userChosenColor);
  CheckAnswer(userClickedPattern.length - 1);


});

$(document).keypress(function(){
  if(gameStarted === false){
    NextSequence();
    gameStarted = true;
  }
})

function NextSequence(){

  $("#level-title").text("Level " + level++);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);

  $("#"+randomColor).fadeOut(100).fadeIn(100);
  PlaySound(randomColor);

}

function PlaySound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//currentColor is also the id of element
function AnimatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $('#'+currentColor).removeClass("pressed");
  },100);
}

function CheckAnswer(currentLevel){
//  console.log(currentLevel);

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("chose the correct color");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        NextSequence();
      },1000);
    }
  }
  else{
    PlaySound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart")
    StartOver();
    console.log("incorrect color");
  }

}

function StartOver(){
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

//NextSequence();
