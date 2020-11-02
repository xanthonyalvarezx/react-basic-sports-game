function Team(props) {
  let shotPercentDiv;

  if (props.stats.shotsTaken) {
    const shotPercent = Math.round((props.stats.score / props.stats.shotsTaken) * 100);
    shotPercentDiv = (
      <div>
        <strong>Shot%:{shotPercent}</strong>
      </div>
    );
  }
  return (
    <div className="Game">
      <h3>{props.name}</h3>
      <div className="logo">
        <img src={props.logo} alt="team logo" />
      </div>

      <div className="shotDiv">
        <button id="Shoot" onClick={props.shotHandler}>
          Shoot
        </button>

        <p>Score: {props.stats.score}</p>

        <p>shotsTaken: {props.stats.shotsTaken}</p>
        {shotPercentDiv}
      </div>
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="scoreBoard">
      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
        <h3>SCOREBOARD</h3>
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
        <div className="teamStats"></div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shotsTaken: 0,
        score: 0,
      },
      visitingTeamStats: {
        shotsTaken: 0,
        score: 0,
      },
    };
    this.shotSound = new Audio("Back+Board.mp3");
    this.scoreSound = new Audio("Swish+2.mp3");
  }
  handleShoot = (team) => {
    const teamStatsKey = `${team}TeamStats`;

    let score = this.state[teamStatsKey].score;

    setTimeout(() => {
      this.shotSound.play();
    }, 25);

    if (Math.random() > 0.5) {
      score += 1;
      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }
    this.setState((currentState, props) => ({
      [teamStatsKey]: {
        shotsTaken: currentState[teamStatsKey].shotsTaken + 1,
        score,
      },
    }));
  };

  resetGame = (event) => {
    this.setState((currentState, props) => ({
      resetCount: currentState.resetCount + 1,
      homeTeamStats: {
        shotsTaken: 0,
        score: 0,
      },
      visitingTeamStats: {
        shotsTaken: 0,
        score: 0,
      },
    }));
  };
  render() {
    return (
      <div className="Game">
        <ScoreBoard homeTeamStats={this.state.homeTeamStats} visitingTeamStats={this.state.visitingTeamStats} />
        <h1 className="venue">Welcome to{this.props.venue}!</h1>

        <div className="stats">
          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.handleShoot("home")}
          />
          <div className="resetButton">
            <strong>Resets:</strong> {this.state.resetCount} <br />
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
          <div className="versus">
            <h1>VS</h1>
          </div>
          <div id="ball1">🏀</div>

          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.handleShoot("visiting")}
          />
        </div>
      </div>
    );
  }
}

function App(props) {
  const thunder = {
    name: "The Thunder",
    logoSrc: "./download.jpeg",
  };
  const bulldogs = {
    name: "The Bulldogs",
    logoSrc: "./bulldog.jpeg",
  };
  const lions = {
    name: "The Lions",
    logoSrc: "./Lions.jpeg",
  };
  const polarBears = {
    name: "The Polar Bears",
    logoSrc: "./polar-bears.jpeg",
  };
  return (
    <div className="App">
      <Game venue="Madison Square Garden" homeTeam={thunder} visitingTeam={bulldogs} />
      <Game venue=" The MGM Grand" homeTeam={lions} visitingTeam={polarBears} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
