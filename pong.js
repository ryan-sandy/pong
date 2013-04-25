//Written by Ryan Lee
//2013 All rights reserved.
//MIT license

'use strict';
/*jslint browser:true, indent:2*/
/*globals $, document*/

var Ball = function (opts) {
  var defs = {
    'r' : 10,
    'x' : 0,
    'y' : 0,
    'dx' : 2,
    'dy' : 2
  }, self = this;
  $.extend(this, defs, opts);
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
  this.move = function () {
    self.x += self.dx;
    self.y += self.dy;
  };
};

var Paddel = function (opts) {
  var defs = {
    'x' : 0,
    'y' : 0,
    'w' : 10,
    'l' : 50,
    'dy' : 10,
    'h' : 300
  }, self = this;
  $.extend(this, defs, opts);
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
  this.moveDown = function () {
    if (self.y + self.l < self.h) {
      self.y += self.dy;
    }
  };
  this.moveUp = function () {
    if (self.y > 0) {
      self.y = self.y - self.dy;
    }
  };
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillRect(self.x, self.y, self.w, self.l);
    ctx.closePath();
    ctx.fill();
  };
};

$(document).ready(function () {
  var ctx, w, h, $can, loop, ball, p1, p2, requestAnimationFrame;

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  $can = $("#canvas");
  ctx = $can[0].getContext("2d");

  w = $can.attr('width');
  h = $can.attr('height');

  ball = new Ball({'x' : w / 2, 'y' : h / 2});
  p1 = new Paddel({'x' : 0, 'y' : h / 2 - 25, 'h' : h});
  p2 = new Paddel({'x' : w - 10, 'y' : h / 2 - 25, 'h' : h});

  loop = function (tS) {
    if (ball.x > w) {
      $("#winner").html("<p>Left Player Wins!</p>").show();
      clearInterval(loop);
      return;
    }
    if (ball.x < 0) {
      clearInterval(loop);
      $("#winner").html("<p>Right Player Wins!</p>").show();
      return;
    }
    if (ball.y < 0) {
      ball.dy = ball.dy * -1;
    }
    if (ball.y > h) {
      ball.dy = ball.dy * -1;
    }
    if (ball.x < p1.w &&
        ball.y > p1.y &&
        ball.y < p1.y + p1.l) {
      ball.dx = ball.dx * -1;
    }
    if (ball.x > w - p2.w - ball.r &&
        ball.y > p2.y &&
        ball.y < p2.y + p2.l) {
      ball.dx = ball.dx * -1;
    }

    ctx.clearRect(0, 0, w, h);
    ball.move();
    ball.draw(ctx);
    p1.draw(ctx);
    p2.draw(ctx);
    requestAnimationFrame(loop);
  };


  requestAnimationFrame(loop);
  //global key listend
  $(document).keyup(function (e) {
    switch (e.keyCode) {
    case 13:
      requestAnimationFrame();
      break;
    case 87:
      p1.moveUp();
      break;
    case 83:
      p1.moveDown();
      break;
    case 38:
      p2.moveUp();
      break;
    case 40:
      p2.moveDown();
      break;
    default:
      console.log(e);
    }
  });
});
