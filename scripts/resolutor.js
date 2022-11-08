var tableroSudoku = [];

//Funcion que se encarga de insertar valores para los inputs
//vacíos y los que tengan algún número
export function insertarValores() {
  const inputs = document.querySelectorAll("input");
  //Recorre los inputs existentes para comprobar cuales
  //están vacíos y cuales no
  inputs.forEach((input) => {
    if (input.value) {
      tableroSudoku.push(parseInt(input.value));
      input.classList.add("input_e1");
    } else {
      tableroSudoku.push(0);
      input.classList.add("empty_e1");
    }
  });
}

//Conversión de index de array 1D a fila y columna
function indexToRowCol(index) {
  return { row: Math.floor(index / 9), col: index % 9 };
}

//Conversión de valor de fila y columna a index de array 1D
function rowColToIndex(row, col) {
  return row * 9 + col;
}

//Funcion que se encarga de comprobar cuales son las elecciones posibles
function recibirElecciones(tableroSudoku, index) {
  var arrElecciones = [];
  for (var value = 1; value <= 9; value++) {
    if (esAceptable(tableroSudoku, index, value)) {
      arrElecciones.push(value);
    }
  }
  return arrElecciones;
}

//Funcion se encarga de comprobar si se cumplen las condiciones existentes
//para el sudoku
function esAceptable(tableroSudoku, index, value) {
  var { row, col } = indexToRowCol(index);
  //Si el valor ya se encuentra presente en la columna, no se puede aceptar
  for (var r = 0; r < 9; ++r) {
    if (tableroSudoku[rowColToIndex(r, col)] == value) return false;
  }
  //Si el valor ya se encuentra presente en la fila, no se puede aceptar
  for (var c = 0; c < 9; ++c) {
    if (tableroSudoku[rowColToIndex(row, c)] == value) return false;
  }
  //Si el valor ya se encuentra presente en el mismo cuadrado 3x3, no se puede aceptar
  var r1 = Math.floor(row / 3) * 3;
  var c1 = Math.floor(col / 3) * 3;
  for (var r = r1; r < r1 + 3; ++r) {
    for (var c = c1; c < c1 + 3; ++c) {
      if (tableroSudoku[rowColToIndex(r, c)] == value) return false;
    }
  }
  //Si se cumplen todas las condiciones, el valor pasa a ser aceptado
  return true;
}

//Función que retorna el valor de la celda con los mínimos movimientos posibles
function mejorMovimiento(tableroSudoku) {
  var index,
    moves,
    bestLen = 100;
  for (var i = 0; i < 81; ++i) {
    if (!tableroSudoku[i]) {
      var m = recibirElecciones(tableroSudoku, i);
      if (m.length < bestLen) {
        bestLen = m.length;
        moves = m;
        index = i;
        if (bestLen == 0) break;
      }
    }
  }
  return { index, moves };
}

//Funcion que se encarga de la resolución del sudoku
export function resolverSudoku() {
  var { index, moves } = mejorMovimiento(tableroSudoku);
  if (index == null) return true;
  for (var m of moves) {
    tableroSudoku[index] = m;
    if (resolverSudoku()) return true;
  }
  tableroSudoku[index] = 0;
  return false;
}

export function rellenarValores() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(function (input, i) {
    input.value = tableroSudoku[i];
  });
}
