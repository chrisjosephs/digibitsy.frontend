import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import {Link} from "gatsby"
import SEO from "../components/seo"
import {Canvas, useLoader, useFrame, useThree} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import { getMouseDegrees } from "../components/utils.js"
import { getMousePos } from "../components/utils.js"
import lerp from "lerp"

function Model({ mouse, ...props }) {
    const group = useRef()
    const { nodes, scene, scenes, animations } = useLoader(GLTFLoader, "/octoanka3.glb")

    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    function moveJoint(mouse, joint, degreeLimit = 45 ) {
        let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
            joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.x, 0.1)
            joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.y, 0.1)
            joint.rotation.x =  THREE.Math.degToRad(joint.rotation.xD)
            joint.rotation.y = THREE.Math.degToRad(joint.rotation.yD)
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
    scenes[0]["children"][3].material.metalness = 1 ;
    scenes[0]["children"][3].material.roughness = 0.55;
    scenes[0]["children"][3].material.shininess = 0.1;
    scenes[0]["children"][3].material.envMap = scene.background;

    return (
        <group rotation={[0, 0, 0]} ref={group} {...props} dispose={null}>
            <primitive object={nodes["Root_M_0296"]} />
            <mesh visible geometry={nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].geometry} material={nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].material} quaternion={nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].quaternion} scale={nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].scale}  position={nodes['anchorobjcb9289e8-f66e-417d-9586-27500257b6e7_(1)001'].position}></mesh>
            <skinnedMesh visible material={nodes['octopus_body_high_Octopus_body_tex_0'].material} geometry={nodes['octopus_body_high_Octopus_body_tex_0'].geometry} skeleton={nodes['octopus_body_high_Octopus_body_tex_0'].skeleton} rotation={nodes['octopus_body_high_Octopus_body_tex_0'].rotation} scale={nodes['octopus_body_high_Octopus_body_tex_0'].scale}   position={nodes['octopus_body_high_Octopus_body_tex_0'].position} ></skinnedMesh>
            <skinnedMesh visible material={nodes['octopus_hat_high_octopus_hat_tex_0'].material} geometry={nodes['octopus_hat_high_octopus_hat_tex_0'].geometry} skeleton={nodes['octopus_hat_high_octopus_hat_tex_0'].skeleton} rotation={nodes['octopus_hat_high_octopus_hat_tex_0'].rotation}  position={nodes['octopus_hat_high_octopus_hat_tex_0'].position}></skinnedMesh>
        </group>
    )
}
function Plane({ ...props }) {
    return (
        <mesh {...props} receiveShadow>
            <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
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


const CanvasModel = props => {
    const mouse = useRef({x: 0, y: 0});
    return (
        <Canvas height={"600px"} onMouseMove={e => (mouse.current = getMousePos(e))}
                pixelRatio={window.devicePixelRatio} camera={{camera}}>

            <directionalLight
                position={[2, 3, 1]}
                rotation={[2.3, -0.8, -0.14]}
                color={0xffffff}
                castShadow={false}
                scale={[10, 10, 10]}

            />
            <mesh position={[0, 0, -10]}>
                <circleBufferGeometry attach="geometry" args={[8, 64]}/>
                <meshBasicMaterial attach="material" color="lightpink"/>
            </mesh>
            <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -8, 0]}/>
            <Suspense fallback={null}>
                <Model mouse={mouse} position={[0, -1, 0]} scale={[1, 1, 1]}/>
            </Suspense>
        </Canvas>
    )
}
const IndexPage = () => (
    <div className={"IndexPage"}>
        <SEO title="Home"/>
        <h1>Hi muffin</h1>
        <p> default Gatsby starter test site</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
        </div>
        <Link to="/page-2/">Gos to page 2</Link>
        <div style={{height: "600px"}}>
            <CanvasModel/>
        </div>
    </div>
)

export default IndexPage

