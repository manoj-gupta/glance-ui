import React from "react";
import "./mine-sweeper.css";

class Cell extends React.Component {
  getValue() {
    if (!this.props.value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (this.props.value.isMine) {
      return "💣";
    }
    if (this.props.value.neighbour === 0) {
      return null;
    }
    return this.props.value.neighbour;
  }

  render() {
    let className =
      "cell" +
      (this.props.value.isRevealed ? "" : " hidden") +
      (this.props.value.isMine ? " is-mine" : "") +
      (this.props.value.isFlagged ? " is-flag" : "");

    return (
      <div
        ref="cell"
        onClick={this.props.onClick}
        className={className}
        onContextMenu={this.props.cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}

class Board extends React.Component {
  state = {
    boardData: this.initBoardData(
      this.props.height,
      this.props.width,
      this.props.mines
    ),
    gameWon: false,
    mineCount: this.props.mines,
  };

  /* Helper Functions */

  // get mines
  getMines(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get Flags
  getFlags(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get Hidden cells
  getHidden(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get random number given a dimension
  getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor(Math.random() * 1000 + 1) % dimension;
  }

  // Gets initial board data
  initBoardData(height, width, mines) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    data = this.plantMines(data, height, width, mines);
    data = this.getNeighbours(data, height, width);
    console.log(data);
    return data;
  }

  // plant mines on the board
  plantMines(data, height, width, mines) {
    let randomx,
      randomy,
      minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = this.getRandomNumber(width);
      randomy = this.getRandomNumber(height);
      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }

    return data;
  }

  // get number of neighbouring mines for each board cell
  getNeighbours(data, height, width) {
    let updatedData = data,
      index = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return updatedData;
  }

  // looks for neighbouring cells and returns them
  traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < this.props.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < this.props.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < this.props.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < this.props.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }

  // reveals the whole board
  revealBoard() {
    let updatedData = this.state.boardData;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    this.setState({
      boardData: updatedData,
    });
  }

  /* reveal logic for empty cell */
  revealEmpty(x, y, data) {
    let area = this.traverseBoard(x, y, data);
    area.map((value) => {
      if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  // Handle User Events

  handleCellClick(x, y) {
    let win = false;

    // check if revealed. return if true.
    if (this.state.boardData[x][y].isRevealed) return null;

    // check if mine. game over if true
    if (this.state.boardData[x][y].isMine) {
      this.revealBoard();
      alert("game over");
    }

    let updatedData = this.state.boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

    if (this.getHidden(updatedData).length === this.props.mines) {
      win = true;
      this.revealBoard();
      alert("You Win");
    }

    this.setState({
      boardData: updatedData,
      mineCount: this.props.mines - this.getFlags(updatedData).length,
      gameWon: win,
    });
  }

  _handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = this.state.boardData;
    let mines = this.state.mineCount;
    let win = false;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = this.getMines(updatedData);
      const FlagArray = this.getFlags(updatedData);
      win = JSON.stringify(mineArray) === JSON.stringify(FlagArray);
      if (win) {
        this.revealBoard();
        alert("You Win");
      }
    }

    this.setState({
      boardData: updatedData,
      mineCount: mines,
      gameWon: win,
    });
  }

  renderBoard(data) {
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
              cMenu={(e) => this._handleContextMenu(e, dataitem.x, dataitem.y)}
              value={dataitem}
            />
            {datarow[datarow.length - 1] === dataitem ? (
              <div className="clear" />
            ) : (
              ""
            )}
          </div>
        );
      });
    });
  }
  // Component methods
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.setState({
        boardData: this.initBoardData(
          nextProps.height,
          nextProps.width,
          nextProps.mines
        ),
        gameWon: false,
        mineCount: nextProps.mines,
      });
    }
  }

  render() {
    return (
      <div className="board">
        <div className="game-info">
          <span className="info">mines: {this.state.mineCount}</span>
          <br />
          <span className="info">{this.state.gameWon ? "You Win" : ""}</span>
        </div>
        {this.renderBoard(this.state.boardData)}
      </div>
    );
  }
}

class MineSweeper extends React.Component {
  /*
  Beginner: 10 mines, 8x8 board
  Intermediate: 20 mines, 12x12 board
  Expert: 40 mines, 16x16 board
  */
  state = {
    height: 8,
    width: 8,
    mines: 10,
  };

  handleGameStart = () => {
    let difficulty = document.querySelector("#level_select");
    if (difficulty.value === "beginner") {
      this.setState({
        height: 8,
        width: 8,
        mines: 10,
      });
    }
    if (difficulty.value === "intermediate") {
      this.setState({
        height: 12,
        width: 12,
        mines: 20,
      });
    }
    if (difficulty.value === "expert") {
      this.setState({
        height: 16,
        width: 16,
        mines: 40,
      });
    }
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="mine-sweeper-game">
        <h1>MineSweeper</h1>
        <div className="game-info">
          <div className="instructions">
            <h4>Rules</h4>
            <p>
              You are presented with a board of squares. Some squares contain
              mines (bombs), others don't. If you click on a square containing a
              bomb, you lose. If you manage to click all the squares (without
              clicking on any bombs) or flag all the mines, you win.
            </p>
            <p>
              Clicking a square which doesn't have a bomb reveals the number of
              neighbouring squares containing bombs. Use this information plus
              some guess work to avoid the bombs.
            </p>
            <p>
              To open a square, point at the square and click on it. To mark a
              square you think is a bomb, point and right-click.
            </p>
          </div>
          <h4>Select a level a click "start"</h4>
          <span className="info">
            Level:
            <select id="level_select">
              <option value="beginner"> Beginner </option>
              <option value="intermediate"> Intermediate </option>
              <option value="expert"> Expert </option>
            </select>
          </span>
          <button onClick={this.handleGameStart}>Start</button>
        </div>

        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}

export default MineSweeper;
