import * as THREE from "three"
import ReactDOM from 'react-dom'
import React, {Component, Suspense, useMemo, useRef} from 'react'
import {Canvas, useLoader, useFrame, useUpdate} from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ThreeDText extends Component {

    render() {
        return this.digiTitleCanvas();
    }
    digiTitleCanvas(){
        return (
            <div className={"DigiTitleCanvas"}>
            <Canvas camera={{ position: [0, 0, 35] }}>
                <ambientLight intensity={2} />
                <pointLight position={[40, 40, 40]} />
                <Suspense fallback={null}>
                    <Jumbo />
                </Suspense>
            </Canvas>
            </div>
        )
    }

}

function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
    const font = useLoader(THREE.FontLoader, "Orbitron Black_Regular.json");
    const config = useMemo(
        () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
        [font]
    )
    const mesh = useUpdate(
        (self) => {
            const size = new THREE.Vector3()
            self.geometry.computeBoundingBox()
            self.geometry.boundingBox.getSize(size)
            self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
            self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top'? 0 : -size.y
        },
        [children]
    )
    console.log(children);
    console.log(mesh);
    return (
        <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
            <mesh ref={mesh}>
                <textBufferGeometry args={[children, config]} />
                <meshNormalMaterial color={Math.random()*0xffffff}/>
            </mesh>
        </group>
    )
}
function Jumbo() {
    const ref = useRef()
    useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.1))
    return (
        <group ref={ref}>
            <Text hAlign="left" position={[0, 4.2, 0]} children="REACT" />
            <Text hAlign="left" position={[0, 0, 0]} children="THREE" />
            <Text hAlign="left" position={[0, -4.2, 0]} children="FIBER" />
            <Text hAlign="left" position={[12, 0, 0]} children="5" size={3} />
            <Text hAlign="left" position={[16.5, -4.2, 0]} children="X" />
        </group>
    )
}


export default ThreeDText
