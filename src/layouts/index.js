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

                    <div className={"container mx-auto"}>
                        <Header siteTitle={data.site.siteMetadata.title}/>
                        <div className="flex">
                        <div className={"md:w-2/3"}></div>
                        <div className={"md:w-1/3"} style={{height: "600px"}}>
                            <OctoPirateCanvas mouse={mouse}/>
                        </div>
                        </div>

                        {/* <Invaders/>*/}
                        {/*  <Rocket/> */}
                        <Transition location={location} >
                            <MatrixLetters triggerAnim={location.pathname==="/page-2/" ?1:0}/>
                            <main style={{position: "relative", zIndex:"10"}}>{children}</main>
                        </Transition>

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
