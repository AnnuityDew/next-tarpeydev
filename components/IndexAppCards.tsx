import React from "react"
import Image from "next/image"
import styled from "styled-components"
import { LinkedAppButton, ExternalAppButton } from "../components/AppButtons"

const IndexGlassDiv = styled.section`
  color: white;
  padding: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: ${props => props.gridTemplateRows || "4fr 1fr 2fr 1fr"};
  align-items: center;
  min-height: ${props => props.minHeight};
  background: ${props => props.theme.glass.black};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: ${props => props.theme.glass.blackBorder};
  transition: 0.3s;
  &:hover {
    background: ${props => props.theme.glass.blackHover};
  }
`

/* images that fill container
https://stackoverflow.com/questions/14142378/
how-can-i-fill-a-div-with-an-image-while-keeping-it-proportional
*/

const CoverPicDiv = styled.div`
  position: relative;
  height: 200px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.7);
`

const CoverNextImage = styled(Image)`
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
`

export function IndexAppCard({
  imagesrc,
  imagealt,
  appName,
  oneLiner,
  buttonText,
  url,
  buttonKind,
  internal,
}) {
  return (
    <IndexGlassDiv minHeight="400px">
      <CoverPicDiv>
        <CoverNextImage
          src={imagesrc}
          alt={imagealt}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </CoverPicDiv>
      <h2>{appName}</h2>
      <p>{oneLiner}</p>
      {internal ? (
        <LinkedAppButton label={buttonText} url={url} kind={buttonKind} />
      ) : (
        <ExternalAppButton label={buttonText} url={url} kind={buttonKind} />
      )}
    </IndexGlassDiv>
  )
}
