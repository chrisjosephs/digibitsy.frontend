import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import {Link} from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"
import {Canvas, useLoader, useFrame, useThree} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";

function Model(props) {
    const MODEL_PATH = '/Q3sC-background.glb';
    const gltf = useLoader(GLTFLoader, MODEL_PATH);

    const mixer = useMemo(() => new THREE.AnimationMixer(), []);
    const {current: camera} = useRef(new THREE.PerspectiveCamera(50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000))
    const group = useRef();

    // Update animation mixer every frame
    useFrame((state, delta) => mixer.update(delta));
    useEffect(() => {
        // Play animation on mount
        mixer.clipAction(gltf.animations[0], group.current).play();
        camera.position.set(1, 0.6, 4)
    }, [camera]);

    return (
        <group ref={group} {...props}>
            <scene name="Scene">
                <object3D
                    name="Camera"
                    position={[12.556556701660156, 3.3321242332458496, 81.7912368774414]}
                    rotation={[1.6560387036953628, 0.0003930388864899566, 0.004599632799317465]}>
                    <perspectiveCamera camera={camera} name="Camera_Orientation" rotation={[-1.5707962925663537, 0, 0]}/>
                </object3D>
                <object3D
                    name="Light001"
                    position={[9.748876571655273, 15.034332275390625, 9.077926635742188]}
                    rotation={[1.8901259643076738, 0.8805683470227423, -2.045215994363619]}>
                    <pointLight name="Light001_Orientation" rotation={[-1.5707962925663537, 0, 0]}/>
                </object3D>
                <object3D
                    name="Light003"
                    position={[11.24433708190918, 14.78339958190918, -18.964303970336914]}
                    rotation={[1.8901259643076738, 0.8805683470227423, -2.045215994363619]}>
                    <pointLight name="Light003_Orientation" rotation={[-1.5707962925663537, 0, 0]}/>
                </object3D>
                <mesh name="Cube" position={[0, 6.313396453857422, 0]} scale={[10, 10, 10]}>
                    <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
                    <meshStandardMaterial attach="material" {...gltf.__$[7].material} name="Material"/>
                </mesh>
            </scene>
        </group>
    )
}


function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
            onPointerOver={e => setHover(true)}
            onPointerOut={e => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}
const IndexPage = () => (
    <div className={"IndexPage"}>
        <SEO title="Home"/>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
            <Image/>
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        <Canvas
            className="MuffinMan pin-b">
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Suspense fallback={null}>
                <Model/>
            </Suspense>
        </Canvas>
    </div>
)

export default IndexPage
