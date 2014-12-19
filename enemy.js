var Enemy = function(x, y, image) {
  this.x = x;
  this.y = y;
  this._w = 50;
  this._h = 50;
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
