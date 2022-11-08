import { resolverSudoku, insertarValores, rellenarValores } from "./resolutor.js";
import { pintarTablero } from "./pintarTablero.js";

const solveButton = document.querySelector("#btn_solve");
const clearButton = document.querySelector("#btn_clear");

main();

function main() {
  pintarTablero();
  solveButton.addEventListener("click", function () {
    insertarValores();
    if (resolverSudoku()) {
      rellenarValores();
    } else {
      alert("No soy capaz de realizar el sudoku");
    }
  });
  clearButton.addEventListener("click", function () {
    window.location.reload(true);
  });
}
