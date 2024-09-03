import * as THREE from "three"
import React, {Component, Suspense, useEffect, useRef, useState} from "react"
import {useLoader, useFrame, Canvas, useThree, useUpdate} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import lerp from "lerp"
import {getMouseDegrees} from "../util/utils"
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react';
import PropTypes from "prop-types";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js';
import { noise } from "./perlin.js";
import ResizeObserver from "resize-observer-polyfill";

class Geoscape extends Component {
    heightmap;
    terrain;
    planet;
    clock;

    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.camera = this.cameraDefault();
    }

    cameraDefault() {
        const aspect = 1;  // the canvas default
        var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
        camera.position.z = 1000;
        camera.position.y = 200;
        return camera;
    }
    render() {
        if (typeof window !== "undefined") {
            return this.scene();
        }
    }
    draw(){
        // requestAnimationFrame(render);
        const delta = this.clock.getDelta();
        /*
        badTVPass.uniforms['time'].value = delta;
        filmPass.uniforms['time'].value = delta;
        staticPass.uniforms['time'].value = delta;
         this.planet.rotateY(-0.001)
            */
        this.terrain.position.z += 4;
        if (!(this.terrain.position.z % 100)) {
            let i;
            for (i = 0; i < 41; i++)
                this.heightmap.unshift(this.heightmap.pop());

            for (i = 0; i < this.terrain.children[0].geometry.vertices.length; i++) {
                this.terrain.children[0].geometry.vertices[i].z = this.heightmap[i];
                this.terrain.children[0].geometry.verticesNeedUpdate = true;
            }

            this.terrain.children[0].geometry.computeFlatVertexNormals();
            this.terrain.position.z = this.terrain.position.z % 100;
        }
        // composer.render(delta);
        //  renderer.render(scene, camera);
    }


    scene(){
        return (
            <>
                <Canvas resize={{ scroll: false, polyfill: ResizeObserver }} className={"canvas"} style={{ height: "50vh"}} pixelRatio={1} camera={this.camera}>
                <ambientLight color={"0xFFFFFF"} intensity={0.3} />
                <directionalLight color={"0xFFFFFF"} intensity={1} position={[0,2000,-2800]} />
                <spotLight color={"0xd30491"} intensity={20} distance={3000} angle={Math.PI} position={[0, 1500, -1300]} />
                <Terrain />
                </Canvas>
            </>
        )
    }
}
export default Geoscape;

function Terrain(){
    let terrain = SceneUtils.createMultiMaterialObject(
        new THREE.PlaneGeometry(4000, 4000, 40, 40), [
            new THREE.MeshLambertMaterial({
                color: 0x256399
            }),
            new THREE.MeshBasicMaterial({
                color: 0x256399,
                wireframe: true
            })
        ]
    );
    let heightmap = [];
    for (let i = 0; i < terrain.children[0].geometry.vertices.length; i++) {
        heightmap[i] = Math.random() * 140;
        terrain.children[0].geometry.vertices[i].setZ(heightmap[i]);
    }
    terrain.children[0].geometry.computeFlatVertexNormals();
    terrain.rotateX(-Math.PI / 2);
    const meshRef = useRef();
    // Raf loop
    useFrame(() => {
        terrain.position.z += 4;
        if (!(terrain.position.z % 100)) {
            for (var i = 0; i < 41; i++)
                heightmap.unshift(heightmap.pop());

            for (var i = 0; i < terrain.children[0].geometry.vertices.length; i++) {
                terrain.children[0].geometry.vertices[i].z = heightmap[i];
                terrain.children[0].geometry.verticesNeedUpdate = true;
            }

            terrain.children[0].geometry.computeFlatVertexNormals();
            terrain.position.z = terrain.position.z % 100;
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <primitive object={terrain}/>
                <planeBufferGeometry attach={terrain.children[0].geometry} args={[25, 25, 75, 75]} />
                <planeBufferGeometry attach={terrain.children[1].geometry} args={[25, 25, 75, 75]} />
                <meshLambertMaterial
                    attach={terrain.children[0].material}
                />
                <meshBasicMaterial
                    attach={terrain.children[1].material}
                />
            </mesh>
        </>
    );
}

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
margin: -35px 0 0 -75px;
border-radius: 50%;
border: 3px solid transparent;
border-top-color: #9370DB;
-webkit-animation: ${spin} 2s linear infinite;
animation: ${spin} 2s linear infinite;
z-index:3;

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
