/// <reference path="../lib/easeljs-0.8.0.min.js" />
; (function () {
    var Particle = function (option) {
      

        this.position = option.position;
        this.rotation = option.rotation||0;
        this.velocity = option.velocity;
        this.alpha = 1;
        this.acceleration = option.acceleration || PE.Vector2.zero;
        this.rotatingSpeed =option.rotatingSpeed|| 0;
        this.rotatingAcceleration =option.rotatingAcceleration|| 0;
        this.hideSpeed =option.hideSpeed|| 0.01;
        this.zoomSpeed = option.hideSpeed || 0.01;
        this.isAlive = true;
        this.texture = option.texture;
        this.bitmap = new createjs.Bitmap(this.texture).clone();
  


        this.bitmap.filters = [option.filter];
        this.bitmap.cache(0, 0, this.texture.width, this.texture.height);
    }

    Particle.prototype = {
        tick: function () {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity.multiply(0.1));
            this.rotatingSpeed+=this.rotatingAcceleration;
            this.rotation += this.rotatingSpeed;
            this.alpha -= this.hideSpeed;

            this.bitmap.x = this.position.x;
            this.bitmap.y = this.position.y;
            this.bitmap.alpha = this.alpha;
        }
    }







    PE.Particle = Particle;
})();