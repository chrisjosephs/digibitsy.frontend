import * as THREE from "three"
import React, {Component, Suspense, useEffect, useRef, useState} from "react"
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

class Octopirate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.camera = this.cameraDefault();
    }

    setLoaded = (loadedValue) => {
        this.setState({loaded: loadedValue});
    }

    static propTypes = {
        mouse: PropTypes.object
    }
    static defaultProps = {
        mouse: {
            current:
                { x: 360, y: 150}
        }
    };

    cameraDefault() {
        const fov = 45;
        const aspect = 1;  // the canvas default
        const near = 0.1;
        const far = 2000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(30, 0, 30);
        return camera;
    }


    render() {
        return this.OctoPirateCanvas(this.props.mouse);
    }

    componentDidMount() {
        // move load model to componentdidmount

    }

    OctoPirateCanvas(mouse, ...props) {
        return (
            <>
                <Wrapper style={this.props.style}>
                    <Loader className={this.state.loaded ? 'fade-out' : ''}></Loader>
                    <Canvas className={"octoPirate"}>

                        <directionalLight
                            position={[2.2, 3.4, 1]}
                            rotation={[2.3, 0.8, -2.14]}
                            color={0xffffff}
                            castShadow={false}
                            scale={[1, 1, 1]}
                        />
                        <hemisphereLight skyColor={"black"} groundColor={0xffffff} intensity={0.68}
                                         position={[0, 2, 0]}/>
                        {/*
                                         <mesh position={[0, 0, -10]}>
                            <circleBufferGeometry attach="geometry" args={[8, 64]}/>
                            <meshLambertMaterial transparent={true} attach="material" color="lightpink" opacity={0.7}/>
                        </mesh>
                        */}
                        <Suspense fallback={null}>
                            <CameraController/>
                            <Model mouse={mouse} setLoaded={loaded => this.setLoaded(loaded)} position={[-0.1, 0, 0]}/>
                        </Suspense>
                    </Canvas>
                </Wrapper>
            </>
        )
    }
}

const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            camera.position.z = 3.6;
            const controls = new OrbitControls(camera, gl.domElement);
            controls.enableZoom = false;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

function moveJoint(mouse, joint, degreeLimit = 45) {
    let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
    joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.x, 0.1)
    joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.y, 0.1)
    joint.rotation.x = -0.1 + THREE.MathUtils.degToRad(joint.rotation.xD)
    joint.rotation.z = -0.5 + THREE.MathUtils.degToRad(joint.rotation.yD)
}

function Model({mouse, ...props}) {
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

    useFrame((state, delta) => {
        mixer.update(delta)
    })
    useFrame((state, delta) => {
        mixer.update(delta);
        if (mouse.current.x !== 0 && mouse.current.y !== 0) {
            moveJoint(mouse, nodes.Neck_M_0297);
        }
    })

    useFrame((state, delta) => mixer.update(delta))
    /* No Animations yet
    useEffect(() => {
        actions.current = { idle: mixer.clipAction(animations[8], group.current) }
        actions.current.idle.play()
        return () => animations.forEach(clip => mixer.uncacheClip(clip))
    }, [])
*/
    var textureLoader = new THREE.TextureLoader();
    var MetalRusted = textureLoader.load('/rm.jpg');

    var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,   // between 0 and 1
        roughness: 0.65, // between 0 and 1
        envMapIntensity: 1,
        map: MetalRusted,

    });
    nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].material = material;
    //  nodes['anchor'].material = material;
    nodes['octopus_hat_high_octopus_hat_tex_0'].visible = true;

    nodes['octopus_body_high_Octopus_body_tex_0'].material.metalness = 0.1;

    useFrame(({clock}) => (
        nodes["Armature_0"].rotation.x = nodes["Armature_0"].rotation.y = nodes["Armature_0"].rotation.z = Math.sin(clock.getElapsedTime()) * -0.3));

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
    top: 100px;
    height: 100px;
    width: 100px;
    left: 70%;
    ${media.sm`
        left: 50%;
        top: 50%;
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

