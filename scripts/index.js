let num = Math.floor(Math.random()*20)+1;

const pguess = document.querySelector(".text-insert");
const resultText = document.querySelector(".myresult");
const randNo = document.querySelector(".number");
const myGuess = document.querySelector(".guessed-number");
const error = document.querySelector(".error");
const heading = document.querySelector(".header");
let result_container = document.querySelector('.result');
const title = document.querySelector(".title");
const copyRight = document.querySelector(".copyright");
let btn = document.querySelector(".submit");
let reset;
pguess.focus();
btn.disabled = true;
pguess.className ="text-insert"
const check = e =>{
    if(pguess.value.length === 0){
        btn.disabled = true;
        error.textContent ='';
        pguess.className ="text-insert";
        btn.classList.add("disabled");
    }
    else if(Number(pguess.value) > 20 || Number(pguess.value)<1){
        btn.disabled = true;
        btn.classList.add("disabled");
        showError("Number should be between 1-20")
    }
    else{

        error.textContent ='';
        btn.disabled = false;
        btn.className ="submit";
        pguess.className ="text-insert";
        
      
    }
}

pguess.addEventListener('input',check);


btn.addEventListener('click',e =>{
    let ug = pguess.value;
    
    if(isNaN(ug)){
          e.preventDefault();
          showError("Not a number");
    }else{
        if(Number(ug) === num){
            smoothScroll(randNo,1000);
            heading.textContent = "You won!!";
            playAnim(heading);
            resultText.textContent="Congratulations!!";
            document.body.style.backgroundColor = "#93F9B9";
            playAnim(resultText);
            gameOver();
        }   
        else{
            smoothScroll(randNo,1000);
            heading.textContent ="You Lost"
            playAnim(heading);
            resultText.textContent="Better Luck Next Time !!";
            playAnim(resultText);
            document.body.style.backgroundColor = "#D31027";
            gameOver();
        }
    }
  
});

const gameOver = () =>{
    heading.offsetWidth;
    pguess.disabled = true;
    btn.disabled = true;
    myGuess.textContent = `Your guessed number ${pguess.value}`;
    playAnim(myGuess);
    randNo.textContent = `Number generated ${num}`;
    playAnim(randNo);
    reset = document.createElement('button');
    result_container.append(reset);
    resetButtonStyling(reset);
    playAnim(reset);
    reset.onmouseenter = () =>{
       reset.style.background = "white";
       reset.style.color = "black";
    }
    reset.onmouseleave = () =>{
       reset.style.background = "none";
       reset.style.color = "white";

    }
    reset.addEventListener("click",resetGame);

}
const resetButtonStyling =obj =>{
    obj.style.width = "100%";
    obj.style.maxWidth = "200px";
    obj.style.padding = "1em";
    obj.textContent ="Reset Game";
    obj.style.margin ="1em 0";
    obj.style.fontSize = "2em";
    obj.style.borderRadius = "5px";  
    obj.style.background = "none";
    obj.style.outline= "none";
    obj.style.border = "2px solid white";
    obj.style.color = "white";
    obj.style.transition = "background 0.2s"
}

const resetGame =()=>{
    heading.textContent ='';
    const resultClass = document.querySelectorAll('.result p');
    for(let i=0;i<resultClass.length;i++){
        resultClass[i].textContent = '';
    }
    document.body.style.backgroundColor = "#ff996f";
    removeAnim(resultText,heading,myGuess,randNo,reset);
    reset.parentNode.removeChild(reset);
    pguess.disabled = false;
    pguess.value ='';
    pguess.focus();
    num = Math.floor(Math.random()*20)+1;
    btn.classList.add("disabled");
    smoothScroll(title,2000);
}


const showError = errorText =>{
     error.textContent = errorText;
     pguess.className = "text-insert text-error"
}


const smoothScroll  = (target,duration) =>{
    let position = target.getBoundingClientRect().top;
    let startingpos = window.pageYOffset;
    let distance = position - startingpos;
    let startTime = null;

    const animation = currentTime =>{
        if(startTime === null){
            startTime = currentTime;
        }
        let TimeElapsed = currentTime - startTime;
        let run = easeInQuad(TimeElapsed,startingpos,distance,duration);
        window.scrollTo(0,run);

        if(TimeElapsed<duration) requestAnimationFrame(animation);
    }

    const easeInQuad = (t, b, c, d) =>{
    t /= d;
	return c*t*t*t + b;
    };

    requestAnimationFrame(animation);

}

const playAnim = (obj) =>{
   
    obj.classList.remove("animation");
    obj.offsetWidth;
    obj.classList.add("animation");
    
}

const removeAnim = (...obj)=>{

    obj.forEach(obj => obj.classList.remove("animation"));
    
}

//smoothScroll(result_container,2000);