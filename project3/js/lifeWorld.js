const lifeWorld = {
    init(numCols,numRows){
        this.numCols = numCols,
        this.numRows = numRows,
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
        this.randomSetup();
    },

    buildArray(){
        let outerArray = [];
        for (let row = 0; row<this.numRows; row++){
            let innerArray = [];
            for(let col = 0; col<this.numCols;col++){
                innerArray.push(0);
            }
            outerArray.push(innerArray);
        }
        return outerArray;
    },

    randomSetup(){
        for(let row = 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCols; col++){
                this.world[row][col] = 0;
                if(Math.random() < .15) {
                    this.world[row][col] = 1;
                }
            }
        }
    },

    getLivingNeighbors(row,col){
        if (row <= 0 || col <= 0 || row >= this.numRows - 1 || col >= this.numCols - 1) {
            return 0;
        }

        const directions = [
            [-1, 0],   // N
            [-1, 1],   // NE
            [0, 1],    // E
            [1, 1],    // SE
            [1, 0],    // S
            [1, -1],   // SW
            [0, -1],   // W
            [-1, -1]   // NW
        ];

        let livingNeighbors = 0;
        for (const [x, y] of directions) {
            if (this.world[row + x][col + y] === 1) {
                livingNeighbors++;
            }
        }

        return livingNeighbors;
    },

    step(){
        for (let row=0; row<this.numRows; row++) {
            for (let col=0; col<this.numCols; col++) {
                const livingNeighbors = this.getLivingNeighbors(row, col);

                if (this.world[row][col] === 1) {
                    if (livingNeighbors<2||livingNeighbors>3) {
                        this.worldBuffer[row][col] = 0;
                    } else {
                        this.worldBuffer[row][col] = 1;
                    }
                } else {
                    if (livingNeighbors === 3) {
                        this.worldBuffer[row][col] = 1;
                    } else {
                        this.worldBuffer[row][col] = 0;
                    }
                }
            }
        }
        let temp = this.world;
        this.world = this.worldBuffer;
        this.worldBuffer = temp;
    }
}