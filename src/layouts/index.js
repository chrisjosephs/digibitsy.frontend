/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useRef} from "react";
import BigBangStarField from 'react-big-bang-star-field';
import PropTypes from "prop-types";
import {graphql, Link, StaticQuery} from "gatsby";
import Header from "../components/header";
import "./layout.css";
import '../css/global.css';
import Transition from '../components/transition';
import MatrixLetters from "../components/matrix";
import {getMousePos} from "../util/utils";
import background from '../images/piqsels.com-id-fvkta2.jpg';
import OctoPirate from "../components/Octopirate";
import styled from "@emotion/styled";
import Geoscape from "../components/Geoscape";
import "./layout.css";
import zIndex from '@mui/material/styles/zIndex';

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
              <>
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
                  <div
                      className={"container mx-auto min-h-screen relative z-20"}>
                    <div className={"container-head"}>
                      <Header siteTitle={data.site.siteMetadata.title}/>
                      <div className="flex layout-content">
                        <div className={"w-1/2 md:w-2/3"}>
                          <div
                              className={"md:w-2/4 text-gray-300 z-20 text-center"}
                              style={{
                                fontFamily: "Orbitron",
                                fontWeight: "400",
                              }}>
                            <div id={"NavTriangleWrapper"}>
                              <svg height="100%" width="100%" viewBox="0 0 400 400">
                                <defs>
                                  <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgb(50,50,50)" stopOpacity="1"/>
                                    <stop offset="100%" stopColor="rgb(0,0,0)" stopOpacity="1"/>
                                  </linearGradient>
                                  <filter id="dropshadow" height="130%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                                    <feOffset dx="2" dy="2" result="offsetblur"/>
                                    <feMerge>
                                      <feMergeNode/>
                                      <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                  </filter>
                                </defs>
                                <polygon points="400,400 200,0 0,400" stroke="#151C60" strokeWidth="3"/>
                              </svg>
                            </div>
                            <NavLinks className={'nav-links relative z-20 pr-8'}>
                              <br/>
                              <br/>
                              <br/>
                              <Link to="/">> Me <br/></Link>
                              <Link to="/page-2">>>> HOW <br/></Link>
                              <Link to="/career">> Career <br/></Link>
                              > Artwork <br/>
                              <Link to="https://github.com/chrisjosephs"
                                    className={"z-20 relative"}
                                    target={'_blank'}>> github
                                / bitbucket <br/></Link>
                              <br/>
                              <a href={'mailto:digibitsy@gmail.com'}>>
                                contact <br/> </a>
                              > blog <br/>
                            </NavLinks>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"container top-0 min-h-screen absolute"}>
                      <div className="flex h-screen"
                           style={{paddingTop: "100px"}}>
                        <div className={"w-1/2 md:w-2/3  h-full"}></div>
                        <div className={"w-1/2 md:w-1/3 h-full octo-pirate-outer"}>
                          <div className={"octo-pirate"}>
                            <OctoPirate
                                      mouse={mouse} style={{width:'300px', height:'400px'}}></OctoPirate>
                          </div>
                          <Moon></Moon>
                        </div>
                      </div>
                    </div>
                    <div className={"main"}>
                      {/* <Invaders/>*/}
                      {/*  <Rocket/> */}
                      {location.pathname !== "/me" &&
                          <Transition location={location}>
                            <MatrixLetters
                                trigger={RegExp('\/page-2(.*)').test(location.pathname)
                                    ? 1
                                    : 0}/>
                            <div
                                className="flex z-9 text-white p-10 bg-gray-700 opacity-75 z-0"
                                style={{
                                    position: "relative",
                                    zIndex: 9,
                                 display: location.pathname === "/page-2"
                                      ? 'none'
                                      : 'block'

                                }}>
                              <main className="my-8 mb-20 w-full"
                                    style={{position: "relative", zIndex: "5"}}>
                                <div className="cutout"></div>
                                {children}</main>
                            </div>
                          </Transition>}
                    </div>
                  </div>

                  <footer
                      className={"relative bottom-0 content-center w-full text-center z-10"}
                      style={{marginTop: "-42vh"}}>
                    <Geoscape className={"z-30"} style={{
                      position: "absolute",
                      height: "50vh",
                    }}></Geoscape>
                    { /*
                        <div className={"container mx-auto"}>

                             <img className={"object-contain w-full bg-transparent m-0"} style={{maxHeight: "15vh"}}
                                 src={planetImg}/>
                        </div>
                        */}
                    <div className={"mx-auto bg-black text-gray-200 z-50" +
                        "" +
                        " relative"}
                         style={{height: "2rem", marginTop: "-2rem"}}>
                      © {new Date().getFullYear()}, Built with
                      {` `}
                      React | <a href="https://www.gatsbyjs.org">Gatsby</a>,
                      Threejs,
                      Drupal,
                      graphQL, Tailwind
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
              </>
          )}
      />
  );
};
const NavLinks = styled.div`
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
  a:hover {
    color: #fff;
    text-shadow:2px 2px 30px #fff;;
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
  }
`;
const Moon = styled.div`
  position: relative;
  background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Moon.svg?sanitize=true) right 150% no-repeat;
  width: 100%;
  height: 100%;
  z-index: 1 !important;
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
    filter: url(#dropshadow);
    position: absolute;
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    top: 14em;
    z-index: 8;
    @keyframes dash {
        0% {
            stroke-dashoffset: 1200;
        }
        70% {
            stroke-dashoffset: 0;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
`;
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
