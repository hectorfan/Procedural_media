function Box(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    var options = {
        friction: 0.5,
        restitution: 0.8
    }
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    console.log(this.body);
    Composite.add(world, this.body);

    this.show = function () {
        var pos = this.body.position; 
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}