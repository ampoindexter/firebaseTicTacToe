'use strict';

var tttRef = new Firebase('https://ticktackto.firebaseio.com/');
var playersRef = tttRef.child('players');

var numPlayers = 0;
var player1;
var player2;
var playerSelf;
var markerSelf;

updatePlayers();

$(document).ready(init);

function init() {
  $('#game').on('click', '.cell', clickCell)
  $('#join').click(joinGame);
  $('#quit').click(quit);
  $(window).on('beforeunload', quit);

  playersRef.on('value', function(snap){
    console.log('players.listener');
    numPlayers = snap.numChildren();
    var players = snap.val();
    var keys = [];
    for(var key in players){
      keys.push(key);
    }
    player1 = {
      name: players[keys[0]],
      key: keys[0],
    };
    player2 = {
      name: players[keys[1]],
      key: keys[1],
    };

    if(playerSelf === player1.key){
      markerSelf = 'X';
    } else if(playerSelf === player2.key){
      markerSelf = 'O';
    } else{
      markerSelf = null;
    }

    updatePlayers();

    if(numPlayers === 2){
      startGame();
    }
  });
}

function clickCell(e) {
  console.log(e.target);
}

function quit() {
  var selfRef = playersRef.child(playerSelf);
  debugger;
  playerSelf = null;
}

function updatePlayers() {
  $("#player1").text(player1[name] || '');
  $("#player2").text(player2.name || '');
  $('#join').prop('disabled', numPlayers >= 2);
}

function joinGame() {
  var name = $('#name').val();
  $('#name').val('');
  if(numPlayers < 2){
    var newPlayerRef = playersRef.push(name);
    playerSelf = newPlayerRef.key();
  }
}


