/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Suspense, useRef, useState} from "react"
import BigBangStarField from 'react-big-bang-star-field'
import PropTypes from "prop-types"
import {useStaticQuery, StaticQuery, graphql, Link} from "gatsby"
import Header from "../components/header"
import "./layout.css"
import '../css/global.css'
import Transition from '../components/transition'
import MatrixLetters from "../components/matrix";
import {getMousePos} from "../components/utils";
import background from '../images/piqsels.com-id-fvkta2.jpg'
import OctoPirate from "../components/Octopirate";
import planetImg from "../images/planet3.gif"
import {TransitionGroup} from "react-transition-group";
import styled from "@emotion/styled";
import Geoscape from "../components/Geoscape";

const Layout = ({children, location}) => {
    const mouse = useRef({x: 0, y: 0});

    return (
        <StaticQuery
            query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
            render={data => (
                <div onMouseMove={e => (mouse.current = getMousePos(e))}>
                    <BigBangStarField
                        className="Big-Bang-Star-Field"
                        starColor={"227, 170, 244"}
                        scale={4}
                        style={{
                            position: 'fixed',
                            width: '100%',
                            height: '100%',
                            zIndex: '-10',
                            background: `url(${background})`,
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className={"container mx-auto min-h-screen relative z-20"}>
                        <div className={"container-head"}>
                            <Header siteTitle={data.site.siteMetadata.title}/>
                            <div className="flex" style={{marginTop: "100px"}}>
                                <div className={"md:w-2/3"}>
                                    <div className={"md:w-2/4 text-gray-300 z-20 text-center"}
                                         style={{fontFamily: "Orbitron", fontWeight: "400"}}>
                                        <NavTriangle height="0" width="0">

                                            <defs>
                                                <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                                                    <stop offset="0%"
                                                          style={{stopColor: "rgb(50,50,50)", stopOpacity: "1"}}/>
                                                    <stop offset="100%"
                                                          style={{stopColor: "rgb(0,0,0)", stopOpacity: "1"}}/>
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

                                            <polygon points="400,400 200,0 0,400" stroke="#151C60" strokeWidth="3"/>
                                        </NavTriangle>
                                        <div className={'Navtext relative z-20'} style={{top: "2em"}}>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <Link to="/me" className={"z-20 relative"}>> Me <br/></Link>
                                            <Link to="/page-2" className={"z-20 relative"}>>>> HOW <br/></Link>
                                            <Link to="/career" className={"z-20 relative"}>> Career <br/></Link>
                                            > Artwork <br/>
                                            > github / bitbucket <br/>
                                            > contact <br/>
                                            > blog <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"container top-0 min-h-screen absolute"}>
                            <div className="flex h-screen" style={{paddingTop: "100px"}}>
                                <div className={"md:w-2/3"}></div>
                                <div className={"md:w-1/3 h-full"} style={{paddingTop: "70px", zIndex: 5}}>
                                    <OctoPirate style={{position: "absolute", width: "30%", height:"450px", right: 0}} mouse={mouse}></OctoPirate>
                                    <Moon></Moon>
                                </div>
                            </div>
                        </div>
                        <main className={"main"}>
                            {/* <Invaders/>*/}
                            {/*  <Rocket/> */}
                            { location.pathname !== "/me" &&

                                <div className="flex text-white p-10 bg-gray-700 opacity-75 z-0 relative">
                                    <Transition location={location}>
                                        <MatrixLetters className="MatrixLetters w-full relative z-10" trigger={location.pathname === "/page-2" ? 1 : 0}/>
                                        <div className="my-8 mb-20 w-full relative z-10">
                                        <div className="cutout" style={{
                                            position: "relative",
                                            float: "right",
                                            top: "0",
                                            right: "0",
                                            width: "33%",
                                            height: "160px",
                                            marginBottom: "1.45rem"
                                        }}></div>

                                        {children}</div>
                                        </Transition>
                                </div>
                            }
                        </main>
                    </div>

                    <footer className={"relative bottom-0 content-center w-full text-center z-10"}
                            style={{marginTop: "-50vh"}}>
                        <Geoscape className={"z-30"} style={{position: "absolute", height:"50vh"}}></Geoscape>
                        { /*
                        <div className={"container mx-auto"}>

                             <img className={"object-contain w-full bg-transparent m-0"} style={{maxHeight: "15vh"}}
                                 src={planetImg}/>
                        </div>
                        */ }
                        <div className={"mx-auto bg-black text-gray-200 z-50" +
                        "" +
                        " relative"}   style={{height: "2rem", marginTop:"-2rem"}}>
                            © {new Date().getFullYear()}, Built with
                            {` `}
                            React / <a href="https://www.gatsbyjs.org">Gatsby</a>, Threejs (where opengl supported),
                            Drupal 9,
                            graphQL, Tailwind css
                        </div>
                    </footer>
                    { /*
                    <div className={"TopPage h-screen bg-black"}>
                        <div className={"container mx-auto h-screen"}>
                            <Header siteTitle={data.site.siteMetadata.title}/>
                            <div className="flex " style={{marginTop: "100px"}}>
                                <div className={"md:w-2/3"}>
                                    <div className={"md:w-2/4 text-gray-300 z-20 text-center"}
                                         style={{fontFamily: "Orbitron", fontWeight: "400"}}>
                                        <NavTriangle height="0" width="0">
                                            <defs>
                                                <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                                                    <stop offset="0%"
                                                          style={{stopColor: "rgb(50,50,50)", stopOpacity: "1"}}/>
                                                    <stop offset="100%"
                                                          style={{stopColor: "rgb(0,0,0)", stopOpacity: "1"}}/>
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

                                            <polygon points="400,400 200,0 0,400" stroke="#151C60" strokeWidth="3"/>
                                        </NavTriangle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    */
                    }
                </div>
            )}
        />
    )
}
const Moon = styled.div`
    position: relative;
    background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Moon.svg?sanitize=true) right 150% no-repeat;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    animation: moon-move-in 1.2s 1s forwards;
    
    @keyframes moon-move-in {
    from {
      opacity: 0;
      background-position: right 150%;
    }
    to {
      opacity: 1;
      background-position: top right;
    }

`;

const NavTriangle = styled.svg`
  animation: dash 6s linear infinite forwards;  
  fill: url(#grad1);
  filter :url(#dropshadow);
  position: absolute;
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  top: 14em;
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
`;
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
