// Questions and Answers
const questions = [
    {
      question: "What does HTML stand for?",
      answers: ["Hyper Text Markup Language", "Hot Mail", "Hyperlinks Text Management Language", "Home Tool Markup Language"],
      correct: 0
    },
    {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
      correct: 0
    },
    {
      question: "What does JavaScript do?",
      answers: ["Adds interactivity to websites", "Styles the website", "Creates server-side logic", "All of the above"],
      correct: 0
    },
    {
      question: "Which tag is used for the largest heading in HTML?",
      answers: ["<h1>", "<h6>", "<header>", "<head>"],
      correct: 0
    },
    {
      question: "Which CSS property is used to change text color?",
      answers: ["color", "text-color", "font-color", "text-style"],
      correct: 0
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // DOM Elements
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreEl = document.getElementById("score");
  const feedbackEl = document.getElementById("feedback");
  
  // Display a question
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.dataset.index = index;
      button.onclick = selectAnswer;
      answersEl.appendChild(button);
    });
  }
  
  // Handle answer selection
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const selectedIndex = parseInt(selectedBtn.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.correct) {
      selectedBtn.style.backgroundColor = "lightgreen";
      score++;
    } else {
      selectedBtn.style.backgroundColor = "lightcoral";
    }
    
    // Disable all buttons after selection
    Array.from(answersEl.children).forEach(button => {
      button.disabled = true;
      if (parseInt(button.dataset.index) === currentQuestion.correct) {
        button.style.backgroundColor = "lightgreen";
      }
    });
    
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  }
  
  // Move to the next question
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      submitBtn.classList.remove("hidden");
      nextBtn.classList.add("hidden");
    } else {
      showScore();
    }
  }
  
  // Display the final score
  function showScore() {
    document.getElementById("quiz").classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreEl.textContent = score;
    feedbackEl.textContent = score >= 3 ? "Great job!" : "Keep practicing.";
  }
  
  // Start the quiz
  showQuestion();
  
  // Event Listeners
  submitBtn.addEventListener("click", () => {
    const selected = answersEl.querySelector("button[style]");
    if (!selected) {
      alert("Please select an answer!");
    }
  });
  nextBtn.addEventListener("click", nextQuestion);
  