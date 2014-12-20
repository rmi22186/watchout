// start slingin' some d3 here.
var w = 500;
var h = 500;

var enemies = [];
var players = [];

function dragmove(d) {
  d3.select(this)
      .attr('cx', this.x = Math.max(player.r, Math.min(w - player.r, d3.event.x)))
      .attr('cy', this.y = Math.max(player.r, Math.min(h - player.r, d3.event.y)));
}

var drag = d3.behavior.drag()
//    .origin(function(d) { return d; })
    .on('drag', dragmove);


var svg = d3.select('body').append('svg');

svg.attr('height', h).attr('width', w);

for (var i = 0; i < 10; i++) {
  enemies.push(new Enemy(i, Math.random() * w, Math.random() * h, 'asteroid.png'));
  svg.append('image')
    .datum(enemies[i])
    .attr(enemies[i].getAttr());
}

var player = new Player(0, w/2, h/2, w, h);

svg.append('circle')
  .attr(player.getAttr())
  .call(drag);

var refresh = function () {
  for (var i = 0; i < enemies.length; i++){
    enemies[i].setX(Math.random() * w);
    enemies[i].setY(Math.random() * h);
  }

  svg.selectAll('image')
    .data(enemies, function(d) { return d.id; })
    .transition().duration(1000)
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });
};


var motion = setInterval(refresh, 1000);
