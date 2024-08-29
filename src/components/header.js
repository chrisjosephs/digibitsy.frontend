import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {Component} from "react"
import styled from "@emotion/styled"
import {css, keyframes} from "@emotion/react"

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex">
                <div className="outer" style={{position: "relative", width: "100%"}}>
                    <H1>Digibitsy</H1>
                    <H2>Christopher <br/> Josephs esq.</H2>
                    <LogoTriangle height="320" width="600">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" style={{stopColor: "rgb(50,50,50)", stopOpacity: "1"}}/>
                                <stop offset="100%" style={{stopColor: "rgb(0,0,0)", stopOpacity: "1"}}/>
                            </linearGradient>
                        </defs>
                        <filter id="dropshadow" height="130%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                            <feOffset dx="2" dy="2" result="offsetblur"/>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <polygon points="0,0 400,0 200,300" stroke="#36e292" strokeWidth="3"/>
                    </LogoTriangle>
                </div>
                {/*
                    <div className={"md:w-1/3"}>
                    <CloudBase className = "CloudBase">
                        <CloudTitle>
                            Bitsydigi
                        </CloudTitle>
                        <CloudRounds className = "CloudRounds"/>
                    </CloudBase>
                    </div>

                    <div className={"md:w-1/3"}>
                        <CloudBase2 className = "CloudBase">
                        <CloudTitle2>
                            the works of Chris Josephs esq
                        </CloudTitle2>
                        <CloudRounds className = "CloudRounds"/>
                    </CloudBase2>
                    </div>
                    */}
            </div>
        )
    }
}

export default Header
const LogoTriangle = styled.svg`
  animation: dash 6s linear infinite forwards;
  fill: url(#grad1);
  filter :url(#dropshadow);
  left: 50%;
  margin-left: -200px;
  position: absolute;
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  top: 6em;
  z-index: 8;  
  @keyframes dash {
  0%{
   stroke-dashoffset: 1200;
  }
  70%{
    stroke-dashoffset: 0;
  } 
  100%{
    stroke-dashoffset: 0;
  } 
    }
`
const CloudBase = styled.div`
    `
const H1 = styled.h1`
 color: #C6CBF5;
  font-family: 'Orbitron', sans-serif;
  font-size: 180px;
  font-weight: 900;
  line-height: 1.2;
  margin: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  z-index: 11;
   background: -webkit-linear-gradient(top, #151C60, #C6CBF5 40%, black 40%, #E1A0CE 65%, white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;     
`

const H2 = styled.h2`
color: rgb(209,0,177);
 display: block;
 font-family: 'Yellowtail', cursive;
 font-weight: 400;
 font-size: 110px;
 line-height: 1;
 position: absolute;
 margin-top:140px; // same as one above
 text-shadow: 
 0 0 1px rgb(209,0,177),
 0 -3px 3px rgba(255,255,255,0.8),
 0 3px 3px rgba(0,0,0,0.5),  
 0 0 15px rgb(209,0,177),
 0 0 45px rgba(209,0,177,0.8);
 text-align: center;
 text-decoration: underline;
 text-transform: none;
 transform: skew(-10deg) rotate(-10deg);
 width: 100%;
 z-index: 11;
`
