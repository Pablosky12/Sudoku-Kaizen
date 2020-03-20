import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCellValue } from "./actions";
import Button from "react-bootstrap/Button";

import "./Keyboard.css";

// returns true if board is valid, false otherwise
const validInput = (board, indexRegion, indexCell, value) => {
  let errores = [];
  if (value !== null) {
    // Checking the square
    let x2;
    for (x2 = 0; x2 < 9; ++x2) {
      if (x2 !== indexCell && board[indexRegion][x2].value === value) {
        console.log("Toy en el primer if");
        return false;
      }
    }

    // Cheking row
    let startRegion = Math.floor(indexRegion / 3) * 3;
    for (let region = startRegion; region < startRegion + 3; region++) {
      var startCell = Math.floor(indexCell / 3) * 3;
      for (let cell = startCell; cell < startCell + 3; cell++) {
        if (
          (cell !== indexCell || region !== indexRegion) &&
          value === board[region][cell].value
        ) {
          console.log("Toy en el Segundo if");
          return false;
        }
      }
    }

    // Checking column
    startRegion = Math.floor(indexRegion % 3);
    for (let region = startRegion; region < startRegion + 7; region += 3) {
      const startCell = Math.floor(indexCell % 3);
      for (let cell = startCell; cell < startCell + 7; cell += 3) {
        if (
          (cell !== indexCell || region !== indexRegion) &&
          value === board[region][cell].value
        ) {
          console.log("Toy en el tercer if");
          return false;
        }
      }
    }
  }
  return true;
};

function Keyboard() {
  const board = useSelector(state => state.board);
  const selectedRegion = useSelector(state => state.selectedCell.region);
  const selectedCell = useSelector(state => state.selectedCell.cell);
  const editable = useSelector(state => state.selectedCell.editable);

  const dispatch = useDispatch();

  let onClick;
  if (editable) {
    onClick = ({ target: { value } }) => {
      let parsedValue = parseInt(value);
      parsedValue = Number.isNaN(parsedValue) ? null : parsedValue;
      console.log("Estoy dentro del callback", "value: ", parsedValue);
      dispatch(
        setCellValue(
          parsedValue,
          validInput(board, selectedRegion, selectedCell, parsedValue)
        )
      );
    };
  } else {
    onClick = () => {};
  }

  return (
    <div className="container">
      <div className="row1">
        <Button variant="light" value={1} onClick={onClick}>
          1
        </Button>
        <Button variant="light" value={2} onClick={onClick}>
          2
        </Button>
        <Button variant="light" value={3} onClick={onClick}>
          3
        </Button>
      </div>
      <div className="row2">
        <Button variant="light" value={4} onClick={onClick}>
          4
        </Button>
        <Button variant="light" value={5} onClick={onClick}>
          5
        </Button>
        <Button variant="light" value={6} onClick={onClick}>
          6
        </Button>
      </div>
      <div className="row3">
        <Button variant="light" value={7} onClick={onClick}>
          7
        </Button>
        <Button variant="light" value={8} onClick={onClick}>
          8
        </Button>
        <Button variant="light" value={9} onClick={onClick}>
          9
        </Button>
      </div>
      <div className="row4">
        <Button
          variant="primary"
          value={null}
          onClick={onClick}
          className="buttonClear"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Keyboard;
