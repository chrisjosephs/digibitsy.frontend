import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import {Link} from "gatsby"
import Seo from "../components/Seo"
import {Canvas, useLoader, useFrame, useThree} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import { getMouseDegrees } from "../util/utils.js"
import { getMousePos } from "../util/utils.js"
import lerp from "lerp"


const MePage = () => (
    <div className={"MePage"}>
        <Seo title="Home"/>
        // About me:<br/>
        -  rotating head you zoom in and it does some stuff -
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty good at making paper planes.  As for actors, I like Bill Paxton because he is the only person to have been killed by a Predator, an Alien, and a Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by a langolier, or possibly a furby.  <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty good at making paper planes.  As for actors, I like Bill Paxton because he is the only person to have been killed by a Predator, an Alien, and a Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by a langolier, or possibly a furby.  <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty good at making paper planes.  As for actors, I like Bill Paxton because he is the only person to have been killed by a Predator, an Alien, and a Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by a langolier, or possibly a furby.  <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty good at making paper planes.  As for actors, I like Bill Paxton because he is the only person to have been killed by a Predator, an Alien, and a Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by a langolier, or possibly a furby.  <br/>


        <h1>Hi muffin</h1>
        <p> default Gatsby starter test site</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
        </div>
        <Link to="/page-2/">Gos to page 2</Link>

    </div>
)

export default MePage

