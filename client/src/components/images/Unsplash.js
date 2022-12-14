import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import Button from 'react-bootstrap/Button'
import uuid from "react-uuid"


export default function Unsplash() {
  const [img, setImg] = useState("cat")
  const [res, setRes] = useState([])
  const [errors, setErrors] = useState([])
  const [ status, setStatus ] = useState("pending")

  const history = useHistory()

  // Settings for retrieving Unsplash images using API key
  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&per_page=20`
    )
    const res = await data.json()
    const result = res.results
    setRes(result)
    setStatus("resolved")
  }
 
  // Get initial search request
  useEffect(() => {
    fetchRequest()
  }, [])

  const Submit = () => {
    fetchRequest()
    setImg("")
  }

  // Update status state
  if (status === "pending") return <h4>Loading...</h4>
  if (status === "rejected") return <h4>Error: {errors.error}</h4>

  // Add Unsplash image to user catalog
  function addPhoto(asset) {
    const formData = {
      title: asset.alt_description,
      source: "Unsplash",
      description: asset.description,
      image_url: asset.urls.regular,
      tags: "Unsplash",
      image_data: null,
    }
    
    fetch("/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      }).then((r) => {
      if (r.ok) {
        r.json().then((asset) => {
          history.push(`/assets/${asset.id}`)
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="container">
      <h2>Unsplash Photo Search</h2>
      <TextBox>
        <a href="http://www.unsplash.com" target="_blank">Unsplash</a> is a source for beautiful, free images and photos that you can download and use for any project. Search over 3 million high-resolution images and add to your <strong>WORKSPACE</strong> catalog.
      </TextBox>
      
      <div className="container-fluid">
          <SearchBox>
            <input
            type="text"
            placeholder="Search..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
            <Button
              variant="outline-secondary"
              type="submit"
              onClick={Submit}>
                Search
            </Button>
          </SearchBox>
       
        <PhotoCollection>
          {res.map((asset) => {
            return (
              <Img key={uuid()}>
                <img
                  src={asset.urls.small}
                  alt="asset.alt_description"
                />
                <Button variant="outline-secondary" onClick={() => addPhoto(asset)}>Add</Button>
              </Img>
            )
          })}
        </PhotoCollection>
      </div>
    </div>
  )
}

// Styled-Components CSS
const TextBox = styled.div`
  width: 75%;
  margin-bottom: 30px;
`
const Img = styled.div`
display: flex;
flex-direction: column;
gap: 20px
overflow-x: auto;

img {
  height: 225px;
  width: 225px;
  object-fit: contain;
  margin-bottom: 15px;
}

button {
  margin:0 auto;
  width: 30%;
}
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`
const PhotoCollection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`