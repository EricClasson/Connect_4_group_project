import WinCheck from "./WinCheck.js";
import MakeMoveCheck from "./MakeMoveCheck.js";
import { Fragment } from "react";

export default class Board {
    matrix: string[][];
    currentPlayer: string;
    winCheck: WinCheck;
    MakeMoveCheck: MakeMoveCheck;

    constructor() {
        this.matrix = [...new Array(6)].map((_row) => [...new Array(7)].map((_column) => " "));
        this.currentPlayer = "Red";
        this.winCheck = new WinCheck(this.matrix, this.currentPlayer);
        this.MakeMoveCheck = new MakeMoveCheck(this.matrix, this.currentPlayer);
    }

    render() {
        return (
            <div className="board">
                {this.matrix.map((row, rowIndex) => (
                    <Fragment key={rowIndex}>
                        {row.map((column, columnIndex) => (
                            <div key={columnIndex} className={"column " + column}>
                                {rowIndex} , {columnIndex}
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        );
    }

    makeMove(column: number): boolean {
        const success = this.MakeMoveCheck.makeMove(column);
        if (success) {
            this.currentPlayer = this.currentPlayer === "Red" ? "Yellow" : "Red";
            this.winCheck = new WinCheck(this.matrix, this.currentPlayer);
            this.MakeMoveCheck = new MakeMoveCheck(this.matrix, this.currentPlayer);
        }
        return success;
    }

    checkForWin(): boolean {
        return this.winCheck.checkForWin();
    }

    draw(): boolean {
        return this.matrix[0].every((cell) => cell !== " ");
    }
}
