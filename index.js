var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;

function nextSequence(){
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(150).fadeIn(150); 
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
}
var ans=0;

$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    ans++;
    checkAnswer(userClickedPattern.length-1);
    
});



function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
var check=true;

$(document).on("keydown",function(){
    if(check===true){
    $("h1").text("Level "+level);    
    nextSequence();
    check=false;
    }
})

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       if(ans===gamePattern.length){
          userClickedPattern=[];
          ans=0;
           setTimeout(function(){
               nextSequence();
           },1000);
           
           
       }
   }else{
       playSound("wrong");
       $("body").addClass("game-over");
       $("h1").text("Game Over, Press any key to Restart");
       

       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       startOver();


   }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    check=true;
    ans=0;
}






