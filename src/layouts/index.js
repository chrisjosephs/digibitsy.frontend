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
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Invaders from '../components/invaders'
import "./layout.css"
import '../css/global.css'
import {StaticQuery} from "../../.cache/gatsby-browser-entry";
import Transition from '../components/transition'
import Rocket from "../components/rocket";
import MatrixLetters from "../components/matrix";
import {Canvas, useFrame, useLoader} from "react-three-fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import {getMouseDegrees, getMousePos} from "../components/utils";
import lerp from "lerp";
import background from '../images/piqsels.com-id-fvkta.jpg'
import {css} from "styled-components";
import {TransitionGroup} from "react-transition-group";

const Layout = ({children, location}) => {
    const mouse = useRef({x: 0, y: 0});
    const CanvasModel = props => {
        return (
            <Canvas height={"600px"}
                    pixelRatio={window.devicePixelRatio} camera={{camera}}>

                <directionalLight
                    position={[2.2, 3.4, 1]}
                    rotation={[2.3, 0.8, -2.14]}
                    color={0xffffff}
                    castShadow={false}
                    scale={[1,1,1]}
                />
                <hemisphereLight skyColor={"black"} groundColor={0xffffff} intensity={0.68} position={[0, 2, 0]} />
                <mesh position={[0, 0, -10]} >
                    <circleBufferGeometry attach="geometry" args={[8, 64]} />
                    <meshLambertMaterial transparent={true} attach="material" color="lightpink" opacity={0.7 }/>
                </mesh>

                <Suspense fallback={null}>
                    <Model mouse={mouse} position={[0,-0.3,0]} />
                </Suspense>
            </Canvas>
        )
    }
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
                            <CanvasModel/>
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


function Model({ mouse, ...props }) {
    const group = useRef()

    const { nodes, scene, scenes, animations } = useLoader(GLTFLoader, "/octoanka6.glb")

    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    function moveJoint(mouse, joint, degreeLimit = 45 ) {
        let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
        joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.x, 0.1)
        joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.y, 0.1)
        joint.rotation.x =  -0.1 + THREE.Math.degToRad(joint.rotation.xD)
        joint.rotation.z = -0.5 + THREE.Math.degToRad(joint.rotation.yD)
    }


    useFrame((state, delta) => {
        mixer.update(delta)
    })
    useFrame((state, delta) => {
        mixer.update(delta)
        moveJoint(mouse, nodes.Neck_M_0297);
    })

    useFrame((state, delta) => mixer.update(delta))
    /* No Animations yet
    useEffect(() => {
        actions.current = { idle: mixer.clipAction(animations[8], group.current) }
        actions.current.idle.play()
        return () => animations.forEach(clip => mixer.uncacheClip(clip))
    }, [])
*/
    useFrame((state, delta) => {
        mixer.update(delta)
        // moveJoint(mouse, nodes.mixamorigNeck)
        // moveJoint(mouse, nodes.mixamorigSpine)
    })
    console.log("nodes");
    console.log(nodes);
    console.log("scenes");
    console.log(scenes);
    // scenes[0]["children"][3].material.metalness = 1 ;
    // scenes[0]["children"][3].material.roughness = 0.55;
    // scenes[0]["children"][3].material.shininess = 0.5;
    var textureLoader = new THREE.TextureLoader();
    var MetalRusted = textureLoader.load('/rm.jpg');

    var material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        metalness: 0.95,   // between 0 and 1
        roughness: 0.65, // between 0 and 1
        envMapIntensity: 1,
        map: MetalRusted,

    } );
    nodes['octopus_hat_high_octopus_hat_tex_0'].visible = true;
    nodes['anchor'].material = material;
    nodes['octopus_body_high_Octopus_body_tex_0'].material.metalness = 0.1;
    const ref = useRef()

    useFrame(({ clock }) => (
        nodes["Armature_0"].rotation.x  = nodes["Armature_0"].rotation.y =nodes["Armature_0"].rotation.z = Math.sin(clock.getElapsedTime()) * -0.3))

    return (
        <group ref={ref} rotation={[2, 0, 0]} ref={group} {...props} dispose={null}>
            <primitive object={nodes["Armature_0"]} />
           
        </group>
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
const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 5, 0);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
