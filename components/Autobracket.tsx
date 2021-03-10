import styled from "styled-components"

type ScorecardProps = {
  gameIndex: number
  round: string
  awaySeed: string
  awayTeam: string
  homeSeed: string
  homeTeam: string
  winner: string
  margin: number
  boxScoreId: string
}

/* conditional CSS: https://stackoverflow.com/a/56098044 */
let ScorecardDiv = styled.section`
  margin: 20px;
  min-height: 400px;
  height: 40vh;
  display: grid;
  place-items: center center;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  ${props => {
    if (props.round === "First Four") {
      return `
        background: ${props.theme.uconn.c300};
      `
    } else if (props.round === "Round of 64") {
      return `
        background: ${props.theme.uconn.c700};
      `
    } else if (props.round === "Round of 32") {
      return `
        background: ${props.theme.uconn.c300};
      `
    } else if (props.round === "Sweet 16") {
      return `
        background: ${props.theme.uconn.c500};
      `
    } else if (props.round === "Elite Eight") {
      return `
        background: ${props.theme.uconn.c900};
      `
    } else if (props.round === "Final Four") {
      return `
        background: ${props.theme.uconn.c700};
      `
    } else if (props.round === "Title Game") {
      return `
        background: ${props.theme.uconn.c200};
      `
    }
  }}
`
let GameDiv = styled.div`
  place-self: stretch;
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
let SeedSpan = styled.span`
  font-size: 65%;
`

export function Scorecard({
  gameIndex,
  round,
  awaySeed,
  awayTeam,
  homeSeed,
  homeTeam,
  margin,
  winner,
  boxScoreId,
}: ScorecardProps) {
  let scorecard
  if (winner === awayTeam) {
    scorecard = (
      <ScorecardDiv round={round}>
        <h4>Game: {gameIndex}</h4>
        <h4>{round}</h4>
        <GameDiv>
          <TeamDiv winner={true}>
            <SeedSpan>{awaySeed}</SeedSpan>
            <h2>{awayTeam}</h2>
            <span>Wins by {margin}</span>
          </TeamDiv>
          <TeamDiv winner={false}>
            <SeedSpan>{homeSeed}</SeedSpan>
            <h2>{homeTeam}</h2>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  } else {
    scorecard = (
      <ScorecardDiv round={round}>
        <h4>Game: {gameIndex}</h4>
        <h4>{round}</h4>
        <GameDiv>
          <TeamDiv winner={false}>
            <SeedSpan>{awaySeed}</SeedSpan>
            <h2>{awayTeam}</h2>
          </TeamDiv>
          <TeamDiv winner={true}>
            <SeedSpan>{homeSeed}</SeedSpan>
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

export const BracketDiv = styled.div`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
`
