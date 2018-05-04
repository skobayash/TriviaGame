

var qBank = [
    {
      question: "1. According to the Oregon Trail Game, what was the most deadly disease during the journey West?",
      choices: {
        a: "dysentery ",
        b: "measles ",
        c: "scarlet fever ",
        d: "pneumonia "
      },
      answer: "a"
    },
    {
      question: "2. According to actual history, what Native American tribe did Sacagawea belong to?",
      choices: {
        a: "Shawnee ",
        b: "Shoshone ",
        c: "Sioux ",
        d: "Arikara "
      },
      answer: "b"
    },
    {
      question: "3. In the Oregon Trail Game, which profession was NOT an option to choose from for your character?",
      choices: {
        a: "Banker from Boston",
        b: "Carpenter from Ohio",
        c: "Salesperson from New York",
        d: "Farmer from Illinois"
      },
      answer: "c"
    },
    {
      question: "4. In the game, if one of your party members dies, what can be found at their site of death in following playthroughs?",
      choices: {
        a: "Flowers",
        b: "Gravestone",
        c: "Make-shift burial mound",
        d: "The ghost of your party member"
      },
      answer: "b"
    }
  ];
  
// Answer key (based on input type values)
var qBankAnswer = ["1", "2", "3", "2"];
 
  
/* Global variables */
var counter = 0;
var time = 60;
var intervalId;
  

// Set & display timer
function run() {
    intervalId = setInterval(decrement, 1000);
    var displayTime = $("<h3>");
    displayTime.addClass("count");
    $('#quiz').append(displayTime);
}

function decrement() {
    time--;
    $('.count').text("Remaining time: " + time);
    if(time === 0) {
        stop();
        timeUp();
    }
}

function stop() {
clearInterval(intervalId);
}
  

// If time runs out
function timeUp() {
    var userAnswers = $('.test');
    var checked = [];
    // answers pushed into new array if checked
    for (var i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i].checked) {
        checked.push(userAnswers[i].value);
        }
    }

    // Counter increased with correct answer
    for (var i = 0; i < checked.length; i++) {
        if (checked[i] === qBankAnswer[i]) {
        counter++;
        }
    }

    // Score rounded to percentage
    var score = Math.round(counter / qBankAnswer.length * 100);
    $('#submitButton').css('display', 'none');
    $('#quiz').html("<h1> Your score is: " + score + "%</h1>");
    }
    

/* When start button is clicked */
$('#start').on('click', function() {
    run();
  
    // Remove start button, questions displayed
    $('#start').css('display', 'none');
    for (var i = 0; i < qBank.length; i++) {
      $('#quiz').append('<h4>' + qBank[i].question + "</h4>");
      $("#quiz").append("<input type='radio' class='test' value='1' name='question" + i + "'" + "/>" + qBank[i].choices.a);
      $("#quiz").append("<input type='radio' class='test' value='2' name='question" + i + "'" + "/>" + qBank[i].choices.b);
      $("#quiz").append("<input type='radio' class='test' value='3' name='question" + i + "'" + "/>" + qBank[i].choices.c);
      $("#quiz").append("<input type='radio' class='test' value='4' name='question" + i + "'" + "/>" + qBank[i].choices.d);
    }
   
    // Submit button created
    var submit = $('<input>').attr(
      {
        type: 'button', 
        id: 'submitButton', 
        value: 'submit'
      }
    );
    $('#quiz').append('<br><br>');
    $('#quiz').append(submit);


    /* When Submit button is clicked */
    $('#submitButton').on('click', function() {
        var userAnswers = $('.test');
        var checked = [];
        // User input pushed into array
        for (var i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i].checked) {
            checked.push(userAnswers[i].value)
            }
        }
        // Score increases if correct
        for (var i = 0; i < checked.length; i++) {
            if (checked[i] !== qBankAnswer[i]) {
            } else if (checked[i] === qBankAnswer[i]) {
            counter++;
            }
        }
        // Score rounded to percentage & displayed
        var score = Math.round(counter / qBankAnswer.length * 100);
        $('#submitButton').css('display', 'none');
        $('#quiz').html('<h1> Your score is: ' + score + '%</h1>');

        // #Incorrect & #correct displayed
        if (counter === 2) {
          $('#quiz').append('<h2> Answered correctly: 2</h2>');
          $('#quiz').append('<h2> Answered incorrectly: 1</h2>');
        } else if (counter === 1) {
          $('#quiz').append('<h2> Answered correctly: 1</h2>');
          $('#quiz').append('<h2> Answered incorrectly: 2</h2>');
        } else if (counter === 3) {
          $('#quiz').append('<h2> Answered correctly: 3</h2>');
          $('#quiz').append('<h2> Answered incorrectly: 0</h2>');
        } else {
          $('#quiz').append('<h2> Answered correctly: 0</h2>');
          $('#quiz').append('<h2> Answered incorrectly: 3</h2>');
        }
  
    });
    
});
  
  