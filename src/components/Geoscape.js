import * as THREE from "three"
import React, {Component, Suspense, useEffect, useRef, useState} from "react"
import {useLoader, useFrame, Canvas, useThree, useUpdate} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import lerp from "lerp"
import {getMouseDegrees} from "./utils"
import styled from '@emotion/styled'
import {jsx, css, keyframes} from '@emotion/core'
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
        return this.scene();
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
                <Canvas resize={{ scroll: false, polyfill: ResizeObserver }} className={"canvas"} style={{ height: "50vh"}} pixelRatio={window.devicePixelRatio} camera={this.camera}>
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
/**
var container = document.getElementById("container");
var width = container.clientWidth;
var height = container.clientHeight;
var aspect = width / height;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
container.appendChild(renderer.domElement);
var scene = new THREE.Scene();
scene.add(
    new THREE.AmbientLight(0xFFFFFF, 0.3)
);
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2000, -2800);
scene.add(light);
var spotLight = new THREE.SpotLight(0xd30491, 20, 3000, Math.PI);
spotLight.position.set(0, 1500, -1300);
var spotTarget = new THREE.Object3D();
spotTarget.position.set(0, 0, 0);
spotLight.target = spotTarget;

scene.add(spotTarget);
scene.add(spotLight);
scene.add(new THREE.PointLightHelper(spotLight, 1));

var terrain = THREE.SceneUtils.createMultiMaterialObject(
    new THREE.PlaneGeometry(4000, 4000, 40, 40), [
        new THREE.MeshLambertMaterial({
            color: 0x356399
        }),
        new THREE.MeshBasicMaterial({
            color: 0x356399,
            wireframe: true
        })
    ]
);

heightmap = [];
for (var i = 0; i < terrain.children[0].geometry.vertices.length; i++) {
    heightmap[i] = Math.random() * 100;
    terrain.children[0].geometry.vertices[i].setZ(heightmap[i]);
}

terrain.children[0].geometry.computeFlatVertexNormals();
terrain.rotateX(-Math.PI / 2);

scene.add(terrain);
 */


/** TO DO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
background = new THREE.Scene();

var bgcamera = new THREE.PerspectiveCamera(50, aspect, 0.1, 20000);
bgcamera.position.z = 20000;
bgcamera.position.y = 0;

background.add(
    new THREE.AmbientLight(0x0878af, 2)
);

var light2 = new THREE.DirectionalLight(0xffffff, 10);
light2.position.set(0, -10000, 30000);

//background.add(light2);

var planet = THREE.SceneUtils.createMultiMaterialObject(
    new THREE.IcosahedronGeometry(7000, 3), [
        new THREE.MeshLambertMaterial({
            color: 0xffffff
        }),
        new THREE.MeshBasicMaterial({
            color: 0x356399,
            wireframe: true
        })
    ]
);
planet.position.y -= 1500;
background.add(planet);


var spotLight3 = new THREE.SpotLight(0xFFFFFF, 7, 10000, Math.PI);
spotLight3.position.set(1000, 0, 10000);
spotLight3.target = planet.children[0];

background.add(spotLight3);

for (i = 0; i < 50; i++) {
    particles = new THREE.Points(
        new THREE.Geometry(),
        new THREE.PointsMaterial({
            size: Math.random() * 80
        })
    );
    for (j = 0; j < 50; j++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * width * 100 - width * 100 / 2;
        vertex.y = Math.random() * height * 100 - height * 100 / 2;
        vertex.z = 0;
        particles.geometry.vertices.push(vertex);
        particles.material.color.setScalar(Math.random() * 0.4 + 0.2);
    }
    background.add(particles);
}

renderer.setClearColor(0x000000, 1);
renderer.autoClear = false;

composer = new THREE.EffectComposer(renderer);
backgroundPass = new THREE.RenderPass(background, bgcamera);
backgroundPass.clear = true;
backgroundPass.clearDepth = true;
composer.addPass(backgroundPass);
/*
effectHorizBlur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
effectVertiBlur = new THREE.ShaderPass( THREE.VerticalBlurShader );
effectHorizBlur.uniforms[ "h" ].value = 0.5 / width;
effectVertiBlur.uniforms[ "v" ].value = 0.5 / height;
composer.addPass( effectHorizBlur );
composer.addPass( effectVertiBlur );

let renderPass = new THREE.RenderPass(scene, camera);
renderPass.clear = false;
renderPass.clearDepth = true;
renderPass.renderToScreen = true;

composer.addPass(renderPass);

let badTVPass = new THREE.ShaderPass(THREE.BadTVShader);
badTVPass.uniforms["distortion"].value = 1.;
badTVPass.uniforms["distortion2"].value = 1.;
badTVPass.uniforms["rollSpeed"].value = .1;

let staticPass = new THREE.ShaderPass(THREE.StaticShader);
staticPass.uniforms["amount"].value = 0.08;
staticPass.uniforms["size"].value = 2;

let filmPass = new THREE.ShaderPass(THREE.FilmShader);
filmPass.uniforms["sCount"].value = 1600;
filmPass.uniforms["sIntensity"].value = 0.45;
filmPass.uniforms["nIntensity"].value = 0.2;
filmPass.uniforms["grayscale"].value = 0;

let rgbPass = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbPass.uniforms["angle"].value = 0 * Math.PI;
rgbPass.uniforms["amount"].value = 0.001;
composer.addPass(rgbPass);

composer.addPass(staticPass);
composer.addPass(filmPass);
badTVPass.renderToScreen = true;
composer.addPass(badTVPass);

var clock = new THREE.Clock();


 */
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
