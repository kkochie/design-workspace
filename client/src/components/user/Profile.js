import React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Error } from "../ui"

export default function Profile()  {
  const [{ data: profile, error, status }, setProfile] = useState({ 
    data: null,
    error: null,
    status: "pending",
  })
  // const [profile, setProfile] = useState([])
  // const [status, setStatus] = useState(false)

  useEffect(() => {
    fetch("/users")
      .then((r) => {
        if (r.ok) {
          r.json().then((profile) => 
            setProfile({ data: profile, error: null, status: "resolved" })
          )
        } else {
          r.json().then((err) =>
            setProfile({ data: null, error: err.error, status: "rejected" })
          )
        }
    })
  }, [])

  if (status === "pending") return <h1>Loading...</h1>
  if (status === "rejected") return <h1>Error: {error.error}</h1>

  return (
    <Container>
      <h1>Hello, {profile.first_name}!</h1>
      <h2>What would you like to work on today?</h2>
      <Center>
        <ul>
          <li><a href="/new-asset">Add a new asset</a></li>
          <li><a href="/new-project">Start a new project</a></li>
          <li><a href="/unsplash">Search for a photo</a></li>
          <li><a href="/unsplash">Pick a new color scheme</a></li>
          <li><a href="/unsplash">Learn about CSS image styles</a></li>
        </ul>
      </Center>
    </Container>
  )
}

const Container = styled.section`  
  max-width: 80%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Center = styled.div`
  display: flex;
  justify-content: center;

  li {
    font-size: 1.25rem;
  }
`