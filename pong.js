//Written by Ryan Lee
//2013 All rights reserved.
//MIT license

'use strict';
/*jslint browser:true, indent:2*/
/*globals $, document*/

$(document).ready(function () {
  var ctx, w, h, $can, ball;

  $can = $("#canvas");
  ctx = $can[0].getContext("2d");

  w = $can.attr('width');
  h = $can.attr('height');

  ball = {
    r : 10
  };
  
  //console.log(w + 'x' + h);
  
  ctx.beginPath();
  ctx.arc(w/2 - ball.r, h/2 + ball.r,ball.r,0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
});
