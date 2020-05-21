/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {Suspense, useRef, useState} from "react"
import BigBangStarField from 'react-big-bang-star-field'
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"
import Header from "../components/header"
import styled from '@emotion/styled'
import Invaders from '../components/invaders'
import "./layout.css"
import '../css/global.css'
import {StaticQuery} from "../../.cache/gatsby-browser-entry";
import Transition from '../components/transition'
import MatrixLetters from "../components/matrix";
import {Canvas, useFrame, useLoader} from "react-three-fiber";
import * as THREE from "three";
import {getMousePos} from "../components/utils";
import background from '../images/piqsels.com-id-fvkta.jpg'
import OctoPirateCanvas from "../components/Octopirate";



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
                <Header siteTitle={data.site.siteMetadata.title}/>
                <div
                    style={{
                        'overflowX': 'hidden',
                        'padding': '0px; margin: 0px',
                        'width': '100%',
                        'height': '100%'
                    }}>

                    <div className={"container mx-auto"}>
                        <div className="flex">
                        <div className={"md:w-2/3"}></div>
                        <div className={"md:w-1/3"} style={{height: "600px"}}>
                            <OctoPirateCanvas mouse={mouse}/>
                        </div>
                        </div>

                        <Invaders/>
                        {/*  <Rocket/> */}
                        <Transition location={location} >
                            <MatrixLetters triggerAnim={location.pathname==="/page-2/" ?1:0}/>
                            <main style={{position: "relative", zIndex:"10"}}>{children}</main>
                        </Transition>

                    </div>

                </div>
                <footer className={"fixed bottom-0 content-center bg-gray-400 w-full text-center"}>
                    <div className={"container mx-auto"}>
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


function CloudTitle() {
    return(
        <>
            <h2>Final Product</h2>
            <div className="main">
                <div class="cloud_base">
                    <div class="title">
                        Digibitsy
                    </div>
                    <span class="rounds"></span>
                </div>
            </div>
            </>
    )
}
const cloud_base = styled.div`
background: white;
height: 100px;
width: 300px;
border-radius: 50px; /* half of height will do */
position: relative;
top: 120px;
box-shadow:
inset 5px -9px 5px rgba(225, 245, 253, 0.5), 0px 0px 10px 6px rgba(240, 240, 240, 0.7);
-webkit-transition: 0.2s ease-in all;
-moz-transition: 0.2s ease-in all;
transition: 0.2s ease-in all;
&:hover {
 left: 55%;
}
`
const rounds = styled.div`
width: 300px;
border-radius: 50%; /* circle */
position: absolute;
bottom: -30px;
-webkit-box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
-moz-box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
-webkit-transition: 0.2s ease-in all;
-moz-transition: 0.2s ease-in all;
transition: 0.2s ease-in all;
&:hover {
 left: 55%;
}

`

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
