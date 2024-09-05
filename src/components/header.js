import React, {Component, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import media from '../util/breakpoints';

const Header = () => {
  const triangleMobileRef = useRef(null)
  const triangleDesktopRef = useRef(null)
  /**
   * Fix for SVG animate poor performance bug on chrome,
   * whereby css animation of svg incurs severe lag
   * The `animateTriangle` function animates the dash offset of an SVG element's stroke.
   * It continuously increments the dash offset at a specified interval to create a
   * moving dash effect.
   *
   *                    The target property of this event object should be the SVG element
   *                    to be animated.
   * @param svgElem
   */
  const animateTriangle = (svgElem) => {
    const animateDashTime = 10; // milliseconds
    let anim_dash_offset = 0;
    let animateDashTimer = null;

    function animateDashStep() {
      anim_dash_offset += 2;
      if (svgElem) {
        svgElem.setAttribute('style',
            'stroke-dashoffset: ' + (1200 - (anim_dash_offset % 1200)) +  ';');
        // repeat
        animateDashTimer = setTimeout(
            animateDashStep,
            animateDashTime,
        );
      }
    }
    animateDashStep()
  }
  useEffect(() =>{
    /*
    if (triangleMobileRef.current) {
      animateTriangle(triangleMobileRef.current);
    }
    if (triangleDesktopRef.current) {
      animateTriangle(triangleDesktopRef.current);
    }
     */
  });
// start
    return (
        <div className="flex">
          <div className="outer" style={{position: 'absolute', width: '100%'}}>
            <H1>Digibitsy</H1>
            <H2>Christopher <br/> Josephs esq.</H2>
            <LogoTriangleDesktop ref={triangleDesktopRef}>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%"
                        style={{stopColor: 'rgb(50,50,50)', stopOpacity: '1'}}/>
                  <stop offset="100%"
                        style={{stopColor: 'rgb(0,0,0)', stopOpacity: '1'}}/>
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
              <polygon points="0,0 400,0 200,300" stroke="#36e292"
                       strokeWidth="3"/>
            </LogoTriangleDesktop>
            <div id={"LogoTriangleMobile"} ref={triangleMobileRef}>
            <LogoTriangleMobile ref={triangleMobileRef}>
                <defs>
                  <linearGradient id="gradM1" x1="0%" y1="100%" x2="100%"
                                  y2="0%">
                    <stop offset="0%" style={{
                      stopColor: 'rgb(50,50,50)',
                      stopOpacity: '0.8',
                    }}/>
                    <stop offset="100%"
                          style={{stopColor: 'rgb(0,0,0)', stopOpacity: '1'}}/>
                  </linearGradient>
                </defs>
                <filter id="dropshadowM" height="130%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feOffset dx="2" dy="2" result="offsetblur"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <polygon className="LogoTriangle" points="0,0 300,0 150,200"
                         stroke="#36e292" strokeWidth="3"/>
              </LogoTriangleMobile>
            </div>
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
    );
}

export default Header;
const LogoTriangleDesktop = styled.svg`
    display: none;
    ${media.sm`
        display: block;
        margin-left: 200px;
    `}
    ${media.lg`
        margin-left: 275px;
    `}
    ${media.xl`
        margin-left: 400px;
    `}
    height: 320px;
    width: 600px;
    top: 6em;
    fill: url(#grad1);
    filter: url(#dropshadow);
    height: 320px;
    position: absolute;
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    z-index: 8;
`;
const LogoTriangleMobile = styled.svg`
    ${media.sm`
       display: none;
    `}
    fill: url(#gradM1);
    filter: url(#dropshadowM);
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    top: 2em;
    z-index: 8;
`;
const CloudBase = styled.div`
`;
const H1 = styled.h1`
    font-size: 60px;
    margin-top: 0;
    color: #C6CBF5;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    line-height: 1.2;
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
    ${media.sm` 
        font-size: 180px;
        margin: 0;
    `}

`;

const H2 = styled.h2`
    color: rgb(209, 0, 177);
    display: block;
    font-family: 'Yellowtail', cursive;
    font-weight: 400;
    font-size: 40px;
    line-height: 1;
    position: absolute;
    margin-top: 46px; // same as one above
    text-shadow: 0 0 1px rgb(209, 0, 177),
    0 -3px 3px rgba(255, 255, 255, 0.8),
    0 3px 3px rgba(0, 0, 0, 0.5),
    0 0 15px rgb(209, 0, 177),
    0 0 45px rgba(209, 0, 177, 0.8);
    text-align: center;
    text-decoration: underline;
    text-transform: none;
    transform: skew(-10deg) rotate(-10deg);
    width: 100%;
    z-index: 11;
    ${media.sm`
        font-size: 110px;
        margin-top: 140px; // same as one above
    `}
    ${media.lg`
        font-size: 110px;
        left: -50px;
        margin-top: 140px; // same as one above
    `}
`;
