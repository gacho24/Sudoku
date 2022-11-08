export function pintarTablero() {
  const tableroSudoku = document.querySelector("#sudoku");
  const NUM_CASILLAS = 81;

  var inputElement = null;
  for (var i = 0; i < NUM_CASILLAS; i++) {
    inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");
    //Se añade una clase sección impar a aquellos que se encuentren
    //en una seccion 3x3
    if (
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
      ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
      inputElement.classList.add("seccion_impar");
    }
    //Se añaden los inputs generados al tablero del sudoku
    tableroSudoku.appendChild(inputElement);
  }
}
