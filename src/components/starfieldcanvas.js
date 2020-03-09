import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import sizeMe from 'react-sizeme'
import raf from 'raf'

class StarfieldAnimation extends PureComponent {

    static propTypes = {
        numStars: PropTypes.string,
        maxSpeed: PropTypes.number,
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        scale: PropTypes.number,
        style: PropTypes.object,
        size: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }).isRequired

    }

    static defaultProps = {
        numStars: 333,
        maxStarSpeed: 3,
        scale: 4,
        style: {},
    }

    componentDidMount() {
        this._draw()
    }

    render() {
        const {
            numStars,
            maxStarSpeed,
            size,
            style,
            scale,
            ...rest
        } = this.props

        return (
            <div class={'fullScreen'}
                 ref={this._containerRef}
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
    _containerRef = (ref) => {
        this._container = ref
    }

    _draw() {
        if (!this._canvas) return;
        const {
            scale,
            size
        } = this.props
        const ctx = this._canvas.getContext('2d');
        const container = this._container;
        // ctx.translate(1, 0.5);

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
         * Star Factory
         * @type {Object}
         */
        var BigBang = {
            /**
             * Returns a random star within a region of the space.
             *
             * @param  {number} minX coordinate of the region
             * @param  {number} minY coordinate of the region
             * @param  {number} maxX coordinate of the region
             * @param  {number} maxY coordinate of the region
             *
             * @return {Star} The random star
             */
            getRandomStar: function (minX, minY, maxX, maxY, maxSpeed) {
                var coords = BigBang.getRandomPosition(minX, minY, maxX, maxY);
                return new Star(coords.x, coords.y, maxSpeed);
            },

            /**
             * Gets a random (x,y) position within a bounding box
             *
             *
             * @param  {number} minX coordinate of the region
             * @param  {number} minY coordinate of the region
             * @param  {number} maxX coordinate of the region
             * @param  {number} maxY coordinate of the region
             *
             * @return {Object} An object with random {x, y} positions
             */
            getRandomPosition: function (minX, minY, maxX, maxY) {
                return {
                    x: Math.floor((Math.random() * maxX) + minX),
                    y: Math.floor((Math.random() * maxY) + minY)
                };
            }
        };

        let StarField = function () {
            this.width = size.width / scale;
            this.height = size.height / scale;
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

                    randomLoc = BigBang.getRandomPosition(
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

                ctx.fillStyle = "rgba(217, 66, 244, " + star.opacity + ")";
                ctx.fillRect(
                    star.x + this.width / 2,
                    star.y + this.height / 2,
                    1, 1);
            }
        };

        /**
         * Makes sure that the canvas size fits the size of its container
         */
        StarField.prototype._adjustCanvasSize = function (width, height) {
            // Set the canvas size to match the container ID (and cache values)
            this.width = ctx.width = width;
            this.height = ctx.height = height;
            ctx.scale(scale, scale);
        };

        /**
         * This listener compares the old container size with the new one, and caches
         * the new values.
         */
        StarField.prototype._watchCanvasSize = function (elapsedTime) {
            var timeSinceLastCheck = elapsedTime - (this.prevCheckTime || 0),
                width,
                height;

            raf(this._watchCanvasSize.bind(this));

            // Skip frames unless at least 333ms have passed since the last check
            // (Cap to ~3fps)
            if (timeSinceLastCheck >= 333 || !this.prevCheckTime) {
                this.prevCheckTime = elapsedTime;
                width = container.offsetWidth / scale;
                height = container.offsetHeight / scale;
                if (this.oldWidth !== width || this.oldHeight !== height) {
                    this.oldWidth = width;
                    this.oldHeight = height;
                    this._adjustCanvasSize(width, height);
                }
            }
        };

        StarField.prototype._tick = function () {
            this._updateStarField();
            this._renderStarField();
            raf(this._tick.bind(this));

        }

        /**
         * Init scene by resizing the canvas to the appropiate value, and
         * set up main loop
         * @param {int} numStars Number of stars in our starfield
         */
        StarField.prototype._initScene = function (numStars) {
            var i;
            for (i = 0; i < this.numStars; i++) {
                try {
                    this.starField.push(
                        BigBang.getRandomStar(-this.width / 2, -this.height / 2, this.width, this.height, this.maxStarSpeed)
                    );
                } catch {

                }
            }
            raf(this._tick.bind(this));
            raf(this._watchCanvasSize.bind(this));
        };

        /**
         * Start Everything
         *  {int} numStars Number of stars to render
         * @param {int} maxStarSpeed maximum star speed
         */
        StarField.prototype.render = function (numStars, maxStarSpeed) {
            this.numStars = numStars || 100;
            this.maxStarSpeed = maxStarSpeed || 3;
            this._initScene(this.numStars);
        };

        let starField = new StarField().render(333, 3);
        return (starField);
    }

}

export default sizeMe({monitorWidth: true, monitorHeight: true})(StarfieldAnimation)
