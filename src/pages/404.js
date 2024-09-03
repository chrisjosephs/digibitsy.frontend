import React from "react"
import Seo from "../components/Seo"
import {graphql} from "gatsby";

const NotFoundPage = () => (
 <div className={"NotFound"}>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)
export const query = graphql`
    query NotFoundPagesData {
        notFoundPageFeatured: file(
            absolutePath: { glob: "**/src/images/digibitsybannerOG.jpg" }
        ) {
            childImageSharp {
                gatsbyImageData(layout: FIXED, width: 1200)
            }
        }
    }
`;

export default NotFoundPage
