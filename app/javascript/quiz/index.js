var currentTab = 0; // Current tab is set to be the first tab (0)
var answers = []; // array to store all answers, they can be blank

// Display the current tab
document.addEventListener('DOMContentLoaded', () => {
  alert('Running quiz.js');
  showTab(currentTab);
});

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
prevBtn.addEventListener('click', () => nextPrev(-1));
nextBtn.addEventListener('click', () => nextPrev(1));

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
  } else {
      document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
      document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
};

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Hide the current tab:
  x[currentTab].style.display = "none";

  //create answer object and push to a list of answers
  var cardData = JSON.parse(x[currentTab].dataset.card);
  cardData.attempt = x[currentTab].querySelector('input').value
  answers.push(cardData);
  
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;

  // if you have reached the end of the form... 
  if (currentTab >= x.length) {
    // change buttons
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("continueBtn").style.display = "inline";
    document.getElementById("quitBtn").style.display = "inline";
    
    post('results', { 'responses': answers })
      .then(data => {
        console.log(JSON.stringify(data));
        buildTable(data);
      })
      .catch(err => console.error(err));
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // important for backend
    },
    body: JSON.stringify(data) // serialize it!
  })
  .then(response => response.json());
}

// TODO: make a prettier table >.<
// TODO: continue button and quit button
function buildTable(drilldown) {
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');

  var tr = document.createElement('tr');
  var h1 = document.createElement('th');
  h1.innerHTML = 'Result';
  tr.appendChild(h1);
  var h2 = document.createElement('th');
  h2.innerHTML = 'Question';
  tr.appendChild(h2);
  var h3 = document.createElement('th');
  h3.innerHTML = 'Answer';
  tr.appendChild(h3);
  var h4 = document.createElement('th');
  h4.innerHTML = 'Attempt';
  tr.appendChild(h4);
  tbody.appendChild(tr);

  drilldown.forEach(element => {
    var tr = document.createElement('tr');
    
    var correct = document.createElement('td');
    correct.innerHTML = element.correct;
    var question = document.createElement('td');
    question.innerHTML = element.question;
    var answer = document.createElement('td');
    answer.innerHTML = element.answer;
    var attempt = document.createElement('td');
    attempt.innerHTML = element.attempt;
    
    tr.appendChild(correct);
    tr.appendChild(question);
    tr.appendChild(answer);
    tr.appendChild(attempt);

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  
  var x = document.getElementsByClassName('tab');

  // remove all child elements first
  while (x[0].firstChild) {
    x[0].removeChild(x[0].firstChild);
  }

  x[0].appendChild(table);
  x[0].style.display = 'block';
}
