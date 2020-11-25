import { css, keyframes, styled } from '@emotion/react';
import React, {Component} from "react";
import tw from 'tailwind.macro'
import rocketSVG from "../images/rocket.svg"
import exhaustFumes from "../images/smoke-with-transparency-rs.gif"


class Rocket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blastOff : false
        }
    }

    toggleCurtains() {
        this.setState(blastOff => {
            return {blastOff   : !this.state.blastOff };
        });
    }

    render() {
        return (
            <div className={"Rocket"} relative>
                <RocketContainer>
                <RocketImg/>
                <RocketExhaustFumesImg/>
                </RocketContainer>
            </div>
        );
    }
}
const blastOff= keyframes`
  0% { height: 6.25% }
  6.25%, 12.5% { height: 6.25% }
  18.75%, 25% { height: 18.75% }
  31.25%, 37.5% { height: 31.25% }
  43.75%, 50% { height: 43.75% }
  56.25%, 62.5% { height: 56.25% }
  69.75%, 75% { height: 69.75% }
  81.25%, 87.5% { height: 81.25% }
  93.75%, 100% { height: 93.75% }
`;

const noblastOff = keyframes`
  0% { margin-top:0; }
  100% { margin-top: 0;}
`;
const RocketContainer = styled.div`
${tw`block absolute`};
bottom: 0;
`

const RocketImg = styled.div`
${tw`block relative`};
animation: "${props => props.blastOff ? css`${blastOff}` : css`${noblastOff}`}  8s linear infinite";
background-image: url(${rocketSVG});
background-size: cover;
float:left;
height: 160px;
transform: rotate(-45deg);
width: 160px;
`
const RocketExhaustFumesImg = styled.div`
${tw`block relative`};
animation: "${props => props.blastOff ? css`${blastOff}` : css`${noblastOff}`}  8s linear infinite";
background-image: url(${exhaustFumes});
background-size: cover;
bottom: 0;
clear: left;
height: 320px;
left: -23px;
transform: rotate(-180deg);
width: 320px;
`

export default Rocket
