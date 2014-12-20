// start slingin' some d3 here.
var w = 500;
var h = 500;

var enemies = [];
var players = [];
var collisionCounter = 0;
var score = 0;
var highScore = 0;


//store d3 circle x and y values in player x and y
function dragmove(d) {
  player.x = Math.max(player.r, Math.min(w - player.r, d3.event.x));
  player.y = Math.max(player.r, Math.min(h - player.r, d3.event.y));
  d3.select(this)
      .attr('cx', this.x = player.x)
      .attr('cy', this.y = player.y);
}


var checkCollisions = function() {
  //create enemies array of d3 objects
  var $enemies = d3.selectAll('image');

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].setX(parseFloat($enemies[0][i].attributes.x.value));
    enemies[i].setY(parseFloat($enemies[0][i].attributes.y.value));
  }
  // check collisions
  for (var i = 0; i < enemies.length; i++) {
    // x and y of enemy is from the top left corner of image, so add r to x and y to determine center
    var enemyX = enemies[i].x + enemies[i]._w/2;
    var enemyY = enemies[i].y + enemies[i]._w/2;
    // Calculate the distance of the enemy center from the player center
    var d = Math.sqrt(Math.pow(enemyX - player.x, 2) + Math.pow(enemyY - player.y, 2));
    // Compare the distance to the sum of the radii
    if (d < enemies[i]._w/2 + player.r) {
      collisionCounter++;
      document.getElementsByClassName('collisions')[0].children[0].innerText = collisionCounter;
      if (score > highScore) {
        highScore = score;
      }
      score = 0;
      document.getElementsByClassName('high')[0].children[0].innerText = highScore;
    }
  }


};


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

  score++;
  document.getElementsByClassName('current')[0].children[0].innerText = score;
};


var motion = setInterval(refresh, 1000);
var collisions = setInterval(checkCollisions, 50);

