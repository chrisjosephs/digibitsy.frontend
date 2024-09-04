import * as THREE from "three"
import {sRGBEncoding} from "three"
import React, {Suspense, useEffect, useRef, useState} from "react"
import {Canvas, useFrame, useLoader, useThree} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import lerp from "lerp"
import {getMouseDegrees} from "../util/utils"
import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'
import PropTypes from "prop-types";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import media from '../util/breakpoints';


const Octopirate = ({mouse = {current: {x: 360, y: 150}}, style}) => {
    const [loaded, setLoaded] = useState(false);

    const OctoPirateCanvas = () => (
        <Wrapper style={style}>
            <Loader className={loaded ? 'fade-out' : ''}></Loader>
            <Canvas
                className={"octoPirate"}
                pixelRatio={window.devicePixelRatio > 1 ? 1.5 : 1}
                onCreated={({gl}) => {
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.outputEncoding = sRGBEncoding;
                }}
            >
                <directionalLight
                    position={[2.2, 3.4, 1]}
                    rotation={[2.3, 0.8, -2.14]}
                    color={0xffffff}
                    castShadow={false}
                    intensity={0.5}
                />
                <hemisphereLight
                    skyColor={"black"}
                    groundColor={0xffffff}
                    intensity={0.68}
                    position={[0, 2, 0]}
                />
                <Suspense fallback={null}>
                    <CameraController/>
                    <Model mouse={mouse} setLoaded={setLoaded} position={[-0.1, 0, 0]}/>
                </Suspense>
            </Canvas>
        </Wrapper>
    );

    return <OctoPirateCanvas/>;
};

Octopirate.propTypes = {
    mouse: PropTypes.object,
    style: PropTypes.object
};

const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(() => {
        camera.position.z = 3.6;
        const controls = new OrbitControls(camera, gl.domElement);
        controls.enableZoom = false;
        return () => {
            controls.dispose();
        };
    }, [camera, gl]);
    return null;
};

function moveJoint(mouse, joint, degreeLimit = 45) {
    let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit);
    joint.rotation.xD = lerp(
        joint.rotation.xD || 0,
        degrees.x,
        0.1
    );
    joint.rotation.yD = lerp(
        joint.rotation.yD || 0,
        degrees.y,
        0.1
    );
    joint.rotation.x = -0.1 + THREE.MathUtils.degToRad(joint.rotation.xD);
    joint.rotation.z = -0.5 + THREE.MathUtils.degToRad(joint.rotation.yD);
}

const Model = ({ mouse, ...props }) => {
    // Throttle function
    const useThrottle = (callback, fps) => {
        const lastCallRef = useRef(0);

        return (state) => {
            const now = state.clock.getElapsedTime();
            if (now - lastCallRef.current > 1 / fps) {
                callback(state);
                lastCallRef.current = now;
            }
        };
    };
    const group = useRef()
    const loadingManager = new THREE.LoadingManager(() => {
        props.setLoaded(true);
    });
    const {nodes, scene, scenes, animations} = useLoader(GLTFLoader, "/octoankaarmdecimatedraco2.glb", loader => {
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/DRACOLoader.js")
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);
        loader.manager = loadingManager;
    })
    // stare forward when first loaded
    moveJoint({
        current: {
            x: 360,
            y: 150
        }
    }, nodes.Neck_M_0297);

    let [mixer] = useState(() => new THREE.AnimationMixer());

    const throttle = useThrottle(({clock}) => {
        const elapsedTime = clock.getElapsedTime();
        const rotationValue = Math.sin(elapsedTime) * -0.3;
        nodes["Armature_0"].rotation.x = rotationValue;
        nodes["Armature_0"].rotation.y = rotationValue;
        nodes["Armature_0"].rotation.z = rotationValue;
        if (mouse.current.x !== 0 && mouse.current.y !== 0) {
            moveJoint(mouse, nodes.Neck_M_0297);
        }
    }, 30); // Targeting 30 FPS
    useFrame(throttle);

    // useFrame((state, delta) => mixer.update(delta))
    /* No Animations yet
    useEffect(() => {
        actions.current = { idle: mixer.clipAction(animations[8], group.current) }
        actions.current.idle.play()
        return () => animations.forEach(clip => mixer.uncacheClip(clip))
    }, [])
*/



    const ref = useRef()
    return (
        <>

            <group ref={ref} rotation={[2, 0, 0]} ref={group} {...props} dispose={null}>
                <primitive object={nodes["Armature_0"]}/>
            </group>
        </>
    )
}

export default Octopirate;
const Planet = styled.div`
    position: absolute;
    height: 400px;
    opacity: 0.7;
    width: 400px;
    background-color: lightpink;
    border-radius: 50%;
    display: inline-block;
`

const Wrapper = styled.div`
    z-index: 2;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s opacity;
    margin-top: -90px;

    && .fade-out {
        opacity: 0;
        transition: 0.3s opacity;
    }

    -webikit-animation: moon-move-in 2.4s 1s forwards;
    animation: moon-move-in 2.4s 1s forwards;
    @keyframes moon-move-in {
        0% {
            opacity: 0;
        }
        99% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
`
const spin = keyframes`
    0% {
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
    margin: -35px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #9370DB;
    -webkit-animation: ${spin} 2s linear infinite;
    animation: ${spin} 2s linear infinite;
    z-index: 3;
    top: 150px;
    height: 140px;
    width: 140px;
    left: 30%;

    ${media.sm`
        left: 50%;
        top: 65%;
        width: 150px;
        height: 150px;
       `
    }
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

