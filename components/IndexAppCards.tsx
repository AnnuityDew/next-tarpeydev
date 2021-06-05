import React from "react"
import Image from "next/image"
import styled from "styled-components"

interface CardProps {
  internal?: boolean
  label?: string
  children?: React.ReactNode
  imagesrc?: string
  imagealt?: string
  gridrowcss?: string
}

const IndexGlassDiv = styled.section`
  color: white;
  padding: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: ${props => props.gridTemplateRows || "3fr 1fr 2fr 1fr"};
  align-items: stretch;
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
  label,
  children,
  imagesrc,
  imagealt,
  gridrowcss,
}: CardProps) {
  return (
    <IndexGlassDiv minHeight="400px" gridTemplateRows={gridrowcss}>
      <CoverPicDiv>
        <CoverNextImage
          src={imagesrc}
          alt={imagealt}
          layout="fill"
          objectFit="cover"
        />
      </CoverPicDiv>
      <h2>{label}</h2>
      {children}
    </IndexGlassDiv>
  )
}
