import React from 'react'

const Footer = ({text, url} : any) => {
  return (
    <div 
        style={{
          color: "white", 
          display: 'flex', 
          flexDirection: "row", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: "0.3em", 
          height: "20px",
          fontFamily: "Poppins"
        }}
    >
            <h5>{text}</h5>
            <a style={{textDecoration: "none", fontWeight: "bold"}}href={url}>Spencer</a>
    </div>
  )
}

export default Footer