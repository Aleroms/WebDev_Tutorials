
//bad code document.addEventListener("click", )
for(var i = 0; i < document.querySelectorAll(".drum").length; i++)
{
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    KeyCheck(this.innerHTML);
    buttonAnimation(this.innerHTML);

  });

  document.addEventListener("keydown", function(event){
    KeyCheck(event.key)
    buttonAnimation(event.key);
});

}

function KeyCheck(key)
{
  var audio;
  switch(key)
  {
    case "w":
      audio = new Audio("sounds/crash.mp3");
    break;
    case "a":
      audio = new Audio("sounds/kick-bass.mp3");
    break;
    case "s":
     audio = new Audio("sounds/snare.mp3");
    break;
    case "d":
     audio = new Audio("sounds/tom-1.mp3");
    break;
    case "j":
     audio = new Audio("sounds/tom-2.mp3");
    break;
    case "k":
    audio = new Audio("sounds/tom-3.mp3");
    break;
    case "l":
    audio = new Audio("sounds/tom-4.mp3");
    break;
  }
  audio.volume = 0.2;
  audio.play();

}

function buttonAnimation(button)
{
  //this function adds and removes the pressed class when
  //it is pressed or clicked
  var activeButton = document.querySelector("." + button)
  activeButton.classList.add("pressed");

  setTimeout(function(){
    activeButton.classList.remove("pressed");
  },100);
  //add pressed class to button
}
