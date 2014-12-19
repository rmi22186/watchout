// start slingin' some d3 here.
var w = 500;
var h = 500;

var enemies = [];
var svg = d3.select('body').append('svg');

svg.attr('height', h).attr('width', w);

for (var i = 0; i < 10; i++) {
  enemies.push(new Enemy(Math.random() * w, Math.random() * h, 'asteroid.png'));
  svg.append('image').attr(enemies[i].getAttr());
}



// svg.append('image')

// var insertEnemy = function() {

// };
