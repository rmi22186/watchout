// start slingin' some d3 here.
var w = window.innerWidth*(0.9);
var h = window.innerHeight*(0.9);
var numPlayers = 3;
var numEnemies = 15;

var enemies = [];
var players = [];
var colors = ['red', 'green', 'yellow', 'blue'];
var collisionCounter = 0;
var score = 0;
var highScore = 0;

var keyMap = {
  updatePlayer: function(id, property, amount) {
    players[id][property] = Math.max(players[id].r,
      Math.min(w - players[id].r,players[id][property] + amount));
  },
  37: function() {
    this.updatePlayer(0,'x', -15);
  },
  39: function() {
    this.updatePlayer(0,'x', 15);
  },
  38: function() {
    this.updatePlayer(0,'y', -15);
  },
  40: function() {
    this.updatePlayer(0,'y', 15);
  },
  65: function() {
    this.updatePlayer(1,'x', -15);
  },
  68: function() {
    this.updatePlayer(1,'x', 15);
  },
  87: function() {
    this.updatePlayer(1,'y', -15);
  },
  83: function() {
    this.updatePlayer(1,'y', 15);
  },
  74: function() {
    this.updatePlayer(2,'x', -15);
  },
  76: function() {
    this.updatePlayer(2,'x', 15);
  },
  73: function() {
    this.updatePlayer(2,'y', -15);
  },
  75: function() {
    this.updatePlayer(2,'y', 15);
  },
};

//store d3 circle x and y values in player x and y
var dragmove = function (d) {
  player.x = Math.max(player.r, Math.min(w - player.r, d3.event.x));
  player.y = Math.max(player.r, Math.min(h - player.r, d3.event.y));
  d3.select(this)
      .attr('cx', this.x = player.x)
      .attr('cy', this.y = player.y);
};

var keyMove = function (d) {
  var key = d3.event.keyCode;
  console.log(key);

//player0


  keyMap[key]();



// //player 1
//   if (key === 65) {
//     //go left
//     players[1].x = Math.max(players[1].r, Math.min(w - players[1].r, players[1].x - 15));
//   }
//   if (key === 68) {
//     //go right
//     players[1].x = Math.max(players[1].r, Math.min(w - players[1].r, players[1].x + 15));
//   }
//   if (key === 87) {
//     //go up
//     players[1].y = Math.max(players[1].r, Math.min(h - players[1].r, players[1].y - 15));
//   }
//   if (key === 83) {
//     //go down
//     players[1].y = Math.max(players[1].r, Math.min(h - players[1].r, players[1].y + 15));
//   }

// //player 2
//   if (key === 74) {
//     //go left
//     players[2].x = Math.max(players[2].r, Math.min(w - players[2].r, players[2].x - 15));
//   }
//   if (key === 76) {
//     //go right
//     players[2].x = Math.max(players[2].r, Math.min(w - players[2].r, players[2].x + 15));
//   }
//   if (key === 73) {
//     //go up
//     players[2].y = Math.max(players[2].r, Math.min(h - players[2].r, players[2].y - 15));
//   }
//   if (key === 75) {
//     //go down
//     players[2].y = Math.max(players[2].r, Math.min(h - players[2].r, players[2].y + 15));
//   }

  d3.select('.player0')
      .attr('cx', this.x = players[0].x)
      .attr('cy', this.y = players[0].y);
  d3.select('.player1')
      .attr('cx', this.x = players[1].x)
      .attr('cy', this.y = players[1].y);
  d3.select('.player2')
      .attr('cx', this.x = players[2].x)
      .attr('cy', this.y = players[2].y);
};


var previousCollision = false;
var checkCollisions = function() {
  //create enemies array of d3 objects
  var $enemies = d3.selectAll('image');

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].setX(parseFloat($enemies[0][i].attributes.x.value));
    enemies[i].setY(parseFloat($enemies[0][i].attributes.y.value));
  }
  // check collisions
  var collision = false;
  for (var i = 0; i < enemies.length; i++) {
    // x and y of enemy is from the top left corner of image, so add r to x and y to determine center
    var enemyX = enemies[i].x + enemies[i]._w/2;
    var enemyY = enemies[i].y + enemies[i]._w/2;
    // Calculate the distance of the enemy center from the player center
    var d = Math.sqrt(Math.pow(enemyX - players[0].x, 2) + Math.pow(enemyY - players[0].y, 2));
    // Compare the distance to the sum of the radii

    if (d < enemies[i]._w/2 + players[0].r) {
      collision = true;
    }
  }

  if (collision !== previousCollision) {
    collisionCounter += 1;
    highScore = Math.max(highScore, score);
    score = 0;
    document.getElementsByClassName('high')[0].children[0].innerText = highScore;
    document.getElementsByClassName('collisions')[0].children[0].innerText = collisionCounter;
  }

  previousCollision = collision;

};


var drag = d3.behavior.drag()
//    .origin(function(d) { return d; })
    .on('drag', dragmove);


var svg = d3.select('body').on('keydown', keyMove).append('svg');

svg.attr('height', h).attr('width', w).attr('class', 'background');

for (var i = 0; i < numEnemies; i++) {
  enemies.push(new Enemy(i, Math.random() * w, Math.random() * h, 'asteroid.png', w, h));
  svg.append('image')
    .datum(enemies[i])
    .attr(enemies[i].getAttr());
}

for (var i = 0; i < numPlayers; i++) {
  players.push(new Player(i, (i+1)*w/(numPlayers+2), h/2, w, h));
  svg.append('circle')
  .attr('class', 'player' + i)
  .attr(players[i].getAttr())
  .attr('fill', colors[i]);
}

// svg.append('circle')
//   .attr(player2.getAttr())
//   .attr('class', 'player2')
//   .call(drag);

var refresh = function () {
  for (var i = 0; i < enemies.length; i++){
    enemies[i].setX(Math.random() * w);
    enemies[i].setY(Math.random() * h);
  }

  svg.selectAll('image')
    .data(enemies, function(d) { return d.id; })
    .transition().duration(2000)
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  score++;
  document.getElementsByClassName('current')[0].children[0].innerText = score;
};


var motion = setInterval(refresh, 2000);
//var collisions = setInterval(checkCollisions, 50);
d3.timer(checkCollisions);
