/// <reference path="../lib/easeljs-0.8.0.min.js" />
; (function () {
    var ParticleSystem = function (option) {
        //发射速度
        this.speed = option.speed;
        //发射角度
        this.angle = option.angle;
        //发射范围
        this.angleRange = option.angleRange;
        //发射区域width、height
        this.emitArea = option.emitArea;
        //重力场
        this.gravity = option.gravity;
        //粒子集合
        this.particles = [];
        //粒子纹理
        this.texture = option.texture;
        //粒子容器
        this.container = new createjs.Container();
        this.filterColor = option.filter;
        this.filter = new createjs.ColorFilter(option.filter[0], option.filter[1], option.filter[2], option.filter[3]);
        this.container.compositeOperation = "lighter";

        this.emitCount = option.emitCount;
    }


    ParticleSystem.prototype = {
        emit: function () {
            var angle = (this.angle + PE.Util.random(-this.angleRange / 2, this.angleRange / 2))*Math.PI/180;
         
            var particle = new PE.Particle({
                position: new PE.Vector2(PE.Util.random(0, this.emitArea[0]), PE.Util.random(0, this.emitArea[1])),
                velocity: new PE.Vector2(this.speed * Math.cos(angle), this.speed * Math.sin(angle)),
                texture: this.texture,
                acceleration: this.gravity,
                filter: this.filter
            });
            this.particles.push(particle);
            this.container.addChild(particle.bitmap);
            //if (this.particles.length > 10){
            //    this.remove(particle);
            //}
        },
        tick: function () {
            for (var k = 0; k < this.emitCount; k++) {
                this.emit();
            }
            for (var i = 0, len = this.particles.length; i < len; i++) {
                var item = this.particles[i];
                if (item.bitmap.isVisible()) {
                    item.tick();
                } else {
                    this.remove(item);
                    i--;
                    len--;
                }          
            }

            this.render();
        },
        remove: function (particle) {
            this.container.removeChild(this.particles.splice(0, 1)[0].bitmap);
        },
        render: function () {
           
        },
        setAngle: function (angle) {
            this.angle = angle;
        },
        setSpeed: function (speed) {
            this.speed = speed;
        },
        setFilter: function (r, g, b, a) {
            this.filterColor = [r, g, b, a];
            this.filter = new createjs.ColorFilter(r,g,b,a);
        },
        setAngleRange: function (angle) {
            this.angleRange = angle;
        },
        setEmitWidth: function (w) {
            this.emitArea[0] = w;
        },
        setEmitHeight: function (h) {
            this.emitArea[1] = h;
        },
        setGravity: function (g) {
            this.gravity = g;
        }

    }






    PE.ParticleSystem = ParticleSystem;
})();