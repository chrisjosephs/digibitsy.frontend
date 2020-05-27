/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Suspense, useRef, useState} from "react"
import BigBangStarField from 'react-big-bang-star-field'
import PropTypes from "prop-types"
import {useStaticQuery, graphql, Link} from "gatsby"
import Header from "../components/header"
import "./layout.css"
import '../css/global.css'
import {StaticQuery} from "../../.cache/gatsby-browser-entry";
import Transition from '../components/transition'
import MatrixLetters from "../components/matrix";
import {getMousePos} from "../components/utils";
import background from '../images/piqsels.com-id-fvkta.jpg'
import OctoPirate from "../components/Octopirate";
import planetImg from "../images/planet3.gif"
import {TransitionGroup} from "react-transition-group";

const Layout = ({children, location}) => {
    const mouse = useRef({x: 0, y: 0});

    return(
    <StaticQuery
        query={graphql`query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }`}
        render={data => (
            <div onMouseMove={e => (mouse.current = getMousePos(e))}>
                <BigBangStarField
                    className="Big-Bang-Star-Field"

                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        zIndex: '-10',
                        background: `url(${background})`,
                        backgroundSize: 'cover'
                    }}
                />

                    <div className={"container mx-auto"}>
                        <Header siteTitle={data.site.siteMetadata.title}/>
                        <div className="flex" style={{marginTop: "100px"}}>
                        <div className={"md:w-2/3"}>
                            <div className={"md:w-1/4 text-gray-300 p-8 z-20"} style={{fontFamily: "Orbitron",  fontWeight: "400"}}>
                                <br />
                                <br />
                                <br />
                                <Link to="/" className={"z-20 relative"}>> Me <br/></Link>
                                <Link to="/page-2/" className={"z-20 relative"}>>  HOW <br/></Link>
                                <Link to="/career/" className={"z-20 relative"}>> Career <br/></Link>
                            > Artwork <br/>
                            > github / bitbucket <br/>
                            > contact <br/>

                            </div>
                        </div>
                        <div className={"md:w-1/3 z-10"} style={{marginTop: "100px", height: "420px"}}>
                            <OctoPirate mouse={mouse}/>
                        </div>
                        </div>


                        {/* <Invaders/>*/}
                        {/*  <Rocket/> */}
                        <Transition location={location} >
                            <MatrixLetters trigger={location.pathname==="/page-2/" ?1:0}/>
                            <div className="flex text-white p-10 bg-gray-700 opacity-75 z-0" style={{marginTop: "-150px"}}>
                            <main className="my-8 mb-20" style={{position: "relative", zIndex:"10"}}>
                                <div className="cutout" style={{position:"relative", float:"right", top: "0", right: "0", width: "33%", height: "60px", marginBottom: "1.45rem"}}></div>{children}</main>
                            </div>
                        </Transition>
                    </div>

                <footer className={"fixed bottom-0 content-center w-full text-center"}>
                    <div className={"container mx-auto"}>
                    <img className={"object-contain w-full bg-transparent m-0"} src={planetImg} />
                    </div>
                    <div className={"mx-auto bg-black text-gray-200"}>
                        © {new Date().getFullYear()}, Built with
                        {` `}
                        React / <a href="https://www.gatsbyjs.org">Gatsby</a>, Threejs (where opengl supported),
                        Drupal 8,
                        graphQL, Tailwind css
                    </div>
                </footer>
            </div>
        )}
    />
    )
}



function Plane({ ...props }) {
    return (
        <mesh {...props} receiveShadow>
            <planeGeometry attach="geometry"   args={[5000, 5000, 1, 1]} />
            <meshLambertMaterial attach="material" color="#9b9b9b" transparent opacity={0.2} />
        </mesh>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
