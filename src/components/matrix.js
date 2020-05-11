import React, {Component, createRef} from "react";
import PropTypes from 'prop-types';

const raf = require('raf');


class MatrixLetters extends Component {
    constructor(props) {
        super(props);
        this.containerRef = createRef();
        this.canvasRef = createRef();
        this.state = {containerWidth: window.innerWidth, containerHeight: window.innerHeight};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        // Setting up the letters
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
        this.letters = this.letters.split('');
    }
    static propTypes = {
        style: PropTypes.object
    }
    static defaultProps = {
        style: {}
    };

    render() {
        const {
            style,
            ...rest
        } = this.props

        let div = <>
            <div className={'MatrixLettersContainer'}
                 ref={this.containerRef}
                 style={{
                     overflow: 'hidden',
                     ...style
                 }}
                 {...rest}
            >
                <canvas
                    ref={this.canvasRef}
                    width={this.state.containerWidth}
                    height={this.state.containerHeight}
                />
            </div>
        </>;
        return div
    }
    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext('2d');
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // Setting up the columns
        this.fontSize = 10;
        this.columns = this.state.containerWidth / this.fontSize;
        // Setting up the drops
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
        this._tick()
    }

    componentWillUnmount() {
        raf.cancel(this._tickRaf)
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    _tick = () => {
        this._draw()
        this._tickRaf = raf(this._tick)
    }
    // Setting up the draw function
    _draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        this.ctx.fillRect(0, 0, this.state.containerWidth, this.state.containerHeight);
        for (var i = 0; i < this.drops.length; i++) {
            var text = this.letters[Math.floor(Math.random() * this.letters.length)];
            this.ctx.fillStyle = '#0f0';
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            this.drops[i]++;
            if (this.drops[i] * this.fontSize > this.state.containerHeight && Math.random() > .95) {
                this.drops[i] = 0;
            }
        }
    }
    updateWindowDimensions() {
        this.setState({containerWidth: window.innerWidth, containerHeight: window.innerHeight})
    }

}
export default MatrixLetters;





