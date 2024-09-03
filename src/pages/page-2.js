import React from "react"
import {graphql, Link} from "gatsby"

import Seo from "../components/Seo"

const SecondPage = () => (
    <div className={"SecondPage"}>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    </div>
);
export const query = graphql`
    query Page2PagesData {
        page2PageFeatured: file(
            absolutePath: { glob: "**/src/images/digibitsybannerOG.jpg" }
        ) {
            childImageSharp {
                gatsbyImageData(layout: FIXED, width: 1200)
            }
        }
    }
`;

export default SecondPage
