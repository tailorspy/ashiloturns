
"use strict"

let thickOutline;
let thinOutline;

function makeOutline() {
  thickOutline = new createjs.Shape();
  thickOutline.graphics
      .moveTo(line_size * cos36, 0)
      .lineTo(0, line_size * cos54)
      .lineTo(-line_size * cos36, 0)
      .lineTo(0, -line_size * cos54)
      .closePath();

  thinOutline = new createjs.Shape();
  thinOutline.graphics
      .moveTo(line_size * cos18, 0)
      .lineTo(0, line_size * cos72)
      .lineTo(-line_size * cos18, 0)
      .lineTo(0, -line_size * cos72)
      .closePath();

  thickOutline.scale= thinOutline.scale=1 + 1/line_size;
}

function solid(choose, fillColor = "#ffffff", strokeSize = 0,
               strokeColor = fillColor) {
  if (choose == "thick") {
    let container = new createjs.Container();
    let shape = new createjs.Shape();

    shape.graphics
        .setStrokeStyle(strokeSize)
        .beginStroke(strokeColor)
        .beginFill(fillColor)
        .moveTo(line_size * cos36, 0)
        .lineTo(0, line_size * cos54)
        .lineTo(-line_size * cos36, 0)
        .lineTo(0, -line_size * cos54)
        .closePath()
        .endFill()
        .endStroke();
    shape.mask=thickOutline;

    container.addChild(shape);
    return container;
  } else if (choose == "thin") {
    let container = new createjs.Container();
    let shape = new createjs.Shape();

    shape.graphics
        .setStrokeStyle(strokeSize)
        .beginStroke(strokeColor)
        .beginFill(fillColor)
        .moveTo(line_size * cos18, 0)
        .lineTo(0, line_size * cos72)
        .lineTo(-line_size * cos18, 0)
        .lineTo(0, -line_size * cos72)
        .closePath()
        .endFill()
        .endStroke();
    shape.mask=thinOutline;

    container.addChild(shape);
    return container;
  }
}

class pattern {
  thick;
  thin;
  name;
}

let thickr;
let thinr;

// Double arc matching, with background
function makeArcPattern0() {
  let ret = new pattern();

  ret.thick = solid("thick", "#9999ff", 20, "#666666");
  let thick = ret.thick.children[0];
  //thick.mask = undefined;
  thick.graphics.setStrokeStyle(10).beginStroke("#00cc00").drawCircle(
      thickr.left.x, thickr.right.y, line_size / 4);
  thick.graphics.setStrokeStyle(10).beginStroke("#cc0000").drawCircle(
      thickr.right.x, thickr.right.y, 3 * line_size / 4);

  ret.thin = solid("thin", "#9999ff", 20, "#666666");
  let thin = ret.thin.children[0];
  thin.graphics.setStrokeStyle(10).beginStroke("#cc0000").drawCircle(
      thinr.top.x, thinr.top.y, line_size / 4);

  thin.graphics.setStrokeStyle(10).beginStroke("#00cc00").drawCircle(
      thinr.bottom.x, thinr.bottom.y, line_size / 4)

  return ret;
}

// Double arc matching, with no background
function makeArcPattern1() {
  let ret = new pattern();

  ret.thick = solid("thick", "#000000", 0, "#000000");
  let thick = ret.thick.children[0];
  //thick.mask = undefined;
  thick.graphics.setStrokeStyle(10).beginStroke("#00cc00").drawCircle(
          -line_size * cos36, 0, line_size / 4);
  thick.graphics.setStrokeStyle(10).beginStroke("#cc0000").drawCircle(
      line_size * cos36, 0, 3 * line_size / 4);

  ret.thin = solid("thin", "#000000", 0, "#000000");
  let thin = ret.thin.children[0];
  thin.graphics.setStrokeStyle(10).beginStroke("#cc0000").drawCircle(
      0, -line_size * cos72, line_size / 4);

  thin.graphics.setStrokeStyle(10).beginStroke("#00cc00").drawCircle(
      0, line_size * cos72, line_size / 4)

  return ret;
}

// Crazy Daisy pattern
function makeCrazyDaisy() {
  let ret = new pattern(); 
 
  ret.thick = solid("thick", "#ffffff", 1, "#ffffff");
  let thick = ret.thick;

  ret.thin = solid("thin", "#ffffff", 1, "#ffffff");
  let thin = ret.thin;

  let solidFlower = makeSpringBlossomSolidFlower();
  solidFlower.scale = .5;

  solidFlower.x = thickr.left.x;
  solidFlower.y = thickr.left.y;
  solidFlower.rotation = 90;
  thick.addChild(solidFlower);
  solidFlower.mask = thickOutline;

  solidFlower = clone(solidFlower);
  solidFlower.rotation = 360/10;
  solidFlower.x = thinr.bottom.x;
  solidFlower.y = thinr.bottom.y;
  solidFlower.mask = thinOutline;
  thin.addChild(solidFlower);

  let hollowFlower = makeSpringBlossomHollowFlower();
  hollowFlower.scale = .75;
  thin.addChild(hollowFlower);
  hollowFlower.rotation = 0;
  hollowFlower.x = thinr.top.x;
  hollowFlower.y = thinr.top.y;
  hollowFlower.mask = thinOutline;

  hollowFlower = clone(hollowFlower);
  thin.addChild(hollowFlower);
  hollowFlower.rotation = -360/10;
  hollowFlower.x = thinr.right.x;
  hollowFlower.y = thinr.right.y;
  hollowFlower.mask = thinOutline;

  hollowFlower = clone(hollowFlower);
  thin.addChild(hollowFlower);
  hollowFlower.rotation = 360/10;
  hollowFlower.x = thinr.left.x;
  hollowFlower.y = thinr.left.y;
  hollowFlower.mask = thinOutline;

  hollowFlower = clone(hollowFlower);
  hollowFlower.mask = thickOutline;
  thick.addChild(hollowFlower);
  hollowFlower.x = thickr.bottom.x;
  hollowFlower.y = thickr.bottom.y;
  hollowFlower.rotation = -90 + 360/10;

  hollowFlower = clone(hollowFlower);
  hollowFlower.mask = thickOutline;
  thick.addChild(hollowFlower);
  hollowFlower.x = thickr.top.x;
  hollowFlower.y = thickr.top.y;
  hollowFlower.rotation = -90 - 360/10;

  hollowFlower = clone(hollowFlower);
  hollowFlower.mask = thickOutline;
  thick.addChild(hollowFlower);
  hollowFlower.x = thickr.right.x;
  hollowFlower.y = thickr.right.y;
  hollowFlower.rotation = 90 + 360/10 *3;

  let circle = new createjs.Shape();
  thick.addChild(circle);
  circle.graphics.setStrokeStyle(5)
      .beginStroke("#005500")
      .drawCircle(thickr.right.x* 1/3 ,thickr.top.y*1/3,line_size/12)
      .endStroke();
  circle.graphics
      .beginFill("#005500")
      .drawCircle(thickr.left.x* 1/4 ,thickr.bottom.y*1/4,line_size/13)
      .endFill();

  circle = new createjs.Shape();
  thin.addChild(circle);
  circle.graphics
      .beginFill("#005500")
      .drawCircle(thinr.right.x* 1/3 ,thinr.bottom.y*1/4,line_size/13)
      .endFill();


  return ret;
}

function makeSpringBlossomHollowFlower() {
  let container = new createjs.Container();
  let petal = new createjs.Shape();
  let line = new createjs.Shape();
  container.addChild(petal);
  container.addChild(line);

  let da = .3;

  petal.graphics.setStrokeStyle(6)
      .beginStroke("#005500")
      .arc(0, -line_size / 5, line_size / 8, (3 / 4 - da) * 2 * Math.PI,
           (3 / 4 + da) * 2 * Math.PI)
      .endStroke();

  line.graphics.setStrokeStyle(6)
      .beginStroke("#005500")
      .moveTo(0, 0)
      .lineTo(0, line_size/5)
      .endStroke();

  [-1, 0, 1].forEach((a) => {
    petal = clone(petal);
    petal.rotation = 360 / 5 * a;
    container.addChild(petal);
  });

  for (let i = 0; i < 4; ++i) {
    line = clone(line);
    line.rotation += 360 / 5;
    container.addChild(line);
  }
  let circle = new createjs.Shape();
  container.addChild(circle);
  circle.graphics.beginFill("#005500")
      .drawCircle(0, 0, line_size / 10)
      .endFill();

  line = clone(line);
  line.rotation = 0;
  line.scaleY = 1.75;
  container.addChild(line);

  return container;
}

function makeSpringBlossomSolidFlower() {
  let container = new createjs.Container();
  let petal = new createjs.Shape();
  container.addChild(petal);
  petal.graphics.setStrokeStyle(10).beginFill("#005500").drawCircle(
      0, -line_size/5, line_size/4).endFill();
  petal.scaleX = .66;

  petal.rotation = -360/5;

  for (let i = 0; i < 4; ++i) {
    petal = clone(petal);
    petal.rotation += 360 / 5;
    container.addChild(petal);
  }

  let circle = new createjs.Shape();
  container.addChild(circle);
  circle.graphics.beginFill("#ffffff")
      .drawCircle(0, 0, line_size / 12)
      .endFill();
  return container;
}

// American Oil Star
function makeAmericanOilStar() {
  let ret = new pattern();

  ret.thick = solid("thick", "#ffffff", 2, "#ffffff");
  let thick_g = ret.thick.children[0];

  ret.thin = solid("thin", "#ffffff", 2, "#ffffff");
  let thin_g = ret.thin.children[0];


  let star1 = makeBlueOilStar(1);
  star1.scale = .4;

  star1.x = thickr.left.x;
  star1.y = thickr.left.y;
  star1.rotation = -90;
  star1.mask = thickOutline;
  ret.thick.addChild(star1);

  star1 = clone(star1);
  star1.x = thinr.bottom.x;
  star1.y = thinr.bottom.y;
  star1.rotation = 0;
  star1.mask = thinOutline;
  ret.thin.addChild(star1);

  let star2 = makeBlueOilStar(2);
  star2.scale = .3;

  star2.rotation = 90;
  star2.x = thickr.right.x;
  star2.y = thickr.right.y;
  star2.mask = thickOutline;
  ret.thick.addChild(star2);

  star2 = clone(star2);
  star2.rotation = -90;
  star2.x = thickr.top.x;
  star2.y = thickr.top.y;
  ret.thick.addChild(star2);

  star2 = clone(star2);
  star2.rotation = 90 - 360/10;
  star2.x = thickr.bottom.x;
  star2.y = thickr.bottom.y;
  ret.thick.addChild(star2);

  star2 = clone(star2);
  star2.mask = thinOutline
  star2.rotation = 180;
  star2.x = thinr.top.x;
  star2.y = thinr.top.y;
  ret.thin.addChild(star2);

  star2 = clone(star2);
  star2.rotation = 0;
  star2.x = thinr.left.x;
  star2.y = thinr.left.y;
  ret.thin.addChild(star2);

  star2 = clone(star2);
  star2.rotation = 0;
  star2.x = thinr.right.x;
  star2.y = thinr.right.y;
  ret.thin.addChild(star2);

  let star3 = makeBlueOilStar(3);
  star3.scale = .35;
  star3.rotation = 90;
  ret.thick.addChild(star3);

  return ret;
}

function makeBlueOilStar(num) {
  let fg_color = num == 1 ? "#0000ff" : "#ffffff";
  let bg_color = num == 1 ? "#ffffff" : "#0000ff";

  let container = new createjs.Container();

  if (num == 1) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill(fg_color)
        .drawCircle(0, 0, line_size * .85)
        .endFill();
    container.addChild(circle);
  }

  let under_petal = new createjs.Shape();

  under_petal.graphics.beginFill(bg_color).drawCircle(0, line_size / 2,
                                                      line_size / 2);
  under_petal.scaleX = .35;
  under_petal.scaleY = .75;
  for (let i = 0; i < 5; ++i) {
    let shape = clone(under_petal);
    shape.rotation = 360 / 5 * i;
    container.addChild(shape);
  }

  let circle_petal = new createjs.Shape();

  let y = -Math.cos(2 * Math.PI * 1 / 10) * line_size / 2;
  let x = Math.sin(2 * Math.PI * 1 / 10) * line_size / 2;

  circle_petal.graphics.setStrokeStyle(5)
      .beginStroke(fg_color)
      .beginFill(fg_color)
      .moveTo(0, 0)
      .lineTo(x, y)
      .quadraticCurveTo(0, -10, -x, y)
      .lineTo(0, 0)
      .closePath()
      .endFill()
      .endStroke();

  circle_petal.graphics.setStrokeStyle(5)
      .beginStroke(fg_color)
      .beginFill(fg_color)
      .drawCircle(0, line_size * .6, line_size * .04)
      .endFill()
      .endStroke();

  if (num == 3) {
    circle_petal.graphics.setStrokeStyle(5)
        .beginStroke(bg_color)
        .beginFill(bg_color)
        .drawCircle(0, -line_size * .6, line_size * .06)
        .endFill()
        .endStroke();
  }

  for (let i = 0; i < 5; ++i) {
    let shape = clone(circle_petal);
    shape.rotation = 360 / 5 * i;
    container.addChild(shape);
  }

  let center_circle = new createjs.Shape();
  center_circle.graphics.beginFill(bg_color).drawCircle(0, 0, line_size * .15);
  container.addChild(center_circle);

  return container;
}

function makeGreenMacrame() {
  let ret = new pattern();

  ret.thick = solid("thick", "#ffffff", 0, "#ffffff");
  let thick = ret.thick;

  ret.thin = solid("thin", "#ffffff", 0, "#ffffff");
  let thin = ret.thin;

  let arrow = new createjs.Shape();
  let x = line_size * .5;
  let y = line_size * .4;
  let y2 = line_size * .35;

  arrow.graphics.setStrokeStyle(10)
      .beginStroke("#999966")
      .moveTo(-x, y2)
      .lineTo(0,-y)
      .lineTo(x,y2)
      .endStroke();

  arrow.rotation = 180;

  arrow.mask = thinOutline;
  arrow.x = thinr.top.x;
  arrow.y = thinr.top.y;
  thin.addChild(arrow);

  arrow = clone(arrow);
  arrow.mask=thickOutline;
  arrow.x = thickr.bottom.x;
  arrow.y = thickr.bottom.y;
  arrow.rotation = 90 + 360 / 10;
  thick.addChild(arrow);

  arrow = clone(arrow);
  arrow.x = thickr.top.x;
  arrow.y = thickr.top.y;
  arrow.rotation = 90 - 360/10;
  thick.addChild(arrow);

  let circle = new createjs.Shape();
  circle.graphics.setStrokeStyle(10)
      .beginStroke("#999966")
      .drawCircle(thickr.left.x,thickr.left.y,line_size * .35)
      .endStroke();
  circle.graphics.setStrokeStyle(10,"round")
      .beginStroke("#999966")
      .arc(thickr.left.x * .5, thickr.bottom.y * 1.42, line_size * 1.0,
           1.47 * Math.PI, 1.66 * Math.PI)
      .endStroke();

  circle.graphics.setStrokeStyle(10,"round")
      .beginStroke("#999966")
      .arc(thickr.left.x * .5, thickr.top.y * 1.42, line_size * 1.0,
           .34 * Math.PI, .52 * Math.PI)
      .endStroke();

  circle.graphics.setStrokeStyle(10)
      .beginStroke("#999966")
      .arc(0,0,line_size * .4,-1.1,1.1)
      .endStroke();

  circle.mask = thickOutline;
  thick.addChild(circle);

  let circle2 = new createjs.Shape();
  circle2.graphics.setStrokeStyle(10)
      .beginStroke("#999966")
      .arc(thinr.left.x * .6, thinr.bottom.y * .6, line_size * .25, -.9, 1)
      .endStroke();
  circle2.graphics
      .beginFill("#999966")
      .drawCircle(thinr.left.x * .48 ,0, 10)
      .endFill();

  circle2.graphics.setStrokeStyle(10)
      .beginStroke("#999966")
      .arc(thinr.right.x * .6, thinr.bottom.y * .6, line_size * .25, 2, 4)
      .endStroke();
  circle2.graphics
      .beginFill("#999966")
      .drawCircle(thinr.right.x * .48 ,0, 10)
      .endFill();


  circle2.mask = thinOutline;
  thin.addChild(circle2);

  return ret;
}

function makeBlueMacrame() {
  let ret = new pattern();

  ret.thick = solid("thick", "#ffffff", 0, "#ffffff");
  let thick = ret.thick;

  ret.thin = solid("thin", "#ffffff", 0, "#ffffff");
  let thin = ret.thin;

  let f = .45;
  let thinShape = new createjs.Shape();
  thinShape.graphics.beginFill("#3333cc")
      .moveTo(thinr.top.x, thinr.top.y)
      .lineTo(thinr.right.x * f, thinr.top.y * (1 - f))
      .lineTo(thinr.top.x, thinr.top.y * (1 - f * 2))
      .lineTo(thinr.left.x * f, thinr.top.y * (1 - f))
      .closePath()
      .endFill();

  thinShape.graphics.beginFill("#3333cc")
    .drawCircle(line_size * -.3, line_size * .03, 13)
    .drawCircle(line_size * .3, line_size * .03, 13)
  .endFill();

  thinShape.graphics.setStrokeStyle(12)
      .beginStroke("#3333cc")
      .arc(thinr.left.x * .35, .65 * thinr.bottom.y, line_size * .23, 1.4, 5)
      .endStroke()
      .beginStroke("#3333cc")
      .arc(thinr.right.x * .35, .65 * thinr.bottom.y, line_size * .23, -1.7, 2)
      .endStroke();

  thinShape.graphics.setStrokeStyle(15)
      .beginStroke("#3333cc")
      .drawCircle(thinr.right.x, thinr.right.y, line_size * .2)
      .endStroke()
      .beginStroke("#3333cc")
      .drawCircle(thinr.left.x, thinr.left.y, line_size * .2)
      .endStroke();

  thinShape.mask = thinOutline;
  thin.addChild(thinShape);

  let thickShape = new createjs.Shape();

  thickShape.graphics.beginFill("#3333cc")
    .drawCircle(line_size * 0, line_size * .3, 13)
    .drawCircle(line_size * -0, line_size * -.3, 13)
  .endFill();

  thickShape.graphics.beginFill("#3333cc")
    .drawCircle(line_size *- 0.35, line_size * .15, 13)
    .drawCircle(line_size *- 0.35, line_size * -.15, 13)
  .endFill();

  thickShape.graphics.setStrokeStyle(15)
      .beginStroke("#3333cc")
      .drawCircle(thickr.right.x, thickr.right.y, line_size * .2)
      .endStroke();

  thickShape.graphics.setStrokeStyle(12)
      .beginStroke("#3333cc")
      .arc(thickr.left.x * .5, thickr.left.y, line_size *.55 , -.7, .7)
      .endStroke();

  thickShape.graphics.setStrokeStyle(12)
      .beginStroke("#3333cc")
      .arc(thickr.left.x * .65, .35 * thickr.bottom.y, line_size * .23, -.5, 2)
      .endStroke()
      .beginStroke("#3333cc")
      .arc(thickr.left.x * .65, .35 * thickr.top.y, line_size * .23, -1, .5)
      .endStroke();
  thickShape.mask = thickOutline;
  thick.addChild(thickShape);

  return ret;
}

function makeAvocadoMedallion() {
  let ret = new pattern();

  ret.thick = solid("thick", "#ffffff", 2, "#ffffff");
  let thick = ret.thick.children[0];
  thick.graphics.setStrokeStyle(10).beginStroke("#999900").drawCircle(
      thickr.left.x, thickr.right.y, 1.5 * line_size / 4);

  // stems
  thick.graphics.setStrokeStyle(10)
      .beginStroke("#999900")
      .moveTo(thickr.left.x + 1.5 * line_size / 4, thickr.left.y)
      .quadraticCurveTo(-10, -10, thickr.left.x * 1.5 / 4,
                        thickr.top.y * 2.5 / 4)
      .moveTo(thickr.left.x * 1.5 / 4 - 1, thickr.bottom.y * 2.5 / 4 + 1)
      .lineTo(-34, 44)

      .moveTo(-28, -25)
      .quadraticCurveTo(10, -30, thickr.right.x * 1 / 4,
                        thickr.bottom.y * 3 / 4 + 4)

      .moveTo(thickr.right.x * 2.5 / 4 + 1, thickr.top.y * 1.5 / 4 - 1)
      .quadraticCurveTo(40, 20, 10, 0)

      .endStroke()

      .beginStroke("#999900")
      .arc(80, 16, 19, 1, 4.3)
      .endStroke();

  // leaves
  let solidLeaf = new createjs.Shape();
  ret.thick.addChild(solidLeaf);
  let f = 40;
  solidLeaf.graphics
      .beginFill("#999900")
      .moveTo(0, 0)
      .lineTo(cos54 * f, -cos36 * f)
      .lineTo(0, -2 * cos18 * f)
      .lineTo(-cos54 * f, -cos36 * f)
      .closePath()
      .endFill();
  solidLeaf.x = 66;
  solidLeaf.y = 5;
  solidLeaf.rotation = -36 + 90;
  solidLeaf.scale = .4;
  solidLeaf.mask = thickOutline;

  let flower = new createjs.Container();
  {
    let shape = new createjs.Shape();
    let f = 30;
    shape.graphics.setStrokeStyle(8, "round", "round")
        .beginStroke("#999900")
        .moveTo(0, 0)
        .lineTo(cos72 * f, -cos18 * f)
        .lineTo(0, -2 * cos36 * f)
        .lineTo(-cos72 * f, -cos18 * f)
        .closePath()
        .endStroke();

    flower.addChild(shape);

    shape = shape.clone();
    shape.rotation = 360 / 10;
    flower.addChild(shape);
    shape = shape.clone();
    shape.rotation = -360 / 10;
    flower.addChild(shape);
    flower.x = -36;
    flower.y = 46;
    flower.rotation = 45;
  }
  ret.thick.addChild(flower);

  let hollowLeaf = flower.children[0].clone();
  ret.thick.addChild(hollowLeaf);
  hollowLeaf.x = 23;
  hollowLeaf.y = -57;
  hollowLeaf.rotation = 180;
  hollowLeaf.mask = thickOutline;


  ret.thin = solid("thin", "#ffffff", 2, "#ffffff");
  let thin = ret.thin.children[0];
  thin.graphics.setStrokeStyle(10).beginStroke("#999900").drawCircle(
      thinr.top.x, thinr.top.y, line_size / 4);
  thin.graphics.setStrokeStyle(10).beginStroke("#999900").arc(
      thinr.left.x/2, thinr.bottom.y*.7, line_size / 4, 4.4, 5.4);
  thin.graphics.setStrokeStyle(10).beginStroke("#999900").arc(
      thinr.right.x/2, thinr.bottom.y*.7, line_size / 4, 4., 5.2);
  thin.graphics.setStrokeStyle(10).beginStroke("#999900").drawCircle(
      thinr.bottom.x, thinr.bottom.y, 1.5 * line_size / 4)

  thin.graphics.setStrokeStyle(10).beginStroke("#999900").drawCircle(
      thinr.left.x, thinr.left.y, 1.5 * line_size / 4)
  thin.graphics.setStrokeStyle(10).beginStroke("#999900").drawCircle(
      thinr.right.x, thinr.right.y, 1.5 * line_size / 4)

  let central = new createjs.Container();
  {
    let shape = new createjs.Shape();
    central.addChild(shape);
    shape.graphics.setStrokeStyle(8)
        .beginStroke("#999900")
        .drawEllipse(-10,-36, 20,26)
        .endStroke()
        .beginStroke("#999900")
        .drawCircle(0,0, 11)
        .endStroke();
 
    shape.rotation = 90;
    shape = shape.clone();
    shape.rotation -= 360 /5 ;
    central.addChild(shape); 
  }
  central.x = thickr.left.x;
  central.y = thickr.left.y;
  central.mask = thickOutline;
  ret.thick.addChild(central);

  central = clone(central);
  ret.thin.addChild(central);
  central.rotation = -90 + 360 / 10;
  central.x = thinr.bottom.x;
  central.y = thinr.bottom.y;
  central.mask = thinOutline;
  return ret;
}

function makeTwoColorPattern() {
  let ret = new pattern();

  ret.thick = solid("thick", "#3333cc", 8, "#000000");
  let thick_g = ret.thick.children[0];

  ret.thin = solid("thin", "#33cc33", 8, "#000000");
  let thin_g = ret.thin.children[0];

  ret.reversible = false;

  return ret;
}

function makeArcPattern_template() {
  let ret = new pattern();

  ret.thick = solid("thick", "#9999ff", 20, "#666666");
  let thick_g = ret.thick.children[0];

  ret.thin = solid("thin", "#9999ff", 20, "#666666");
  let thin_g = ret.thin.children[0];

  return ret;
}

let patternFunctionArray = [
  makeArcPattern0,
  makeArcPattern1,
  makeCrazyDaisy,
  makeAmericanOilStar,
  makeGreenMacrame,
  makeBlueMacrame,
  makeAvocadoMedallion,
  makeTwoColorPattern,
];

function makeRhombuses() {
  thickr = {
    right : {x : line_size * cos36, y : 0},
    left : {x : -line_size * cos36, y : 0},
    top : {x : 0, y : -line_size * cos54},
    bottom : {x : 0, y : line_size * cos54},
  };
  thinr = {
    right : {x : line_size * cos18, y : 0},
    left : {x : -line_size * cos18, y : 0},
    top : {x : 0, y : -line_size * cos72},
    bottom : {x : 0, y : line_size * cos72},
  };
  makeOutline(line_size);

  let ret = [];
  patternFunctionArray.forEach((fun) => ret.push(fun()));
  return ret;
}
