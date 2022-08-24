DiceGame();


function DiceGame()
{
  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;

  document.querySelectorAll("img")[0].setAttribute("src", "images/dice" + randomNumber1 + ".png");
  document.querySelectorAll("img")[1].setAttribute("src", "images/dice" + randomNumber2 + ".png");

  if(randomNumber1 > randomNumber2)
  {
    document.querySelector("h1").textContent = "🚩Player 1 wins";
  }
  else if(randomNumber2 > randomNumber1)
  {
    document.querySelector("h1").textContent = "Player 2 Wins🚩";
  }
  else
    document.querySelector("h1").textContent = "Draw!";
}
function refreshPage()
{
  window.location.reload();
}
