import styled from "styled-components"

interface BacklogGameData {
  game_title: string
  sub_title: string
  game_system: string
  genre: string
  dlc: boolean
  now_playing: boolean
  game_status: string
  game_hours: number
  game_minutes: number
  actual_playtime: boolean
  add_date: string
  start_date: string
  beat_date: string
  complete_date: string
  game_notes: string
}

interface BacklogGameProps {
  gameData: BacklogGameData
}

export const GameDiv = styled.div`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
`

export function BacklogGame({ gameData }: BacklogGameProps) {
  return (
    <GameDiv>
      <h4>{gameData.game_title}</h4>
      <h5>{gameData.sub_title}</h5>
      {gameData.game_system} | {gameData.genre} | {gameData.game_status}<br/>
      Now Playing: {gameData.now_playing.toString()} | DLC: {gameData.dlc.toString()}<br/>
      Playtime: {gameData.game_hours} hours, {gameData.game_minutes} minutes<br/>
      Added {gameData.add_date || ": N/A"}<br/>
      Started {gameData.start_date || ": N/A"}<br/>
      Beaten {gameData.beat_date || ": N/A"}<br/>
      Completed {gameData.complete_date || ": N/A"}<br/>
      <h6>{gameData.game_notes}</h6>      
    </GameDiv>
  )
}