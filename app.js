// tags for input field

var availableTags = [
    "vodka",
    "peach snaps",
    "orange juice",
    "cranberry juice",
    "bacardi",
    "simple syrup",
    "lime wedges",
    "soda",
    "mint leaves",
    "banana liqueur",
    "malibu",
    "banana",
    "strawberries",
    "pina colada mix",
    "sweet & sour mix",
    "7up",
    "lime juice",
    "strawberry mix",
    "pineapple juice",
    "havana club",
    "amaretto",
    "grenadine",
    "morgan spiced",
    "angostura bitters",
    "cockburns port",
    "blue curacao",
    "ginger beer",
    "vanilla syrup",
    "monin syrup",
    "cointreau",
    "margarita mix",
    "blackberries",
    "blueberries",
    "raspberries",
    "grand marnier",
    "tequila",
    "mango puree"


];

// name of the cocktail and ALL ingredients for cocktails

var level = [
    {
        name: 'Sex on the beach',
        ingredients: ['vodka', 'orange juice', 'cranberry juice', 'peach snaps']

    },
    {
        name: 'Mojito',
        ingredients: ['bacardi', 'simple syrup', 'lime wedges', 'soda', 'mint leaves']
    },
    {
        name: 'Banana berry colada',
        ingredients: ['banana liqueur', 'malibu', 'banana', 'strawberries', 'pina colada mix']
    },
    {
        name: 'Fruitapalooza',
        ingredients: ['banana liqueur', 'malibu', 'sweet & sour mix', 'strawberry mix', '7up']
    },
    {
        name: 'Strawberry daiquiri',
        ingredients: ['bacardi', 'lime juice', 'strawberry mix']
    },
    {
        name: 'Pickled Tink',
        ingredients: ['vodka', 'pina colada mix', 'strawberry mix']
    },
    {
        name: 'Hurricane',
        ingredients: ['orange juice', 'mango puree', 'pineapple juice', 'bacardi', 'havana club', 'amaretto', 'grenadine']
    },
    {
        name: 'Port of mischief',
        ingredients: ['morgan spiced', 'angostura bitters', 'cockburns port', 'pineapple juice', 'lime juice']
    },
    {
        name: 'Big kablue-na',
        ingredients: ['malibu', 'blue curacao', 'pina colada mix', 'mint', 'lime juice']
    },
    {
        name: 'Island spice',
        ingredients: ['morgan spiced', 'ginger beer', 'vanilla syrup', 'angostura bitters']
    },
    {
        name: 'Bahama mama',
        ingredients: ['bacardi', 'malibu', 'banana liqueur', 'pineapple juice', 'orange juice']
    },
    {
        name: 'Pina Colada',
        ingredients: ['bacardi', 'malibu', 'banana liqueur', 'pina colada mix']
    },
    {
        name: 'Rock & roll punch',
        ingredients: ['morgan spiced', 'monin syrup', 'orange juice', '7up', 'havana club', 'sweet & sour mix']
    },
    {
        name: 'Shake rattle and rum',
        ingredients: ['bacardi', 'amaretto', 'angostura bitters', 'orange juice', 'pineapple juice']
    },
    {
        name: 'Watermelon rita',
        ingredients: ['tequila', 'cointreau', 'monin syrup', 'margarita mix']
    },
    {
        name: 'Mixed berry rita',
        ingredients: ['tequila', 'cointreau', 'blackberries', 'blueberries', 'raspberries', 'margarita mix']
    },
    {
        name: 'Red rocker',
        ingredients: ['tequila', 'amaretto', 'cranberry juice', 'margarita mix']
    }
    ,
    {
        name: 'Triple platinum margarita',
        ingredients: ['tequila', 'cointreau', 'grand marnier', 'margarita mix']
    }
];

// setup
var currentAnswers = [];
var answers = [];
var currentLevel = 0;
var levelIngredients;
var newIngredients;
var wrong = [];
var right = [];
var name;
// level up!

function start() {
    name = document.getElementById('name').value;
    if(!name) {
        alert('enter your name please!')
    }else {
        getStarted();
    }

}

function getStarted() {
    levelIngredients = level;

    // get random ingredient

    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //generate new ingredients - missing one
    newIngredients = levelIngredients[currentLevel].ingredients;
    var randomNumber = getRandomIntInclusive(0, (levelIngredients[currentLevel].ingredients.length - 1));
    console.log(randomNumber);



    var missing = levelIngredients[currentLevel].ingredients.slice(randomNumber, randomNumber + 1);
    newIngredients.splice(randomNumber, 1);

    // current level ingredients and missing one
    currentAnswers.push({
        ingredients: newIngredients,
        missing: missing
    });
    console.log(currentAnswers);



    currentLevelName = (currentLevel);

    // DOM setup
    document.getElementById('game').innerHTML =
        '<h3>Level: ' + (currentLevelName += 1) + '</h3>' +
        '<p>What is missing here? <br/>Cocktail: ' + level[currentLevel].name + '</p>' +
        '<div class="game-window">' +
        '<div id="left-game"></div>' +
        '<div id="right-game"></div></div>';

    // for each ingreadient
    for (i = 0; i < newIngredients.length; i++) {

        var list = document.createElement('SPAN'); //create span

        var ingredients = document.createTextNode(newIngredients[i]) //get ingredient

        list.appendChild(ingredients); //put ingredient in the span

        document.getElementById('left-game').appendChild(list); //put span in the game
    }

    // input and button for next level
    document.getElementById('right-game').innerHTML = '<input id="answer"> <br> <a href="#" onclick="checkAnswer()" class="btn btn-answer"> Next</a>'

    // autocomplete for input field
    $("#answer").autocomplete({
        source: availableTags
    });
}

// game ends, get results

function results() {


    // DOM setup
    document.getElementById('game').innerHTML =
        '<h3>All done!</h3>' +
        '<p>Your results:</p>' +
        '<div class="game-window">' +
        '<div id="left-game"></div>' +
        '<div id="right-game"></div></div>';

    // for each answer
    for (i = 0; i < answers.length; i++) {
        //        var list = document.createElement('SPAN');
        //        var ingredients;

        // if answer is right
        level[i].ingredients.push(currentAnswers[i].missing[0]);

        if (answers[i] === currentAnswers[i].missing[0]) {
            document.getElementById('left-game').innerHTML = document.getElementById('left-game').innerHTML + ('<p><img src="http://www.nexcius.net/wp-content/uploads/2013/05/success_512.png"><span title="name - ' + level[i].name + '\n' +
            'Ingredients - ' + level[i].ingredients + '">Level ' + (i + 1) +
            ': <span class="answer">' + answers[i] + '</span></span></p>');
            right.push(answers[i])

            // what if not?
        } else {
            document.getElementById('left-game').innerHTML = document.getElementById('left-game').innerHTML + (' <p><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Deletion_icon.svg/240px-Deletion_icon.svg.png">' +
            '<span title="name - ' + level[i].name + '\n' +
            'Ingredients - ' + level[i].ingredients + '">Level ' +
            (i + 1) + ': <span class="answer">' + answers[i] + '</span></span></p>');
            wrong.push(answers[i])
        }


        // you got this out of this right



    }
    ajax();
    ajaxGet();
    document.getElementById('right-game').innerHTML = 'You got <strong>' + right.length + '</strong> out of <strong>' + level.length + '</strong><br>' +
    ' <a href="#" onclick="startOver()" class="btn btn-answer"> Start over</a> <br /><br /> Latest results: <br/>';



}

// when pressing next level

function checkAnswer() {

    // store answer

    var answer = document.getElementById('answer').value;
    if(!answer) {
        alert('you did not answer, did you?')
    }else {
        answers.push(answer);
        currentLevel++; //next level
        if (currentLevel >= level.length) {
            results(); // if no more levels
        } else {
            getStarted(); //run game on the next level
        }
    }
}

//start over


function startOver() {
    answers = [];
    right = [];
    wrong = [];
    currentAnswers = [];
    currentLevel = 0;
    getStarted();
}

function ajaxGet() {
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/cocktails/collections/results?apiKey=4MmcxwAO0pGJo22EHw8wYjeq-V5zO28a",
        type: "GET",
        success: function (data) {
            console.log(data.length)
            var length  = data.length;
            for (var i = length-1; i >= 0; i--) {
                console.log(i);
                document.getElementById('right-game').innerHTML = document.getElementById('right-game').innerHTML + '<span class="score">' + data[i].person + ': ' + data[i].score +'</span>';
            }
        }
    })
}

function ajax() {
    console.log('ajax');
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/cocktails/collections/results?apiKey=4MmcxwAO0pGJo22EHw8wYjeq-V5zO28a",
        data: JSON.stringify({
            person: name,
            score: (right.length + '/' + level.length)
        }),
        type: "POST",
        contentType: "application/json"
    });

}

ajaxGet();