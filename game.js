var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = true;
var level = 0;


$(".btn").on("click",function(){ // Butona basıldığında
    var userChosenColour = this.id; // userChosenColour değişkeni basılan elemanın id'sine eşitlenir.
    userClickedPattern.push(userChosenColour); // Basılan renk userClickedPattern adlı değişkene aktarılır.
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).on("keypress",function(){ // Oyun burada başlar.
    if (started){
        started = false;
        nextSequence();  
    }    
})

function nextSequence(){

    userClickedPattern = []; // Kullanıcı tıklama dizisini sıfırla

    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = (Math.random() * 3); // 0-3 arası random sayı üretir
    randomNumber = Math.round(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Flaş efekti
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed"); // pressed class'ı eklenir.

    setTimeout(function() {
        $("."+currentColour).removeClass("pressed"); // 0.125 saniye sonra pressed class'ı kaldırılır.
    }, 125);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
  
      }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
}


