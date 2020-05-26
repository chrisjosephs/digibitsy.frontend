//main app
import * as THREE from "three"
import React, {Component, Suspense, useEffect, useRef, useState} from "react"
import {useLoader, useFrame, Canvas} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {Component} from "react";

class HeadOld extends Component {
    constructor() {
        super();
        this.time = 0;
        this.clock = new THREE.Clock();
        this.init();
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
    }

    init() {
        // renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio = window.devicePixelRatio;
        document.body.appendChild(this.renderer.domElement);

        // scene
        this.scene = new THREE.Scene();

        // camera
        this.camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        this.camera.position.set(30, 0, 30);

        // controls
        this.controls = new THREE.OrbitControls(
            this.camera,
            document.querySelector("canvas")
        );
        this.controls.enabled = true;
        this.controls.enablePan = false;

        // ambient light
        this.scene.add(new THREE.AmbientLight(0x222222));

        // directional light
        let lightTop = new THREE.DirectionalLight(0xffffff, 0.7);
        lightTop.position.set(0, 500, 200);
        lightTop.castShadow = true;
        this.scene.add(lightTop);

        let lightBottom = new THREE.DirectionalLight(0xffffff, 0.25);
        lightBottom.position.set(0, -500, 400);
        lightBottom.castShadow = true;
        this.scene.add(lightBottom);

        let ambientLight = new THREE.AmbientLight(0x798296);
        this.scene.add(ambientLight);
        this.addModel()

        this.load().then(assets => {
            this.addPostProcessing(assets);
            this.isPostProcessingEnabled = true;

            this.addGUI();
        });

        //animation loop
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    addModel() {
        let phongShader = THREE.ShaderLib.phong;

        let fragmentShader = phongShader.fragmentShader;
        fragmentShader =
            document.querySelector("#fragmentShaderBeforeMain").textContent +
            fragmentShader.replace(
                "vec4 diffuseColor = vec4( diffuse, opacity );",
                document.querySelector("#fragmentShader").textContent
            );
        let material = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                phongShader.uniforms,
                {
                    uThreshold: {
                        value: 0
                    },
                }
            ]),
            vertexShader: document.querySelector("#vertexShader").textContent,
            fragmentShader: fragmentShader,
            lights: true,
            transparent: true,
            side: THREE.FrontSide,
            precison: 'highp',
            // wireframe: true
            depthWrite: false,
            depthTest: false,
            opacity: 1.
        })

        return new Promise((resolve, reject) => {
            loadModel({
                id: "head",
                url: "https://rocheclement.fr/public/models/head.obj"
            }).then(model => {
                this.model = model.media;
                this.model.children[0].material = material;
                this.scene.add(this.model);

                this.modelBack=this.model.clone()
                this.model.children[0].material=
                    this.model.children[0].material.clone()
                this.model.children[0].material.side = THREE.BackSide;
                //	back.position.x+=10
                this.model.add(this.modelBack);

                setTimeout(()=>{
                    this.appear()
                },1500)

                this.gui
                    .add(
                        this.model.children[0].material.uniforms.uThreshold,
                        "value",
                        0,
                        1,
                        0.01
                    )
                    .name("threshold")
                    .listen();
                resolve();
            });
        });
    }

    appear() {
        this.model.children[0].material.uniforms.uThreshold.value = this.modelBack.children[0].material.uniforms.uThreshold.value =  0;
        TweenLite.to([this.model.children[0].material.uniforms.uThreshold, this.modelBack.children[0].material.uniforms.uThreshold], 2, {
            value: 1,
            ease: Power4.easeOut
        });
    }

    disappear() {
        this.model.children[0].material.uniforms.uThreshold.value = this.modelBack.children[0].material.uniforms.uThreshold.value =  1;
        TweenLite.to([this.model.children[0].material.uniforms.uThreshold, this.modelBack.children[0].material.uniforms.uThreshold], 2, {
            value: 0,
            ease: Power4.easeOut
        });
    }

    render() {
        // this.clock.update();
        this.time = this.time + this.clock.getDelta();

        if(this.model) this.model.rotation.y += 0.01


        Boolean(this.isPostProcessingEnabled)
            ? this.composer.render(this.clock.getDelta())
            : this.renderer.render(this.scene, this.camera);
    }

    load() {
        const assets = new Map();
        const loadingManager = new THREE.LoadingManager();

        return new Promise((resolve, reject) => {
            loadingManager.onError = reject;
            loadingManager.onProgress = (item, loaded, total) => {
                if (loaded === total) {
                    resolve(assets);
                }
            };

            const searchImage = new Image();
            const areaImage = new Image();

            searchImage.addEventListener("load", function() {
                assets.set("smaa-search", this);
                loadingManager.itemEnd("smaa-search");
            });

            areaImage.addEventListener("load", function() {
                assets.set("smaa-area", this);
                loadingManager.itemEnd("smaa-area");
            });

            // Register the new image assets.
            loadingManager.itemStart("smaa-search");
            loadingManager.itemStart("smaa-area");

            // Load the images asynchronously.
            searchImage.src = PP.SMAAEffect.searchImageDataURL;
            areaImage.src = PP.SMAAEffect.areaImageDataURL;
        });
    }

    addPostProcessing(assets) {
        // this.renderer = renderer;
        this.composer = new PP.EffectComposer(this.renderer);

        this.noiseEffect = new PP.NoiseEffect({ premultiply: true });
        this.vignetteEffect = new PP.VignetteEffect();
        this.bloomEffect = new PP.BloomEffect();

        this.SMAAEffect = new PP.SMAAEffect(
            assets.get("smaa-search"),
            assets.get("smaa-area")
        );
        this.SMAAEffect.setOrthogonalSearchSteps(112);
        this.SMAAEffect.setEdgeDetectionThreshold(0.5);
        this.chromaticAberrationEffect = new PP.ChromaticAberrationEffect();
        this.chromaticAberrationEffect.offset.x = this.chromaticAberrationEffect.offset.y = 0.001

        this.renderPass = new PP.RenderPass(this.scene, this.camera);
        this.effectPass = new PP.EffectPass(this.camera, this.SMAAEffect);

        this.effectPass2 = new PP.EffectPass(
            this.chromaticAberrationEffect,
            this.bloomEffect,
            this.chromaticAberrationEffect
        );

        // this.noiseEffect.blendMode.opacity.value = 0.75;
        this.effectPass2.renderToScreen = true;

        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.effectPass);
        this.composer.addPass(this.effectPass2);
    }

    addGUI() {
        this.gui = new dat.GUI();

        this.params = {
            postprocessing: {
                enabled: true,
                bloom: {
                    blendFunction: PP.BlendFunction.SCREEN,
                    resolutionScale: 0.5,
                    kernelSize: PP.KernelSize.LARGE,
                    distinction: 1.0,
                    dithering: false
                },
                chroma: {
                    offset: {
                        x: 0,
                        y: 0
                    }
                },
                SMAA: {
                    searchStep: 112,
                    edgeDetectionThreshold: 0.5
                }
            }
        };

        let pp = this.gui.addFolder("post-processing");
        pp.add(this, "isPostProcessingEnabled").name("enabled");
        this.gui.add(this, "appear");
        this.gui.add(this, "disappear");
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

const PP = POSTPROCESSING;

const simplex = new SimplexNoise();

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function loadModel(model) {
    return new Promise((resolve, reject) => {
        const ext = model.url.split(".").pop();

        switch (ext) {
            case "obj": {
                const loader = new THREE.OBJLoader();

                // load a resource
                loader.load(
                    // resource URL
                    model.url,
                    // Function when resource is loaded
                    object => {
                        resolve({ id: model.id, media: object, type: "obj" });
                    },

                    () => {},
                    () => {
                        reject("An error happened with the model import.");
                    }
                );
                break;
            }

            case "gltf": {
                const loader = new THREE.GLTFLoader();

                // load a resource
                loader.load(
                    // resource URL
                    model.url,
                    // Function when resource is loaded
                    object => {
                        resolve({ id: model.id, media: object, type: "gltf" });
                    },

                    () => {},
                    () => {
                        reject("An error happened with the model import.");
                    }
                );
                break;
            }

            default: {
                const loader = new THREE.OBJLoader();

                // load a resource
                loader.load(
                    // resource URL
                    model.url,
                    // Function when resource is loaded
                    object => {
                        resolve({ id: model.id, media: object, type: "obj" });
                    },

                    () => {},
                    () => {
                        reject("An error happened with the model import.");
                    }
                );
            }
        }
    });
}

//init app
const app = new App();
