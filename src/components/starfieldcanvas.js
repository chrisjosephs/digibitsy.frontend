import React from "react";
import PropTypes from "prop-types";

function StarFieldCanvas({containerId, numStars, maxStarSpeed}) {

    const StarFieldCanvasDiv = () => (
        <div className="fullScreen" id="fullScreen">
            <canvas id="canvas2d"></canvas>
        </div>
    );

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
        this.canvasElem = this.container.getElementsByTagName('canvas')[0];
        this.canvas = this.canvasElem.getContext('2d');

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

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
        this.canvas.fillStyle = "rgba(255, 0, 0, 0)"; // tło      CLEAR RECT CZYSCI CALY CANVAS :)
        this.canvas.clearRect(0, 0, this.width, this.height);
        // gwiazdki
        for (i = 0; i < this.numStars; i++) {
            star = this.starField[i];

            this.canvas.fillStyle = "rgba(217, 66, 244, " + star.opacity + ")";
            this.canvas.fillRect(
                star.x + this.width / 2,
                star.y + this.height / 2,
                2, 2);
        }
    };

    /**
     * funkcja ogarniajaca animacje aktualizuje starfield
     * i render
     */
    StarField.prototype._renderFrame = function (elapsedTime) {
        var timeSinceLastFrame = elapsedTime - (this.prevFrameTime || 0);

        window.requestAnimationFrame(this._renderFrame.bind(this));


        if (timeSinceLastFrame >= 30 || !this.prevFrameTime) {
            this.prevFrameTime = elapsedTime;
            this._updateStarField();
            this._renderStarField();
        }
    };


    /**
     *Upewnia sie ze canvas miesci sie w containerze
     */
    StarField.prototype._adjustCanvasSize = function (width, height) {
        // Ustawia rozmiar canvasu do containera
        this.width = this.canvasElem.width = width || this.container.offsetWidth;
        this.height = this.canvasElem.height = height || this.container.offsetHeight;
    };


    StarField.prototype._watchCanvasSize = function (elapsedTime) {
        var timeSinceLastCheck = elapsedTime - (this.prevCheckTime || 0),
            width,
            height;

        window.requestAnimationFrame(this._watchCanvasSize.bind(this));

        //
        // (Cap do ~3fps)
        if (timeSinceLastCheck >= 333 || !this.prevCheckTime) {
            this.prevCheckTime = elapsedTime;
            width = this.container.offsetWidth;
            height = this.container.offsetHeight;
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
            this.starField.push(
                zembrzuski.getRandomStar(-this.width / 2, -this.height / 2, this.width, this.height, this.maxStarSpeed)
            );
        }

        // inty nie przetrzymywane
        window.requestAnimationFrame(this._renderFrame.bind(this));
        window.requestAnimationFrame(this._watchCanvasSize.bind(this));
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

    // Rozpoczyna!
    var starField = new StarField('fullScreen').render(333, 3);
    return StarFieldCanvasDiv();
}

StarFieldCanvas.propTypes = {
    containerId: PropTypes.string,
    numStars: PropTypes.string,
    maxStarSpeed: PropTypes.number
}


export default StarFieldCanvas;
