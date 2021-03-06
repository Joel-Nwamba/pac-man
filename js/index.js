const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let score = 0;


//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

//create board

function createBoard() {
    for(let i = 0; i < layout.length; i++) {
        //create a square
        const square = document.createElement('div');
        //put square in grid
        // square.classList.add('square');
        grid.appendChild(square);
        //put squares in squares array
        squares.push(square);


        //if statements
        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if(layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if(layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if(layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    }
}

createBoard()

//up key - 38
// left - 37
// right - 39


//starting position of pacman 

let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pacman');

function control(e) {
    // if(e.keyCode === 40) {
    //     console.log('pressed down')
    // } else if(e.keyCode === 38) {
    //     console.log('pressed up')
    // } else if(e.keyCode === 37) {
    //     console.log('pressed left')
    // } else if(e.keyCode === 39) {
    //     console.log('pressed right')
    // }

    squares[pacmanCurrentIndex].classList.remove('pacman')

    switch(e.keyCode) {
        case 40:
            console.log('pressed down');
            if( !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
                ) 
                pacmanCurrentIndex += width;
            break;
            case 38:
                console.log('pressed up');
                if( !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    pacmanCurrentIndex - width >= 0
                    ) 
                    pacmanCurrentIndex -= width;
                break;
                case 37:
                    console.log('pressed left');
                    if( !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
                        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                        pacmanCurrentIndex % width !== 0
                        ) 
                        pacmanCurrentIndex -= 1
                        if(pacmanCurrentIndex === 364) {
                            pacmanCurrentIndex = 391;
                        }
                    break;
                    case 39:
                        console.log('pressed right');
                        if( !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
                            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                            pacmanCurrentIndex % width < width -1
                            ) 
                            pacmanCurrentIndex += 1;
                            if(pacmanCurrentIndex === 391) {
                                pacmanCurrentIndex = 364;
                            }
                        break;
                    }

                    squares[pacmanCurrentIndex].classList.add('pacman')
                    pacDotEaten()
                    powerPelletEaten()
                    checkForWin() 
                    gameOver()
        }
document.addEventListener('keyup', control);

function pacDotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.textContent = score;
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

function powerPelletEaten() {
     //if square pacman is in contains a power pellet
     if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
         squares[pacmanCurrentIndex].classList.remove('power-pellet')
          //add a score of 10
          score += 10;
          //change each of the four ghosts to isScared
          ghosts.forEach(ghost => ghost.isScared = true)
            //use setTimeout to unscare ghosts after 10 seconds 
            setTimeout(unScaredGhost, 10000)
     }
}

function unScaredGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghost in my grid

ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
});
//move the ghost

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    let directions = [-1, +1, +width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    // console.log(direction);


    ghost.timerId = setInterval(function() {

        //all my code
        if(
            !squares[ghost.currentIndex + direction].classList.contains('wall') && 
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                    //remove host
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //add direction to current index
        ghost.currentIndex += direction;
        //add ghost again
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        //if the ghost is currently iscared
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
       
        //if the ghost is current scared AND pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
                //remove classnames - ghost.className, 'ghost', 'scared-ghost'
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                 // change ghosts currentIndex back to its startIndex
                 ghost.currentIndex = startIndex
                  //add a score of 100
                  score += 100
                   //re-add classnames of ghost.className and 'ghost' to the ghosts new postion 
                   squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        gameOver()
    }, ghost.speed)
}

//check for gameover 
function gameOver() {
     //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
     if(
         squares[pacmanCurrentIndex].classList.contains('ghost') 
         && 
         !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
              //for each ghost - we need to stop it moving
              ghosts.forEach(ghost => clearInterval(ghost.timerId))
                //remove eventlistener from our control function
                document.removeEventListener('keyup', control)
                 //tell user the game is over   
                 scoreDisplay.textContent = 'You lose!!'

     }
}

//check for a win
function checkForWin() {
    if(score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.textContent = 'You Won!!!'
    }
}