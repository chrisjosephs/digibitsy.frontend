import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import sizeMe from 'react-sizeme'
import raf from 'raf'

class StarfieldAnimation extends PureComponent {

    static propTypes = {
        numStars: PropTypes.string,
        maxSpeed: PropTypes.number,
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        style: PropTypes.object,
        size: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }).isRequired

    }

    static defaultProps = {
        numStars: 333,
        maxStarSpeed: 3,
        style: { },
    }
    componentWillMount() {
        this._reset(this.props)
    }

    componentDidMount() {
        this._draw()
    }

    componentWillUnmount() {
        raf.cancel(this._tickRaf)
    }

    componentWillReceiveProps(props) {
        this._reset(props)
    }

    render() {
        const {
            numStars,
            maxStarSpeed,
            size,
            style,
            ...rest
        } = this.props

        return (
            <div class={'fullScreen'}
                style={{
                    overflow: 'hidden',
                    'background-image': 'url("https://cdnuploads.aa.com.tr/uploads/Contents/2019/08/02/thumbs_b_c_e71aafb0cd4baed977ee65c59e94c941.jpg?v=171748")',
                    'background-size': 'cover',
                    ...style
                }}
                {...rest}
            >
                <canvas
                    ref={this._canvasRef}
                    width={size.width}
                    height={size.height}
                />
            </div>
        )
    }
    _canvasRef = (ref) => {
        this._canvas = ref
    }
    _draw() {
        if (!this._canvas) return;
        const ctx = this._canvas.getContext('2d');
        const width = this._vp.x;
        const height = this._vp.y;
        ctx.scale(4,4);

        var Star = function (x, y, maxSpeed) {
            this.x = x;
            this.y = y;
            this.slope = y / x;
            this.opacity = 0;
            this.speed = Math.max(Math.random() * maxSpeed, 1);

        };

        Star.prototype.distanceTo = function (originX, originY) {
            return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2));
        };


        Star.prototype.resetPosition = function (x, y, maxSpeed) {
            Star.apply(this, arguments);
            return this;
        };

        /**
         var zembrzuski robi gwiazdy
         */
        var zembrzuski = {

            getRandomStar: function (minX, minY, maxX, maxY, maxSpeed) {
                var coords = zembrzuski.getRandomPosition(minX, minY, maxX, maxY);
                return new Star(coords.x, coords.y, maxSpeed);
            },


            getRandomPosition: function (minX, minY, maxX, maxY) {
                return {
                    x: Math.floor((Math.random() * maxX) + minX),
                    y: Math.floor((Math.random() * maxY) + minY)
                };
            }
        };

        var StarField = function (containerId) {
            this.container = document.getElementById(containerId);
            this.width = width;
            this.height = height;
            this.starField = [];
        };


        StarField.prototype._updateStarField = function () {
            var i,
                star,
                randomLoc,
                increment;

            for (i = 0; i < this.numStars; i++) {
                star = this.starField[i];

                increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
                star.x += (star.x > 0) ? increment : -increment;
                star.y = star.slope * star.x;

                star.opacity += star.speed / 150;


                if ((Math.abs(star.x) > this.width / 2) ||
                    (Math.abs(star.y) > this.height / 2)) {

                    randomLoc = zembrzuski.getRandomPosition(
                        -this.width / 10, -this.height / 10,
                        this.width / 5, this.height / 5
                    );
                    star.resetPosition(randomLoc.x, randomLoc.y, this.maxStarSpeed);
                }
            }
        };


        StarField.prototype._renderStarField = function () {
            var i,
                star;
            ctx.fillStyle = "rgba(255, 0, 0, 0)";
            ctx.clearRect(0, 0, this.width, this.height);
            for (i = 0; i < this.numStars; i++) {
                star = this.starField[i];

                ctx .fillStyle = "rgba(217, 66, 244, " + star.opacity + ")";
                ctx.fillRect(
                    star.x + this.width / 2,
                    star.y + this.height / 2,
                    1, 1);
            }
        };

        StarField.prototype._tick = function()  {
            this._updateStarField();
            this._renderStarField();
            raf(this._tick.bind(this));

        }

        /**
         * This listener compares the old container size with the new one, and caches
         * the new values.
         */
        StarField.prototype._watchCanvasSize = function(elapsedTime) {
            var timeSinceLastCheck = elapsedTime - (this.prevCheckTime || 0),
                width,
                height;
            window.requestAnimationFrame(this._watchCanvasSize.bind(this));

            // Skip frames unless at least 333ms have passed since the last check
            // (Cap to ~3fps)
            if (timeSinceLastCheck >= 333 || !this.prevCheckTime) {
                this.prevCheckTime = elapsedTime;
                var size = sizeMe({ monitorWidth: true, monitorHeight: true });
                width = size.width;
                height = size.height;
                if (this.oldWidth !== width || this.oldHeight !== height) {
                    this.oldWidth = width;
                    this.oldHeight = height;
                    this._adjustCanvasSize(width, height);
                }
            }
        };
        /**
         * główna pętla
         * @param {int} numStars liczba gwiazdek
         */
        StarField.prototype._initScene = function (numStars) {
            var i;
            for (i = 0; i < this.numStars; i++) {
                try {
                    this.starField.push(
                        zembrzuski.getRandomStar(-this.width / 2, -this.height / 2, this.width, this.height, this.maxStarSpeed)
                    );
                }
                catch {

                }
            }
            raf(this._tick.bind(this));
            raf(this._watchCanvasSize.bind(this));

        };

        /**
         * Rozpoczyna wszystko
         *  {int} numStars liczba gwiazd do renderu
         * @param {int} maxStarSpeed maxymalna szybkosc gwiazdek pixel/klatka
         */
            StarField.prototype.render = function (numStars, maxStarSpeed) {
            this.numStars = numStars || 100;
            this.maxStarSpeed = maxStarSpeed || 3;

            this._initScene(this.numStars);
        };

        /**
         * requestAnimationFrame z set timeout fallback / gladzenie animacji
         */
        (function () {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)

                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
        }());

        var starField = new StarField('fullScreen').render(333, 3);
        return(starField);
    }
    _reset(props) {
        const {
            size
        } = props

        const vp = {
            x: size.width / 4,
            y: size.height / 4
        }

        this._vp = vp
        this._bounds = {
            width: size.width,
            height: size.height,
            x: { min: -vp.x, max: size.width - vp.x },
            y: { min: -vp.y, max: size.height - vp.y },
        }

    }
}

export default sizeMe({ monitorWidth: true, monitorHeight: true })(StarfieldAnimation)
