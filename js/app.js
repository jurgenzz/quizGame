// initialization

var currentLevel = 0,
    answers = [],
    missingArray = [],
    name,
    right = [],
    leaderboards = false; // DB required! Change to 'true' to use leaderboards

// Game start
// If not using leaderbords and name is not required, 
// you can change this function, so it starts 'levels()' straight away

//initialize game

(function () {
    if (!leaderboards) {
        document.getElementById('game').innerHTML =
            '<h2>Get started!</h2>' +
            '<div class="game-window">' +
            '<div class="start">' +
            '<a class="btn btn-home" href="#" onclick="levels()">Get started</a>' +
            '</div>' +
            '</div>'
    } else {
        ajaxGet();
        document.getElementById('game').innerHTML =
            '<h2>Get started!</h2>' +
            '<div class="game-window">' +
            '<div id="left-game" class="start">' +
            '<input id="name" placeholder="enter your name">' +
            '<br>' +
            '<a class="btn btn-home" href="#" onclick="start()">Get started</a>' +
            '</div>' +
            '<div id="right-game"><h3>Leaderboards:</h3></div>' +
            '</div>'
    }
}())

//start of the game with leaderboards

function start() {
    name = document.getElementById('name').value;
    if (!name) {
        alert('Enter valid name');
    } else {
        levels();
    }
}

function levels() {

    // for each level
    // generate random number
    // for what is going to be missing
    
    function getRandomMissing(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var randomNumber = getRandomMissing(0, (level[currentLevel].ingredients.length - 1));

    // remove one random item from the list of answers

    var currentLevelList = _.without(level[currentLevel].ingredients, level[currentLevel].ingredients[randomNumber]);

    // what is missing on the current level?

    var missing = level[currentLevel].ingredients[randomNumber];
    missingArray.push(missing);

    // DOM setup for each level now
    var currentLevelNr = currentLevel;
    document.getElementById('game').innerHTML =
        '<h3>Level: ' + (currentLevelNr += 1) + '/' + level.length + '</h3>' +
        '<p>What is missing here? <br/>Cocktail: ' + level[currentLevel].name + '</p>' +
        '<div class="game-window">' +
        '<div id="left-game"></div>' +
        '<div id="right-game">' +
        '<input id="answer"> <br> <a href="#" onclick="checkAnswer()" class="btn btn-answer"> Next</a>' +
        '</div></div>';

    for (var i = 0; i < currentLevelList.length; i++) {
        document.getElementById('left-game').innerHTML = document.getElementById('left-game').innerHTML +
            '<span>' + currentLevelList[i] + '</span>'
    }
    
    // focus the input
    document.getElementById('answer').focus();
    $("#answer").autocomplete({
        source: autocompleteTags.sort()
    });

}

function checkAnswer() {
    var answer = document.getElementById('answer').value;
    if (!answer) {
        alert('Answer missing');
    } else {
        var index = _.indexOf(autocompleteTags, answer);
        console.log(index);
        if (index < 0) {
            alert('Looks like this ingredients does not exist!')
        } else {
            answers.push(answer); // store answer
            currentLevel++; // level up
            if (currentLevel >= level.length) {
                results();
            } else {
                levels();
            }
        }
    }
}

function results() {
    // DOM setup
    document.getElementById('game').innerHTML =
        '<h3>All done!</h3>' + '<div class="game-window">' +
        '<div id="left-game"></div>' +
        '<div id="right-game"></div></div>';

    // for each answer 

    for (var i = 0; i < answers.length; i++) {
        if (answers[i] === missingArray[i]) {
            document.getElementById('left-game').innerHTML = document.getElementById('left-game').innerHTML +
                ('<p><img src="img/success.png"><span>Level ' + (i + 1) +
                    ': <span class="answer">' + answers[i] + '</span></span><br>' +
                    '<span class="small">' +
                    '<strong>' + level[i].name + '</strong> <br>' +
                    level[i].ingredients.toString().replace(/,/g, '<br>') + '</p>');
            right.push(answers[i]);
        } else {
            document.getElementById('left-game').innerHTML = document.getElementById('left-game').innerHTML +
                (' <p><img src="img/wrong.png">' +
                    '<span title="name - ' + level[i].name + '\n' +
                    'Ingredients - ' + level[i].ingredients + '">Level ' +
                    (i + 1) + ': <span class="answer">' + answers[i] + '</span></span><br>' +
                    '<span class="small">' +
                    '<strong>' + level[i].name + '</strong> <br>' +
                    level[i].ingredients.toString().replace(/,/g, '<br>') +
                    '<span>What was missing? - ' + missingArray[i] + '</p>');
        }
    }

    // if leaderboards

    if (leaderboards) {
        ajaxPost(); // post new results
        ajaxGet(); // get leaderboards
        document.getElementById('right-game').innerHTML = 'You got <strong>' + right.length + '</strong> out of <strong>' +
            level.length + '</strong><br>' +
            ' <a href="#" onclick="startOver()" class="btn btn-answer"> Start over</a> <br /><br /> Latest results: <br/>';
    } else {
        document.getElementById('right-game').innerHTML = 'You got <strong>' + right.length + '</strong> out of <strong>' +
            level.length + '</strong><br>' +
            '<a href="#" onclick="startOver()" class="btn btn-answer"> Start over</a>';
    }



}

function startOver() {
    currentLevel = 0;
    missingArray = [];
    answers = [];
    right = [];
    levels();
}