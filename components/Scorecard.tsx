import styled from "styled-components"

type ScorecardProps = {
  gameIndex: number
  awaySeed: string
  awayTeam: string
  homeSeed: string
  homeTeam: string
  winner: string
  margin: number
  boxScoreId: string
}

let ScorecardDiv = styled.div`
  margin: 20px;
  height: 40vh;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  background: ${props => props.roundColor};
`
let GameDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
let TeamDiv = styled.div`
  margin: 10px;
  display: grid;
  place-items: center center;
  grid-template-rows: 1fr 1fr 1fr;
  background: ${props =>
    props.winner
      ? "conic-gradient(from -270deg at 75% 110%, midnightblue, lawngreen)"
      : "conic-gradient(from -135deg at -10% center, #ffa500, #ff7715, #ff522a, #ff3f47, #ff5482, #ff69b4)"};
`

export default function Scorecard({
  gameIndex,
  awaySeed,
  awayTeam,
  homeSeed,
  homeTeam,
  margin,
  winner,
  boxScoreId,
}: ScorecardProps) {
  let scorecard, round, roundColor;
  if (gameIndex <= 4) {
    round = "First Four";
    roundColor = "red";
  } else if (gameIndex <= 36) {
    round = "Round of 64";
    roundColor = "orange";
  } else if (gameIndex <= 52) {
    round = "Round of 32";
    roundColor = "yellow";
  } else if (gameIndex <= 60) {
    round = "Sweet 16";
    roundColor = "green";
  } else if (gameIndex <= 64) {
    round = "Elite Eight";
    roundColor = "blue";
  } else if (gameIndex <= 66) {
    round = "Final Four"
    roundColor = "purple";
  } else if (gameIndex <= 67) {
    round = "Title Game"
    roundColor = "gold";
  } else {
    round = "Error!"
    roundColor = "black";
  }
  if (winner === awayTeam) {
    scorecard = (
      <ScorecardDiv roundColor={roundColor}>
        <h4>Game: {gameIndex}</h4>
        <h4>{round}</h4>
        <GameDiv>
          <TeamDiv winner={true}>
            <span>{awaySeed}</span>
            <h2>{awayTeam}</h2>
            <span>Wins by {margin}</span>
          </TeamDiv>
          <TeamDiv winner={false}>
            <span>{homeSeed}</span>
            <h2>{homeTeam}</h2>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  } else {
    scorecard = (
      <ScorecardDiv roundColor={roundColor}>
        <h4>Game: {gameIndex}</h4>
        <h4>{round}</h4>
        <GameDiv>
          <TeamDiv winner={false}>
            <span>{awaySeed}</span>
            <h2>{awayTeam}</h2>
          </TeamDiv>
          <TeamDiv winner={true}>
            <span>{homeSeed}</span>
            <h2>{homeTeam}</h2>
            <span>Wins by {margin}</span>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  }

  return scorecard
}
