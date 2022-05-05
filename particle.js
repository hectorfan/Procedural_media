function Particle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    var options = {
        friction: 0.2,
        restitution: 0.5,
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options);
    // console.log(this.body);
    Composite.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill('#776BEA');
        noStroke();
        circle(0, 0, this.r * 2);
        pop();
    }
}

//create a singular circle softbody
function Softbody1(x, y, stiffness_outer, stiffness_inner, color) {
    this.r = 60;
    this.vertices = 12;
    this.stiffness_inner = stiffness_inner;
    this.stiffness_outer = stiffness_outer;
    this.x = x;
    this.y = y;
    var particles = [];
    var particle_r = this.r / 4;
    var angle = TWO_PI / this.vertices;

    p0 = new Particle(this.x, this.y, particle_r);

    for (var a = 0; a < TWO_PI - angle / 2; a += angle) {
        var vx = this.x + cos(a) * this.r;
        var vy = this.y + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }

    var options = {
        bodyA: particles[0].body,
        bodyB: particles[particles.length - 1].body,
        length: (TWO_PI * this.r) / this.vertices,
        damping: 0.01,
        stiffness: this.stiffness_outer
    }
    constraints.push(Constraint.create(options));

    for (var i = 0; i < particles.length; i++) {
        var options1 = {
            bodyA: p0.body,
            bodyB: particles[i].body,
            length: this.r,
            damping: 0.01,
            stiffness: this.stiffness_inner
        }
        constraints.push(Constraint.create(options1));
    }

    for (var i = 0; i < particles.length - 1; i++) {
        var options2 = {
            bodyA: particles[i].body,
            bodyB: particles[i + 1].body,
            length: (TWO_PI * this.r) / this.vertices,
            damping: 0.01,
            stiffness: this.stiffness_outer
        }
        constraints.push(Constraint.create(options2));
    }
    Composite.add(world, constraints);

    this.show = function () {
        beginShape();
        noStroke();
        fill(color);
        // fill('#FCA066');
        curveVertex(particles[0].body.position.x, particles[0].body.position.y);
        for (var i = 0; i < particles.length; i++) {
            curveVertex(particles[i].body.position.x, particles[i].body.position.y);
            // particles[i].show();
        }
        endShape(CLOSE);
    }
}

//create a double circles softbody
function Softbody2(x, y, stiffness_outer, stiffness_inner, stiffness_core, color) {
    this.r = 60;
    this.vertices = 12;
    this.stiffness_inner = stiffness_inner;
    this.stiffness_outer = stiffness_outer;
    this.stiffness_core = stiffness_core;
    this.x = x;
    this.y = y;
    var particles = [];
    var particle_r = this.r / 4;
    var angle = TWO_PI / this.vertices;
    var x1 = this.x + this.r;
    var y2 = this.y + 2 * this.r * sin((PI / 3));
    var x3 = this.x - this.r;
    var y4 = this.y - 2 * this.r * sin((PI / 3));

    core0 = new Particle(this.x, this.y, particle_r * 1.5);
    core1 = new Particle(x3, this.y, particle_r * 1.5);
    core2 = new Particle(x1, this.y, particle_r * 1.5);

    //right circle1
    for (var a = 0; a < (TWO_PI / 3) + angle / 2; a += angle) {
        var vx = x1 + cos(a) * this.r;
        var vy = this.y + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }
    //bottom cirle
    for (var a = (TWO_PI - PI / 3) - angle; a > PI + PI / 3 + angle / 2; a -= angle) {
        var vx = this.x + cos(a) * this.r;
        var vy = y2 + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }
    //left circle
    for (var a = PI / 3; a < (TWO_PI - PI / 3) + angle / 2; a += angle) {
        var vx = x3 + cos(a) * this.r;
        var vy = this.y + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }
    //upper circle
    for (var a = TWO_PI / 3 - angle; a > PI / 3 + angle / 2; a -= angle) {
        var vx = this.x + cos(a) * this.r;
        var vy = y4 + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }
    //right circle2
    for (var a = TWO_PI - TWO_PI / 3; a < TWO_PI - angle / 2; a += angle) {
        var vx = x1 + cos(a) * this.r;
        var vy = this.y + sin(a) * this.r;
        particles.push(new Particle(vx, vy, particle_r));
    }

    //create outer constraints
    for (var i = 0; i < particles.length - 1; i++) {
        var options = {
            bodyA: particles[i].body,
            bodyB: particles[i + 1].body,
            length: (TWO_PI * this.r) / this.vertices,
            damping: 0.1,
            stiffness: this.stiffness_outer
        }
        constraints.push(Constraint.create(options));
    }
    var options = {
        bodyA: particles[0].body,
        bodyB: particles[particles.length - 1].body,
        length: (TWO_PI * this.r) / this.vertices,
        damping: 0.1,
        stiffness: this.stiffness_outer
    }
    constraints.push(Constraint.create(options));

    // //create inner constraints, core to core
    var options = {
        bodyA: core0.body,
        bodyB: core1.body,
        length: this.r,
        damping: 0.1,
        stiffness: this.stiffness_core
    }
    constraints.push(Constraint.create(options));
    var options = {
        bodyA: core0.body,
        bodyB: core2.body,
        length: this.r,
        damping: 0.1,
        stiffness: this.stiffness_core
    }
    constraints.push(Constraint.create(options));

    //create inner constrains, outer layer to cores
    for (var i = 0; i < particles.length; i++) {
        if (i <= this.vertices / 3 + 1 || i >= 4 * this.vertices / 3 - 1) {
            var options = {
                bodyA: core2.body,
                bodyB: particles[i].body,
                length: this.r,
                damping: 0.01,
                stiffness: this.stiffness_inner
            }
            constraints.push(Constraint.create(options));
        }
        if (i >= this.vertices / 2 - 1 && i <= 7 * this.vertices / 6 + 1) {
            var options = {
                bodyA: core1.body,
                bodyB: particles[i].body,
                length: this.r,
                damping: 0.01,
                stiffness: this.stiffness_inner
            }
            constraints.push(Constraint.create(options));
        }
        if (i > this.vertices / 3 && i < this.vertices / 2) {
            var options = {
                bodyA: core0.body,
                bodyB: particles[i].body,
                length: this.r * 0.73,
                damping: 0.01,
                stiffness: this.stiffness_inner
            }
            constraints.push(Constraint.create(options));
        }
        if (i > 7 * this.vertices / 6 && i < 4 * this.vertices / 3) {
            var options = {
                bodyA: core0.body,
                bodyB: particles[i].body,
                length: this.r * 0.73,
                damping: 0.01,
                stiffness: this.stiffness_inner
            }
            constraints.push(Constraint.create(options));
        }
    }

    Composite.add(world, constraints);

    this.show = function () {
        beginShape();
        noStroke();
        fill(color);
        // fill('#64B8FF');
        curveVertex(particles[0].body.position.x, particles[0].body.position.y);
        for (var i = 0; i < particles.length; i++) {
            curveVertex(particles[i].body.position.x, particles[i].body.position.y);
            // particles[i].show();
        }
        endShape(CLOSE);
    }
}