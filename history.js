
let rightAnswer,
rightNumber = 0;
wrongNumber = 0;

const querystring = window.location.search;
const params = new URLSearchParams(querystring);
let page = params.get('load'); 

document.addEventListener('DOMContentLoaded',function(){
    addQuestion();

    eventListeners();
});

eventListeners = () =>{
    document.querySelector('#check').addEventListener('click',validateAnswer);


}

// eventListeners = () =>{
//     document.querySelector('#check').addEventListener('click',validateAnswer);


// }

addQuestion = (category)=> {

    const url = `https://opentdb.com/api.php?amount=10&category=23`;
    // const url = `https://opentdb.com/api.php?amount=10&category=${category}`;
    fetch(url)
    .then(data => data.json())
    .then(result => showQuestion(result.results));
}


showQuestion = questions =>{

    console.log('showing question starts');

    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

questions.forEach(question=> {
   rightAnswer = question.correct_answer;

   let possibleAnswers = question.incorrect_answers;
   possibleAnswers.splice(Math.floor(Math.random()*3),0,rightAnswer);

   questionHTML.innerHTML= `<div class="row justify-content-between heading">
   <p class="category">Category:${question.category}<p>
   <div class="scores">
   <span class="badge badge-primary">${rightNumber}</span>
   <span class="badge badge-warning">${wrongNumber}</span>
   </div>
   <div>
   <h2 class-"text-center">${question.question};`

    const answerDiv = document.createElement('div');
    answerDiv.classList.add('questions', 'row','justify-content-around','mt-5');

    possibleAnswers.forEach(answer=>{

        const answerHTML = document.createElement('li');
        answerHTML.classList.add('col-12', 'col-md-5');
        answerHTML.textContent=answer;

        answerHTML.onclick = selectAnswer;




        answerDiv.appendChild(answerHTML);

   
    })

    questionHTML.appendChild(answerDiv);
    document.querySelector('#application').appendChild(questionHTML);

})

}

selectAnswer = (e) => {
if (document.querySelector('.active')) {

    const activeAnswer = document.querySelector('.active');
    activeAnswer.classList.remove('active');
}

    e.target.classList.add('active');
}
validateAnswer = () =>{
    if(document.querySelector('.questions .active')){

        verifyAnswer();
    }
    else{
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = "Please Select An Answer";
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);


        setTimeout(() => {
            document.querySelector('.alert-danger').remove();

        }, 2000);
    }
}

verifyAnswer = () =>{

    const userAnswer = document.querySelector('.questions .active');
    if (userAnswer.textContent === rightAnswer) {
        rightNumber++;
    }
    else{
        wrongNumber++;
    }


    const app = document.querySelector('#application');
    while (app.firstChild) {
        console.log('removing children');
        app.removeChild(app.firstChild);
    }

addQuestion();

}




