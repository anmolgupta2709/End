var gameboard = document.getElementById('gameboard');
var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
var win_tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
var emptyTile = { row: 4, col: 4 }; // position of empty tile

function renderTiles() {
    gameboard.innerHTML = '';
    for (var i = 0; i < tiles.length; i++) {
        var tile = document.createElement('div');
        tile.className = 'tile';

        if (tiles[i] === 0) {
            tile.id = 'empty';
            tile.innerHTML = '';
        } else {
            tile.addEventListener('click', moveTile);
            tile.innerHTML = tiles[i];
        }
        gameboard.appendChild(tile);
    }
}

function shuffleTiles() {
    // randomize tiles
    for (var i = 0; i < tiles.length; i++) {
        var randomIndex = Math.floor(Math.random() * tiles.length);
        var temp = tiles[i];
        tiles[i] = tiles[randomIndex];
        tiles[randomIndex] = temp;
    }
    // look for 0 in tiles and set emptyTile
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] === 0) {
            emptyTile = { row: Math.floor(i / 4) + 1, col: (i % 4) + 1 };
            break;
        }
    }

    // check if solvable
    var inversions = 0;
    for (var i = 0; i < tiles.length; i++) {
        for (var j = i + 1; j < tiles.length; j++) {
            if (tiles[i] > tiles[j]) {
                inversions++;
            }
        }
    }
    if (inversions % 2 !== 0) {
        shuffleTiles();
    }
    renderTiles();
}

function moveTile() {
    var tile = this;
    var tileIndex = tiles.indexOf(parseInt(tile.innerHTML));
    var emptyTileIndex = tiles.indexOf(0);
    var tilePos = { row: Math.floor(tileIndex / 4) + 1, col: (tileIndex % 4) + 1 };
    if (isAdjacent(tilePos, emptyTile)) {
        swapTiles(tileIndex, emptyTileIndex);
        emptyTile = tilePos;
    }
    renderTiles();
    if (checkWin()) {
        alert('You win!');
    }
}

function isAdjacent(tilePos1, tilePos2) {
    var rowDiff = Math.abs(tilePos1.row - tilePos2.row);
    var colDiff = Math.abs(tilePos1.col - tilePos2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapTiles(tile1, tile2) {
    // change the order of tiles array
    var temp = tiles[tile1];
    tiles[tile1] = tiles[tile2];
    tiles[tile2] = temp;
}

function checkWin() {
    // check if tiles is equal to win_tiles
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] !== win_tiles[i]) {
            return false;
        }
    }
    return true;
}

renderTiles();