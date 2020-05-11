import styled, {keyframes, css} from 'styled-components';
import React, {Component} from "react";
import tw from 'tailwind.macro'

class Invaders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curtains: false
        }
    }

    toggleCurtains() {
        this.setState(curtains => {
            return {curtains: !this.state.curtains};
        });
    }

    render() {
        return (
            <div className={"SpaceInvader fixed h-full"} style={{width: "inherit"}}>
                <ButtonSi onClick={() => this.toggleCurtains()}/>
                <FullScreenInvaders curtains={this.state.curtains}
                                    className={this.state.curtains ? FullscreenShow : ''}/>
            </div>
        );
    }
}

/**
 * Bring the Space Invaders curtain down in 8 steps
 * @type {Keyframes}
 */
const curtain = keyframes`
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

const nocurtain = keyframes`
  0% { margin-top:0; }
  100% { margin-top: 0;}
`;
const FullScreenInvaders = styled.div`
${tw`inline-block bg-pink-500 bottom-0 right-0 left-0 h-0`}
animation: ${props => props.curtains ? css`${curtain}` : css`${nocurtain}`}  8s linear infinite;
width: inherit;
`

const SpaceInvaderCurtainOld = styled.div`
  display: inline-block;
  background: pink;
  width: 200px;
  height: 200px;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: translate(200px, 150px) rotate(20deg)
  }
`

const ButtonSi = styled.div`
    position:absolute;
    z-index:2000;
    height:100px;
    width:200px;
    background:red;
    float:left;
}
`

const FullscreenHide = styled.div`
    -webkit-transition-property: all,
    -moz-transition-property: all;
    -o-transition-property: all;
    -ms-transition-property: all;
    transition-property: all;

    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;

    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -o-transition-delay: 0s;
    -ms-transition-delay: 0s;
    transition-delay: 0s;
    position: absolute;
    z-index: 1000;
    height: 100%;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
    top: -100%;
    bottom: 0;
    right: 0;
    left: 0;
    background: #141414;
    `

const FullscreenShow = styled.div`
    -webkit-transition-property: all;
    -moz-transition-property: all;
    -o-transition-property: all;
    -ms-transition-property: all;
    transition-property: all;

    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;

    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -o-transition-delay: 0s;
    -ms-transition-delay: 0s;
    transition-delay: 0s;
    position: fixed;
    height: 100%;
    z-index: 1000;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #141414;
`

export default Invaders
