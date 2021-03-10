type ScorecardProps = {
  awaySeed: number
  awayTeam: string
  homeSeed: number
  homeTeam: string
  winner: string
  margin: number
}

export default function Scorecard({
  awaySeed,
  awayTeam,
  homeSeed,
  homeTeam,
  margin,
  winner,
}: ScorecardProps) {
  return (
    <div>
      <p>
        {awaySeed} {awayTeam} vs. {homeSeed} {homeTeam}...
      </p>
      <p>
        {winner} wins by {margin}!
      </p>
    </div>
  )
}
