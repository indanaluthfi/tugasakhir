(function() {
  var questions = [{
    question: "Berapakah hasil dari -2+3?",
    choices: [-1, 0, 1, 5, -5],
    correctAnswer: 2
  }, {
    question: "Berapakah hasil dari -2-(-5)+2?",
    choices: [9, -9, 5, -5,-7 ],
    correctAnswer: 2
  }, {
    question: "Berapakah hasil dari -6-6+4?",
    choices: [-8, -16, 8, 16, 4],
    correctAnswer: 2
  }, {
    question: "Berapakah hasil dari 32-16-(-8)?",
    choices: [24,-24, 8, -8, 56],
    correctAnswer: 0
  }, {
    question: "Berapakah hasil dari -5+(-5)",
    choices: [0, 10, -10, 5, -5],
    correctAnswer: 2
  },{
    question: "Berapakah hasil dari 0-(-7)",
    choices: [7, -7, 0, 5, -5],
    correctAnswer: 0
  },{
    question: "Berapakah hasil dari -12+7-(-5)",
    choices: [24, -14, -10, -24, 0],
    correctAnswer: 4
  },{
    question: "Berapakah hasil dari 21+7-(-5)",
    choices: [23, 33, -23, -33, 21],
    correctAnswer: 1
  },{
    question: "Berapakah hasil dari -8+(-5)",
    choices: [13, -13, 3, -3, 8],
    correctAnswer: 1
  },{
    question: "Berapakah hasil dari -4+9+(-5)",
    choices: [0, -18, 18, 8, -8],
    correctAnswer: 0
  }
  ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Masukkan pilihan Anda!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h3>Pertanyaan ' + (index + 1) + ':</h3>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Kamu menjawab benar ' + numCorrect + ' dari jumlah pertanyaan sejumlah ' +
                 questions.length + ' yaa');
    return score;
  }
})();