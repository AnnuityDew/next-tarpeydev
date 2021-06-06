import styled from "styled-components"
import { gridBreakpoints } from "../utils/breakpoints"
import numeral from "numeral"

interface ScorecardData {
  region: string
  away_seed: string
  away_key: string
  away_school: string
  home_seed: string
  home_key: string
  home_school: string
  advance_to: number
  home_win_chance: number
  sim_reroll: number
  sim_winner: string
  home_win_chance_max?: number
  max_margin_top?: number
  max_margin_bottom?: number
  home_win_chance_medium?: number
  medium_margin_top?: number
  medium_margin_bottom?: number
  home_win_chance_mild?: number
  mild_margin_top?: number
  mild_margin_bottom?: number
  home_win_chance_median?: number
  median_margin_top?: number
  median_margin_bottom?: number
  season: string
  neutral_site: boolean
  home_margin: number
  total_possessions: number
  sim_ObjectId: string
}

interface ScorecardProps {
  click: React.MouseEventHandler<HTMLButtonElement>
  cssGame?: string
  gameData: ScorecardData
  gameIndex: number
  round: string
}

let UnstyledMiniGameDiv = ({ click, cssGame, className, children }) => (
  <div onClick={click} className={`${cssGame} ${className}`}>
    {children}
  </div>
)

let MiniGameDiv = styled(UnstyledMiniGameDiv)`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  flex-direction: column;
  place-self: center stretch;
  grid-area: ${props => props.cssGame};
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`

let StyledMiniTeamDiv = styled.div`
  padding: 2px;
  font-size: 80%;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 5px;
  background: ${props =>
    props.winner
      ? "conic-gradient(from -270deg at 75% 110%, midnightblue, lawngreen)"
      : "conic-gradient(from -90deg at top left, black, white)"};
`

const MiniTeamDiv = ({ winner, seed, label }) => (
  <StyledMiniTeamDiv winner={winner}>
    {seed} {label}
  </StyledMiniTeamDiv>
)

export const BracketDiv = styled.div`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
`

export const BracketGrid = styled.div`
  padding: 10px 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
`

export const RegionsContainer = styled.div`
  padding: 10px 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(min(800px, 100%), 1fr));
`

export const PlayerBoxGrid = styled.div`
  padding: 0;
  display: grid;
  grid-gap: 10px 15px;
  grid-template-columns: repeat(auto-fill, minmax(min(600px, 100%), 1fr));
`

export const SevenGameGrid = styled.div`
  padding: 10px 0;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "game1 game5 game7"
    "game2 game5 game7"
    "game3 game6 game7"
    "game4 game6 game7";
`

export const FirstFourGrid = styled.div`
  padding: 10px 0;
  display: grid;
  grid-gap: 30px;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "1fr 1fr" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])}
`

let UnstyledFirstFour = ({ region, className, children }) => {
  return (
    <section className={className}>
      <h3>{region}</h3>
      {children}
    </section>
  )
}

export const FirstFour = styled(UnstyledFirstFour)`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
`

export function MiniScorecard({ click, cssGame, gameData }: ScorecardProps) {
  if (gameData.sim_winner === gameData.away_key) {
    return (
      <MiniGameDiv click={click} cssGame={cssGame}>
        <MiniTeamDiv
          winner={true}
          label={gameData.away_key}
          seed={gameData.away_seed}
        />
        <MiniTeamDiv
          winner={false}
          label={gameData.home_key}
          seed={gameData.home_seed}
        />
        <h6>
          {gameData.away_school} wins by {Math.abs(gameData.home_margin)}
        </h6>
      </MiniGameDiv>
    )
  } else if (gameData.sim_winner === gameData.home_key) {
    return (
      <MiniGameDiv click={click} cssGame={cssGame}>
        <MiniTeamDiv
          winner={false}
          label={gameData.away_key}
          seed={gameData.away_seed}
        />
        <MiniTeamDiv
          winner={true}
          label={gameData.home_key}
          seed={gameData.home_seed}
        />
        <h6>
          {gameData.home_school} wins by {Math.abs(gameData.home_margin)}
        </h6>
      </MiniGameDiv>
    )
  } else {
    return <h6>Error!</h6>
  }
}

let UnstyledHalfRegion = ({ region, className, children }) => {
  return (
    <section className={className}>
      <h3>{region}</h3>
      {children}
    </section>
  )
}

/* conditional CSS: https://stackoverflow.com/a/56098044 */
export const HalfRegion = styled(UnstyledHalfRegion)`
  ${props => {
    if (props.region === "West Upper" || props.region === "West Lower") {
      return `
        background: ${props.theme.rainbow.red};
      `
    } else if (
      props.region === "South Upper" ||
      props.region === "South Lower"
    ) {
      return `
        background: ${props.theme.rainbow.teal};
      `
    } else if (props.region === "East Upper" || props.region === "East Lower") {
      return `
        background: ${props.theme.rainbow.lb};
      `
    } else if (
      props.region === "Midwest Upper" ||
      props.region === "Midwest Lower"
    ) {
      return `
        background: ${props.theme.rainbow.pink};
      `
    } else if (props.region === "Elite Eight") {
      return `
        background: ${props.theme.rainbow.orange};
      `
    } else {
      return `
        background: ${props.theme.uconn.c800};
      `
    }
  }}
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
`

export const ButtonGrid = styled.div`
  display: grid;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "1fr" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])}
`

export const StyledDetails = styled.details`
  margin: 20px 0;
`

const UnstyledTeamBoxScorecard = ({ className, teamData }) => {
  var teams = Object.keys(teamData)
  return (
    <section className={className}>
      {/* first team's stats */}
      <h5>{teams[0]}</h5>
      {Object.keys(teamData[teams[0]]).map(stat => (
        <span key={stat}>{teamData[teams[0]][stat]}</span>
      ))}
      {/* stat names */}
      <h5>Category</h5>
      {Object.keys(teamData[teams[0]]).map(stat => (
        <h6 key={stat}>{stat}</h6>
      ))}
      {/* second team's stats */}
      <h5>{teams[1]}</h5>
      {Object.keys(teamData[teams[1]]).map(stat => (
        <span key={stat}>{teamData[teams[1]][stat]}</span>
      ))}
    </section>
  )
}

export const TeamBoxScorecard = styled(UnstyledTeamBoxScorecard)`
  margin: 10px 0;
  padding: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  display: grid;
  place-items: center center;
  grid-gap: 0px;
  grid-auto-flow: column;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background: ${props => props.theme.uconn.c700};
`

const UnstyledPlayerBoxScorecard = ({
  key,
  index,
  className,
  team,
  playerData,
}) => {
  var firstQuote = team[index].indexOf("'")
  var secondQuote = team[index].indexOf("'", firstQuote + 1)
  var teamName = team[index].substring(firstQuote + 1, secondQuote)
  return (
    <section className={className}>
      <h5>Team</h5>
      {/* field names */}
      {Object.keys(playerData).map(stat => (
        <h6 key={stat}>{stat}</h6>
      ))}
      {/* field values */}
      <h5 className="team-name">{teamName}</h5>
      {Object.keys(playerData).map(stat => (
        <h6 key={stat}>
          {stat === "Name" || stat === "Position"
            ? playerData[stat]
            : numeral(playerData[stat]).format(0)}
        </h6>
      ))}
    </section>
  )
}

export const PlayerBoxScorecard = styled(UnstyledPlayerBoxScorecard)`
  margin: 5px 0;
  padding: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  display: grid;
  place-items: center center;
  grid-gap: 0px;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background: ${props => props.theme.uconn.c700};
`

export const Instructions = styled.section`
  margin: 10px 0;
  padding: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  font-weight: 700;
  color: black;
  ${props => {
    if (props.hot) {
      return `
        background: #FFBAFA;
      `
    } else {
      return `
        background: ${props.theme.uconn.c200};
      `
    }
  }}
`
