var Player = function(id, x, y, canvasW, canvasH) {
  this._canvasW = canvasW || 500;
  this._canvasH = canvasH || 500;
  this.id = id;
  this.r = 10;
  Player.prototype.setX.call(this, x);
  Player.prototype.setY.call(this, y);
};

Player.prototype.getAttr = function() {
  return {
    'cx': this.x,
    'cy': this.y,
    'r' : this.r
  };
};
Player.prototype.setX = function(x) {
  this.x = x > this._canvasW - this.r ? this._canvasW - this.r : x;
};
Player.prototype.setY = function(y) {
  this.y = y > this._canvasH - this.r ? this._canvasH - this.r : y;
};
