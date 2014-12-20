// start slingin' some d3 here.
var w = 500;
var h = 500;

var enemies = [];
var svg = d3.select('body').append('svg');

svg.attr('height', h).attr('width', w);

for (var i = 0; i < 10; i++) {
  enemies.push(new Enemy(i, Math.random() * w, Math.random() * h, 'asteroid.png'));
  svg.append('image')
    .datum(enemies[i])
    .attr(enemies[i].getAttr());
}

var refresh = function () {
  for (var i = 0; i < enemies.length; i++){
    enemies[i].setX(Math.random() * w);
    enemies[i].setY(Math.random() * h);
  }
  svg.selectAll('image')
    .data(enemies, function(d) { return d.id; })
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });
};

var motion = setInterval(refresh, 1000);
