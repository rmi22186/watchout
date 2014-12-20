var Enemy = function(id, x, y, image, canvasW, canvasH) {
  this._canvasW = canvasW || 500;
  this._canvasH = canvasH || 500;
  this.id = id;
  this._w = 50;
  this._h = 50;
  Enemy.prototype.setX.call(this,x);
  Enemy.prototype.setY.call(this,y);
  this.image = image;
};

Enemy.prototype.getAttr = function() {
  return {
    'xlink:href': this.image,
    'height': this._h + 'px',
    'width': this._w + 'px',
    'x': this.x,
    'y': this.y
  };
};
Enemy.prototype.setX = function(x) {
  this.x = x > this._canvasW - this._w ? this._canvasW - this._w : x;
};
Enemy.prototype.setY = function(y) {
  this.y = y > this._canvasH - this._h ? this._canvasH - this._h : y;
};
