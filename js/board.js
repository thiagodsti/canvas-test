define(function (require) {
    "use strict";
    const Point = require('./point');
    const Parallelogram = require('./parallelogram');

    const points = [];
    let canvas = null;
    let ctx = null;

    function Board(elem) {
        canvas = elem;
        ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        attachEvents();
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    function attachEvents() {
        canvas.addEventListener('mousedown', handleClick.bind(this), false);
    }

    function handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;

        if (points.length >= 3) {
            return;
        }

        if (points.length < 2) {
            addPoint({ x, y });
            return;
        }
        addPoint({ x, y });

        const x4 = points[0].x - points[1].x + points[2].x;
        const y4 = points[0].y - points[1].y + points[2].y;
        addPoint({x: x4, y: y4})

        drawParallelogram();

    }

    function addPoint({ x, y }) {
        points.push({ x, y });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.map(point => {
            new Point(
                point.x,
                point.y,
                ctx
            );
        })
    }

    function drawParallelogram() {
        new Parallelogram(points, ctx);
    }

    return Board;
});
