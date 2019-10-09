// Our data is structured as two arrays. This has its trade-offs, but for what
// we're going to be doing I think the structural simplicity makes for easier
// manipulation and scaling

let truths = ['Woolly mammoths existed when the Great Pyramids were being built.', 'Pluto was discovered, named, made a planet and lost its status as a planet without ever making a full trip around the sun.', 'Humanity landed on the moon before it put wheels on luggage.', 'If you have 23 people in a room, there is a 50 percent chance that two of them have the same birthday.', 'Saudi Arabia imports camels from Australia.', 'In 1919, a wave of molasses 25 feet high swept through Boston, killing 21 people.', 'Dolphins are born with hair.', 'If you shuffle a deck of cards, odds are that no one has ever had a deck with the same order.', 'Corn byproducts are used to manufacture batteries, crayons and laundry detergent.', 'Most of humanity lives in the northern hemisphere.', 'Cashew nuts grow inside cashew apples, which are also edible.', 'The macaw species from the "Rio" movies has been declared extinct in the wild.', 'Pokemon is the highest-grossing media franchise in the world.', 'Garfield the cat is named after former president James Garfield.', 'Some species of bamboo can grow up to 35 inches per day.', 'The Canadian mint once produced a $1 million coin. It was stolen and has not been recovered.', 'The wisdom that breakfast is the most important meal of the day was coined to sell more breakfast food.'];

let lies = ['On average, people swallow eight spiders in their sleep each year.', 'Blood is blue until it makes contact with air.', 'Dogs can\'t look up.', 'If you touch a baby bird, its parents will abandon it.', 'There are more stars in the Milky Way than trees on Earth.', '60 percent of fish are left-finned.', 'Cows produce 5 percent more milk when they are given cheese.', 'Microwaves cook food from the inside out.', 'Abner Doubleday invented baseball.', 'The Great Wall of China is the only human-made object visible from space.', 'In the southern and northern hemispheres, vacuum-cleaner brushes spin in opposite directions.', 'Macaroni pasta is named after the Italian diemaker who popularized the shape.','The B battery standard was abolished in 1979 after the American National Standards Institute deemed "B battery" too hard to say.', 'The author of Dumbo was inspired to write the famous story after seeing a large-eared child in an elephant costume.', 'A Microsoft executive suggested the name "Bing" for the company\'s search engine after their phone went off during a meeting.', 'Floridians have 12 words for "alligator."', 'Jupiter has five seasons.', 'Lemons are ripe limes.', 'Prince Charles once won a snail race by cheating.', 'If you push a crosswalk button multiple times, the light will change faster.', 'Early speedbumps were painted to look like road debris.', 'Granite is named after the Andalusian province of Granada, which has an abundance of the rock.', 'April Fools\' Day was originally proposed for the last day in April.', 'Tolstoy\'s "War and Peace" was originally titled "War, What is it Good For?"', 'Sharks don\'t get cancer.', 'Eating celery burns calories.', 'Dr. Dre has a Ph.D. in political science.', 'In a nod to entrepreneur Elon Musk, Elon University briefly changed its mascot to a muskrat.', 'In the original "Star Wars", all of the stormtroopers were voiced by Mark Hammill.', 'Fettucini Alfredo was invented by a Frenchman.', 'The town of Love, Texas, has the highest per-capita divorce rate in the United States.', 'The first image posted to the Internet was a picture of a cat.', 'A woman in Sheboygan, Wisconsin, holds the record for the world\'s longest CVS receipt, at 47 feet.', '"Gilligan\'s Island" was originally intended to be a movie called "A Three-Hour Tour."', 'Eggshells have greater nutritional content than the yolk and white combined.', 'Sand is called "sand" because it\'s between the sea and the land.', 'Danny Devito and Jason Alexander are cousins.', 'More novels were written in 1977 than at any point in the past 50 years.', 'Crows are the only bird with a sense of smell.', 'Giraffe necks are getting shorter.', 'Chocolate milk comes from brown cows.', 'Pepsi got its name from an early advertising campaign that told consumers the soda "Gives you pep, see?"', 'Pizza is becoming less popular.', 'The singular form of macaroni is macaruno.', 'In Vermont, it\'s illegal to verbally harass caterpillars.', 'Ironically, "gullible" has its origins in a Saxon word meaning "wise".', 'This one is the true one.', 'Benjamin Franklin invented the charcoal grill.', '"Slather" is a portmanteau of "sauce" and "lather".'];

// Additionally, we want to declare two other global variables:
// The current question number and the player's current score

let questionNumber = 0;
let currentScore = 0;

// We're going to need to do a fair bit of array shuffling. After some
// research, it looks like the de facto standard for that is something called the 
// Durstenfeld shuffle, so thank you Mr. Durstenfeld and let's get shuffling

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function startQuiz() {

    // Listen on main for a click on the button classed 'js-press-start'
    $('main').on('click', '.js-press-start', function(event) {
        
        // When it comes, generate the scoreboard
        generateScoreboard();
        // and a question
        generateQuestion();
        // and hide the intro card
        $('.js-intro-card').hide();
    });
};

function generateScoreboard() {
    
    // Our HTML string for our scoreboard
    let htmlString = `<ul>
        <li aria-labelledby="scoreboard">
        QUESTION <span class="question-number js-question-number">${questionNumber}</span> OUT OF 5
        </li>
        <li aria-labelledby="scoreboard">
        SCORE: <span class="user-score js-user-score">${currentScore}</span> OUT OF 5
        </li>
    </ul>`;

    // Set the HTML of all items classed .js-scoreboard, in this case a section, 
    // to our htmlString
    $('.js-scoreboard').html(htmlString);
};

function generateQuestion() {

    // First, we want to check the question number. We need to do this here
    // because it's the only function that's going to fire every round, 
    // and we want to do it before we increment the number. If we've
    // gotten through five questions, end the game; else,

    if (questionNumber === 5) {
        gameOver();
    } else {

    // Increment the question counter
    incrementQuestion();

    // Shuffle our truths and lies
    shuffle(truths);
    shuffle(lies);

    // Grab three lies and a truth and make a new array from them. 
    // In order for the truth to prevail, it must be known far and wide
    let threeLies = lies.splice(0, 3);
    theTruth = truths.pop();
    let threeLiesAndTheTruth = threeLies.concat(theTruth);

    // And then shuffle that so that the last answer isn't always
    // the correct answer
    shuffle(threeLiesAndTheTruth);

    // The HTML string for our quiz question
    let htmlString = `<form class="js-question-form">
    <fieldset>
        <legend class="question">Which of the following is true?</legend>
        <input type="radio" name="choice" id="option-one" value="0" aria-checked="false" required>
        <label for="option-one">${threeLiesAndTheTruth[0]}</label>
        <br>
        <input type="radio" name="choice" id="option-two" value="1" aria-checked="false" required>
        <label for="option-two">${threeLiesAndTheTruth[1]}</label>
        <br>
        <input type="radio" name="choice" id="option-three" value="2" aria-checked="false" required>
        <label for="option-three">${threeLiesAndTheTruth[2]}</label>
        <br>
        <input type="radio" name="choice" id="option-four" value="3" aria-checked="false" required>
        <label for="option-four">${threeLiesAndTheTruth[3]}</label>
        <button type="submit" class="submit-answer js-submit-answer">SUBMIT ANSWER</button>
    </fieldset></form>`

    // Make the content of the section classed '.js-question-area' the string above
    $('.js-question-area').html(htmlString);
    };
};

function checkAnswer() {
    
    // Listen for a click on the 'submit answer' button 
    $('main').on('submit', '.js-question-form', (function(event) {
        
        // Prevent form submit
        event.preventDefault();

        // When it comes, check to see if the label associated with the
        // selection is theTruth and give the user the appropriate response
        if ($('[name=choice]:checked').next('label').text() === theTruth) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    }));
};

function correctAnswer() {

    // Hide the question form and display the answer
    $('.js-question-form').hide();
    $('.js-answer-area').show();

    // Increment the score by 1
    incrementScore();

    // The HTML string for our answer screen
    let htmlString = `<section>
    <h2>True</h2>
    <span class="answer js-answer">That's right! <a href="https://www.google.com/search?q=${theTruth}" target="_blank">${theTruth}</a></span>
    <button type="button" class="thank-u-next js-thank-u-next">NEXT</button>
</section>`

    // Congratulate the user
    $('.js-answer-area').html(htmlString);

};

function incorrectAnswer() {

    // Hide the question form and display the answer
    $('.js-question-form').hide();
    $('.js-answer-area').show();

    // The HTML string for our answer screen
    let htmlString = `<section>
    <h2>False</h2>
    <span class="answer js-answer">Sorry! The truth is: <a href="https://www.google.com/search?q=${theTruth}" target="_blank">${theTruth}</a></span>
    <button type="button" class="thank-u-next js-thank-u-next">NEXT</button>
</section>`

    // Console the user and tell them the truth
    $('.js-answer-area').html(htmlString);

};

function nextQuestion() {
    // This function should listen on the next question button for a click, hide the answers pane and generate a new question

    $('main').on('click', '.js-thank-u-next', (function(event) {
        $('.js-answer-area').hide();
        $('.js-question-form').show();
        generateQuestion();
        console.log('nextQuestion firing.');    
    }))
};


function gameOver() {

    // The HTML string for our results screen
    let htmlString = `<section>
    <h2 class="results">Results</h2>
    <span class="total-score js-total-score">You found truth ${currentScore * 20} percent of the time. Thanks for playing! Play again for new questions!</span>
    <button type="button" class="restart-quiz js-restart-quiz">PLAY AGAIN</button>
    </section>`

    // Set the HTML of the results area to be the string above and show it,
    // while hiding the answer area and question area
    $('.js-results-area').html(htmlString);
    $('.js-answer-area').hide();
    $('.js-question-area').hide();
    $('.js-results-area').show();
        
    // Call restartQuiz so we can listen for a click on the restart button
    restartQuiz();
};

function restartQuiz() {

    // Listen for a click on the restart quiz button. When it comes,
    $('main').on('click', '.js-restart-quiz', (function(event) {
        
        // If we don't have enough truths or lies left to populate
        // a new set of five questions, reload the page to repopulate
        // the arrays, else
        if (truths.length < 5 || lies.length < 15) {
            window.location.reload();
        } else {
            
        // Reset the score and question counters
        resetScore();
        questionNumber = 0;

        // Generate a new question
        generateQuestion();

        // Hide the results area and show the question area
        $('.js-results-area').hide();
        $('.js-question-area').show();
        }
    }))   
};


function incrementQuestion() {
    
    // Add one to the question number
    questionNumber++;

    // Update the element
    $('.js-question-number').text(questionNumber);
};

function incrementScore() {
    
    // Add one to the score
    currentScore++;

    // Update the element
    $('.js-user-score').text(currentScore);
};

function resetScore() {
    
    // Reset the score counter
    currentScore = 0;

    // Update the element
    $('.js-user-score').text(currentScore);
}

function runQuiz() {
    startQuiz();
    checkAnswer();
    nextQuestion();
};

$(runQuiz);