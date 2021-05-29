// https://github.com/nextauthjs/next-auth-example/blob/main/pages/protected.js
import { useState } from "react"
import Page from "../components/Page"
import { useSession, getSession } from "next-auth/client"
import { StyledButton } from "../components/Buttons"
import { BacklogGame, BacklogGameForm } from "../components/Backlog"

export async function getServerSideProps(context) {
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
  return { props: { apiUrl: api, session: await getSession(context) } }
}

export default function BacklogAdmin({ apiUrl }) {
  const [session, loading] = useSession()
  const [backlog, showBacklog] = useState({
    visible: false,
    loading: false,
    data: "",
  })
  const [form, showForm] = useState({ visible: false, data: "" })
  const [filters, changeFilters] = useState({
    dlcFilter: "",
    nowPlayingFilter: "",
    gameStatusFilter: "",
  })
  const loadingText = "Loading..."
  const subloadingText = "(takes a couple seconds!)"

  async function backlogRequested(queryFilter) {
    showBacklog(state => ({ ...state, loading: true }))
    await Promise.all([
      fetch(apiUrl + `/haveyouseenx/annuitydew/search?${queryFilter}`, {
        method: "GET",
      })
        .then(response => {
          return response.json()
        })
        .then(jsonData => {
          return JSON.stringify(jsonData)
        })
        .then(jsonString => {
          showBacklog({ visible: true, loading: false, data: jsonString })
        }),
    ])
  }

  return (
    <Page
      loggedIn={!!session}
      titleTwo=" - Dew's Backlog"
      description="A web app for viewing games, movies, and shows in my backlog."
      url="https://tarpey.dev/backlog"
      urlImage="https://tarpey.dev/backlog.png"
      heading="Dew's Backlog"
      subheading=""
    >
      <div>
        <h4>Use the buttons below to look through my backlog of games.</h4>
        {!!session && <StyledButton
          gridButton={false}
          kind="medium"
          label={backlog["loading"] ? loadingText : "Add a game"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => showForm({ visible: true, data: "" })}
          disabled={backlog["loading"]}
        />}
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Now Playing"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("now_playing=true")}
          disabled={backlog["loading"]}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Not Started"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("game_status=Not%20Started")}
          disabled={backlog["loading"]}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Started"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("game_status=Started")}
          disabled={backlog["loading"]}
        />
      </div>
      <div>{form["visible"] ? <BacklogGameForm /> : null}</div>
      <div>
        {backlog["visible"] &&
          JSON.parse(backlog["data"]).map((game, index) => (
            <BacklogGame key={index + 1} gameData={game} />
          ))}
      </div>
    </Page>
  )
}
