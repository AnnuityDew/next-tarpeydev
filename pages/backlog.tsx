import Page from "../components/Page"
import { Component } from "react"
import { StyledButton } from "../components/Buttons"
import {
  BacklogGame
} from "../components/Backlog"

// This gets called only on build
export async function getStaticProps() {
  // Fetch data from external API
  let api = ""
  if (process.env.API_ENV === "test") {
    api = "http://127.0.0.1:8000"
  } else if (process.env.API_ENV === "dev") {
    api = "https://dev.tarpey.dev"
  } else {
    api = "https://api.tarpey.dev"
  }

  // Pass data to the page via props
  return { props: { apiUrl: api } }
}

class Backlog extends Component<
  { apiUrl: string },
  {
    viewBacklog: boolean
    backlogLoading: boolean
    backlogData: string
    dlcFilter: string
    nowPlayingFilter: string
    gameStatusFilter: string
  }
> {
  constructor(props) {
    super(props)

    this.state = {
      viewBacklog: false,
      backlogLoading: false,
      backlogData: "",
      dlcFilter: "",
      nowPlayingFilter: "",
      gameStatusFilter: "",
    }
  }

  async backlogRequested(queryFilter) {
    this.setState(state => ({ backlogLoading: true }));
    await Promise.all([
      fetch(this.props.apiUrl + `/haveyouseenx/annuitydew/search?${queryFilter}`, { method: "GET", })
        .then(response => { return response.json() })
        .then(jsonData => { return JSON.stringify(jsonData) })
        .then(jsonString => { this.setState({ viewBacklog: true, backlogData: jsonString }) })
    ]);
    this.setState(state => ({ backlogLoading: false }));
  }

  render() {
    let backlogFilterForm, backlogResults;
    const loading = "Loading..."
    const subloading = "(takes a couple seconds!)"

    backlogFilterForm = (
      <div>
        <h4>Use the buttons below to look through my backlog of games.</h4>
        <StyledButton
          gridButton={false}
          kind="blue"
          label={this.state.backlogLoading ? loading : "Now Playing"}
          sublabel={this.state.backlogLoading ? subloading : ""}
          click={this.backlogRequested.bind(this, "now_playing=true")}
          disabled={this.state.backlogLoading}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={this.state.backlogLoading ? loading : "Not Started"}
          sublabel={this.state.backlogLoading ? subloading : ""}
          click={this.backlogRequested.bind(this, "game_status=Not%20Started")}
          disabled={this.state.backlogLoading}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={this.state.backlogLoading ? loading : "Started"}
          sublabel={this.state.backlogLoading ? subloading : ""}
          click={this.backlogRequested.bind(this, "game_status=Started")}
          disabled={this.state.backlogLoading}
        />
      </div>
    )

    backlogResults = (
      <div>
        {this.state.backlogData &&
          JSON.parse(this.state.backlogData)
            .map((game, index) => (
              <BacklogGame
                key={index + 1}
                gameData={game}
              />
            ))
        }
      </div>
    )

    return (
      <Page
        titleTwo=" - Dew's Backlog"
        description="A web app for viewing games, movies, and shows in my backlog."
        url="https://tarpey.dev/backlog"
        urlImage="https://tarpey.dev/backlog.png"
        heading="Dew's Backlog"
        subheading=""
      >
        <section>{backlogFilterForm}</section>
        <section>{backlogResults}</section>
      </Page>
    )
  }
}

export default Backlog
