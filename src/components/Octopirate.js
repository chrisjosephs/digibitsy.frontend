import * as THREE from "three"
import React, {Suspense, useEffect, useRef, useState} from "react"
import {useLoader, useFrame, Canvas} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import lerp from "lerp"
import {getMouseDegrees} from "./utils"
import styled, {keyframes, css} from 'styled-components';

function moveJoint(mouse, joint, degreeLimit = 45) {
    let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
    joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.x, 0.1)
    joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.y, 0.1)
    joint.rotation.x = -0.1 + THREE.Math.degToRad(joint.rotation.xD)
    joint.rotation.z = -0.5 + THREE.Math.degToRad(joint.rotation.yD)
}

const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 5, 0);

export default function OctoPirateCanvas({mouse, ...props}) {
    return (
        <>
            <LoadingScreen className={"LoadingScreen"}>
                <Loader></Loader>
                <Canvas height={"600px"}
                        pixelRatio={window.devicePixelRatio} camera={{camera}}>

                    <directionalLight
                        position={[2.2, 3.4, 1]}
                        rotation={[2.3, 0.8, -2.14]}
                        color={0xffffff}
                        castShadow={false}
                        scale={[1, 1, 1]}
                    />
                    <hemisphereLight skyColor={"black"} groundColor={0xffffff} intensity={0.68} position={[0, 2, 0]}/>
                    <mesh position={[0, 0, -10]}>
                        <circleBufferGeometry attach="geometry" args={[8, 64]}/>
                        <meshLambertMaterial transparent={true} attach="material" color="lightpink" opacity={0.7}/>
                    </mesh>

                    <Suspense fallback={null}>
                        <OctoPirate mouse={mouse} position={[0, -0.3, 0]}/>
                    </Suspense>
                </Canvas>
            </LoadingScreen>
        </>
    )
}

function OctoPirate({mouse, ...props}) {
    const group = useRef()

    function onTransitionEnd() {

    }

    const {nodes, scene, scenes, animations} = useLoader(GLTFLoader, "/octoanka6.glb", loader => {
        // const dracoLoader = new DRACOLoader()
        // dracoLoader.setDecoderPath('/draco-gltf/')
        // loader.setDRACOLoader(dracoLoader)
    })

    let [mixer] = useState(() => new THREE.AnimationMixer())


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

    var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,   // between 0 and 1
        roughness: 0.65, // between 0 and 1
        envMapIntensity: 1,
        map: MetalRusted,

    });
    nodes['octopus_hat_high_octopus_hat_tex_0'].visible = true;
    nodes['anchor'].material = material;
    nodes['octopus_body_high_Octopus_body_tex_0'].material.metalness = 0.1;


    useFrame(({clock}) => (
        nodes["Armature_0"].rotation.x = nodes["Armature_0"].rotation.y = nodes["Armature_0"].rotation.z = Math.sin(clock.getElapsedTime()) * -0.3))


    const ref = useRef()
    return (
        <>
            <group ref={ref} rotation={[2, 0, 0]} ref={group} {...props} dispose={null}>
                <primitive object={nodes["Armature_0"]}/>
            </group>
        </>
    )
}

const LoadingScreen = styled.div`
z-index: 2;
opacity: 1;
width: 100%;
    height: 100%;
transition: 1s opacity;
&.fade-out{
  opacity: 0;
}
`
const spin = keyframes`
0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
display: block;
position: relative;
left: 50%;
top: 50%;
width: 150px;
height: 150px;
margin: -75px 0 0 -75px;
border-radius: 50%;
border: 3px solid transparent;
border-top-color: #9370DB;
-webkit-animation: ${spin} 2s linear infinite;
animation: ${spin} 2s linear infinite;
&&:before {
content: "";
position: absolute;
top: 5px;
left: 5px;
right: 5px;
bottom: 5px;
border-radius: 50%;
border: 3px solid transparent;
border-top-color: #BA55D3;
-webkit-animation: ${spin} 3s linear infinite;   
animation: ${spin} 3s linear infinite;
}
&&:after {
content: "";
position: absolute;
top: 15px;
left: 15px;
right: 15px;
bottom: 15px;
border-radius: 50%;
border: 3px solid transparent;
border-top-color: #FF00FF;
-webkit-animation: ${spin} 1.5s linear infinite;
animation: ${spin} 1.5s linear infinite;
}
`

