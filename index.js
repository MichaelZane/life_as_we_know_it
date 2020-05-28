
// set up canvas to be used
const canvas = document.querySelector('canvas')
const getCtx = canvas.getContext('2d')



const resolution = 10
canvas.width = 700
canvas.height = 700

const makeRows = canvas.width / resolution
const makeCols = canvas.height / resolution
//Grid to display cells.

let grid



function makeGrid(empty=false) {
    
    return new Array(makeCols).fill(null)
        .map(() => new Array(makeRows).fill(null)
            .map(() => empty ? 0 : Math.floor(Math.random() * 2)))

}

grid = makeGrid()

let playing = true

let generation = 0

speed = 400

requestAnimationFrame(updateGrid)

function updateGrid() {
    if (playing) {
        setTimeout(() => {
        
        newGrid()

        gridMaker()
        
        requestAnimationFrame(updateGrid)
        }, speed)
        
    } 
    generation++
    genCount() 
    
}

//Make a double buffer to swap 

//making copy of grid to update and switch
function newGrid() {
    const newGrid = grid.map(arr => [...arr])

    for(let column = 0; column < grid.length; column++) {
        for(let row = 0; row < grid[column].length; row++) {
            const cell = grid[column][row]

        //loop through the neighbors 
            let amtOfNeighbors = 0
            for(let neighbors = -1; neighbors < 2; neighbors++) {
                for(let nextNeighbors = -1; nextNeighbors < 2; nextNeighbors++) {
                    if(neighbors === 0 && nextNeighbors === 0) {
                        continue
                    }
                    // have to check the edges -- of grid
                    const column_cell = column + neighbors
                    const row_cell = row + nextNeighbors

                    if(column_cell >= 0 && row_cell >= 0 && column_cell < makeCols && row_cell < makeRows) {
                        const currentNeighbor = grid[column + neighbors][row + nextNeighbors]
                        amtOfNeighbors += currentNeighbor
                    }

                    
                }
            }
        //check to see if cell is alive or dead GOL rules
            if(cell === 1 && amtOfNeighbors < 2) {
                newGrid[column][row] = 0
                
            } else if(cell === 1 && amtOfNeighbors > 3) {
                newGrid[column][row] = 0
                
            } else if(cell === 0 && amtOfNeighbors === 3) {
                newGrid[column][row] = 1
                
            }  
            
        }  
    }  
    grid = newGrid
    
    
}


function gridMaker() {
    
    for(let column = 0; column < grid.length; column++) {
        for(let row = 0; row < grid[column].length; row++) {
            const cell = grid[column][row]
            
            getCtx.beginPath()
            getCtx.rect(column * resolution, row * resolution, resolution, resolution)
            getCtx.fillStyle = cell ? "#0caaea" : "#00000d"
            getCtx.fill()
            getCtx.stroke()
        }
    }
    
}
function genCount(){
    
    document.getElementById("counter").innerHTML = generation
   
}


function pause() {
    
    playing = !playing

    if(playing == true) {

        updateGrid()
    }
}

function clearGrid(){
    
    grid = makeGrid(true)
    genCount()
    gridMaker()
    if(!playing){
        generation = 0
    }
    genCount()
}

function resetGame() {

    grid = makeGrid(false)
    generation = 0
    gridMaker()
    

}

function speedUp() {
    speed -= 50
}

function slowDown() {
    speed += 50
}

canvas.addEventListener("click", canvasClick)

function canvasClick(event) {
  // mouse down for click event and marks the cell alive or dead  
    if(playing) {
        playing = false
    }

    let rowClicked = Math.floor(event.layerX / 10)
    let colClicked = Math.floor(event.layerY / 10)

    grid[rowClicked][colClicked] = 1
    
    gridMaker()
    console.log(rowClicked, colClicked)
}






    
