/*js for math game*/
//executed on page load
var playing = false;
var score;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    //code to be executed when start reset is clicked
    
    
    //check if we are playing or not
    if(playing==true)
    {
        location.reload();//refreshes the page
    }
    else//we are not playing
    {
                    

        playing=true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //changing button text
        document.getElementById("startreset").innerHTML = "Reset Game";
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover");
        show("timeremaining");
        startCountDown();
        generateQA();
    }
    
    
    
    
}

function startCountDown(){
    var action= setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining==0)
        {
            clearInterval(action);
            show("gameover");
            hide("timeremaining");
            document.getElementById("gameover").innerHTML = "<p>GAME OVER! </p><p>Your Score Is "+score+"</p>";
            show("gameover");
            document.getElementById("startreset").innerHTML = "Start Game";
            playing=false;
        }
    },1000);
}

function show(id){
    
    document.getElementById(id).style.display = "block"
}

function hide(id){
    
    document.getElementById(id).style.display = "none";
}

function generateQA(){
    var x = 1+ Math.round(Math.random()*9 );
    var y = 1+ Math.round(Math.random()*9 );
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    //fill correct answer in random box;
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    for(i=1;i<5;i++)
    {
        if(i!=correctPosition)
        {
            var wrongAnswer;
            do
            {
                wrongAnswer = (1+ Math.round(Math.random()*9 ))*(1+ Math.round(Math.random()*9 ));
                
                
            }while(answers.indexOf(wrongAnswer) > -1)
                
            answers.push(wrongAnswer);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
    }
    
    
}
//handling events for answer boxes
for(i=1;i<5;i++)
{

document.getElementById("box"+i).onclick = function(){
    if(playing=true){
        if(this.innerHTML == correctAnswer)
        {
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            hide("incorrect");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },500);
            generateQA();
        }
        else{
            hide("correct");
            show("incorrect");
            setTimeout(function(){
                hide("incorrect");
            },500);
        }
    }
 }
}