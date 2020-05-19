import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import {Link} from "gatsby"
import SEO from "../components/seo"
import {Canvas, useLoader, useFrame, useThree} from "react-three-fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import { getMouseDegrees } from "../components/utils.js"
import { getMousePos } from "../components/utils.js"
import lerp from "lerp"


const IndexPage = () => (
    <div className={"IndexPage"}>
        <SEO title="Home"/>
        <h1>Hi muffin</h1>
        <p> default Gatsby starter test site</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
        </div>
        <Link to="/page-2/">Gos to page 2</Link>

    </div>
)

export default IndexPage

