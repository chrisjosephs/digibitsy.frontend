import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
import Seo from '../components/Seo';
import { graphql, PageProps, Link  } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function IndexPage (
    props: PageProps<GatsbyTypes.IndexPagesDataQuery>
) {
    const { data } = props;
    return <div className={"IndexPage"}>
        <Seo
            title="Home Page"
            description="Homepage of Digibitsymicronanocyberweb Limited and Christopher Josephs"
            featuredImage={data.indexPageFeatured.childImageSharp.gatsbyImageData}
        />
        // About me:<br/>
        - rotating head you zoom in and it does some stuff -
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty
        good at making paper planes. As for actors, I like Bill Paxton because
        he is the only person to have been killed by a Predator, an Alien, and a
        Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by
        a langolier, or possibly a furby. <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty
        good at making paper planes. As for actors, I like Bill Paxton because
        he is the only person to have been killed by a Predator, an Alien, and a
        Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by
        a langolier, or possibly a furby. <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty
        good at making paper planes. As for actors, I like Bill Paxton because
        he is the only person to have been killed by a Predator, an Alien, and a
        Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by
        a langolier, or possibly a furby. <br/>
        // my favourite lethal weapon film is lethal weapon 3, and I am pretty
        good at making paper planes. As for actors, I like Bill Paxton because
        he is the only person to have been killed by a Predator, an Alien, and a
        Terminator.<br/>
        // If I was going to be killed by any species, then I would be killed by
        a langolier, or possibly a furby. <br/>


        <h1>Hi muffin</h1>
        <p> default Gatsby starter test site</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
        </div>
        <Link to="/page-2/">Gos to page 2</Link>

    </div>
}
export const query = graphql`
  query IndexPagesData {
    indexPageFeatured: file(
      absolutePath: { glob: "**/src/images/digibitsybannerOG.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 1200)
      }
    }
  }
`;


