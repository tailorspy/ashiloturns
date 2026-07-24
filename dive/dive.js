// 

"use strict";

let stage;

let bottomLevel;
let topLevel;

let cos18 = Math.sqrt(10 + 2 * Math.sqrt(5)) / 4;
let cos36 = (Math.sqrt(5) + 1) / 4;
let cos54 = Math.sqrt(10 - 2 * Math.sqrt(5)) / 4;
let cos72 = (Math.sqrt(5) - 1) / 4;

let sin18 = cos72;
let sin36 = cos54;
let sin54 = cos36;
let sin72 = cos18;

let phi = (1 + Math.sqrt(5)) / 2;
let inv_phi = (Math.sqrt(5) - 1) / 2;

let line_size = 128;

let debug = true;

let width;
let height;

let crooked;

let dive_forever = false;

let rhombuses = makeRhombuses(line_size);
let rhombusNum = 0;
let rhombus = rhombuses[rhombusNum];

function clone(item) {
  if (!(item instanceof createjs.Container))
    return item.clone();

  let cc = item.clone();

  item.children.forEach((child) => cc.addChild(clone(child)));
  return cc;
}

function changeRhombus(num = undefined) {
  if (num == undefined) {
    rhombusNum = Math.trunc(Math.random() * rhombuses.length);
  } else {
    num += rhombuses.length;
    num %= rhombuses.length;
    rhombusNum = num;
  }

  rhombus = rhombuses[rhombusNum];
}

function nextRhombus() {
  rhombusNum = (rhombusNum + 1) % rhombuses.length;
  rhombus = rhombuses[rhombusNum];
}

function makeThickRhombus(x, y, rotation, scale) {
  let outer = new createjs.Container();
  outer.mouseChildren = false;
  outer.name = "thick";
  let container = clone(rhombus.thick);
  outer.addChild(container);
  outer.x = x;
  outer.y = y;
  container.rotation = rotation;
  container.scale = scale;

  //container.cache(thickr.left.x, thickr.top.y, thickr.right.x - thickr.left.x, thickr.bottom.y - thickr.top.y);

  return outer;
}

function makeThinRhombus(x, y, rotation, scale) {
  let outer = new createjs.Container();
  outer.mouseChildren = false;
  outer.name = "thin";
  let container = clone(rhombus.thin);
  outer.addChild(container);
  outer.x = x;
  outer.y = y;
  container.rotation = rotation;
  container.scale = scale;

  return outer;
}

function inflate(rhombus) {
  if (rhombus.name == "thick") {
    return inflateThickRhombus(rhombus);
  } else if (rhombus.name == "thin") {
    return inflateThinRhombus(rhombus);
  } else {
    return [];
  }
}

function inflateThinRhombus(rhombus) {
  rhombus = rhombus.children[0];
  let array = [];

  let scale = rhombus.scale * inv_phi;

  {
    let rotation = rhombus.rotation + 18;
    let point =
        rhombus.localToGlobal(-line_size * cos18 / 2, line_size * cos72 / 2);
    let shape = makeThickRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation -180 - 18;
    let point =
        rhombus.localToGlobal(line_size * cos18 / 2, line_size * cos72 / 2);
    let shape = makeThickRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation + 90 + 18;
    let x = 0;
    let y = line_size * cos72;
    let dx = cos18 * line_size * inv_phi * sin18;
    let dy = -cos18 * line_size * inv_phi * cos18;

    let point = rhombus.localToGlobal(x + dx, y + dy);
    let shape = makeThinRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation - 90 - 18;
    let x = 0;
    let y = line_size * cos72;
    let dx = -cos18 * line_size * inv_phi * sin18;
    let dy = -cos18 * line_size * inv_phi * cos18;

    let point = rhombus.localToGlobal(x + dx, y + dy);
    let shape = makeThinRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }

  return array;
}

function inflateThickRhombus(rhombus) {
  rhombus = rhombus.children[0];
  let array = [];

  let scale = rhombus.scale * inv_phi;

  {
    let rotation = rhombus.rotation + 180 - 36;
    let point =
        rhombus.localToGlobal(-line_size * cos36 / 2, -line_size * cos54 / 2);
    let shape = makeThickRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation + 180 + 36;
    let point =
        rhombus.localToGlobal(-line_size * cos36 / 2, line_size * cos54 / 2);
    let shape = makeThickRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation + 180;
    let point =
        rhombus.localToGlobal(line_size * (cos36 - cos36 * inv_phi) , 0);
    let shape = makeThickRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation + 180 - 54;
    let l = line_size * inv_phi * cos18;
    let x = cos54 * l;
    let dx = -line_size * (cos36 - inv_phi);
    let y = -sin54 * l
    let point = rhombus.localToGlobal(x + dx, y);
    let shape = makeThinRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  {
    let rotation = rhombus.rotation + 54;
    let l = line_size * inv_phi * cos18;
    let x = cos54 * l;
    let dx = -line_size * (cos36 - inv_phi);
    let y = sin54 * l
    let point = rhombus.localToGlobal(x + dx, y);
    let shape = makeThinRhombus(point.x, point.y, rotation, scale);
    array.push(shape);
  }
  return array;
}

function resize() {
  if (width == window.innerWidth && height == window.innerHeight)
    return;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
  canvas.background = "black";
}

function makeCircle(x, y, scale = 1, flip = Math.trunc(2 * Math.random()),
                    rotation = 0) {
  let ret = [];

  let angle = 0;
  let rangle = 0;
  let dangle = 360 / 5;
  let drAngle = dangle / 180 * Math.PI;
  let line = line_size * cos36 * scale;
  for (; angle < 360; rangle += drAngle, angle += dangle) {
    let dy = line * Math.sin(rangle + rotation /180 * Math.PI);
    let dx = line * Math.cos(rangle + rotation/180 * Math.PI);
    let shape =
        makeThickRhombus(x + dx, y + dy, angle + 180 * flip + rotation, scale);
    ret.push(shape);
  }

  return ret;
}

function addRhombus(...shapes) {
  shapes.forEach((shape) => { addSingleRhombus(shape); });
}

function addSingleRhombus(rhombus) {
  var close = bottomLevel.children.reduce(
      (found, shape) => found = found || (Math.abs(rhombus.x - shape.x) < 1 &&
                                          Math.abs(rhombus.y - shape.y) < 1),
      false);

  if (!close)
    bottomLevel.addChild(rhombus);
}

function makeFirstLevel(forever = false) {
  let shapes = makeCircle(width / 2, height / 2, forever ? inv_phi : 1);
  bottomLevel.addChild(...shapes);

  crooked = 1;
  shapes[0].rotation = 90;
  shapes[0].on("click", handleClick);
  bottomLevel.addChild(shapes[0]);
}

function getSlope(x, y) {
  let dx = x - width/2;
  let dy = y - height/2;

  if (dx == 0 && dy == 0) return [1,0];
  if (dx == 0) {
    if (dy > 0) return [0,1];
    else return [0,-1];
  }
  if (dy == 0) {
    if (dx == 0) return [-1,0];
    else return [1,0];
  }

  let l = Math.sqrt(dx * dx + dy * dy);
  dx /= l;
  dy /= l;

  return [dx, dy];
}

class toDeleteSingle {
  item;
  x;
  y;
  dx;
  dy;
};

class toMoveSingle {
  item;
  x;
  y;
  s;
  a;
  x0;
  y0;
  s0;
  a0;
  outera;
  turn;
};

let toDelete = [];
let toMove = [];

function advanceLevel(dx = undefined, dy = undefined, da = undefined,
                      scale = phi) {
  resize();
  changeRhombus();
  toDelete = [];
  toMove = [];
  topLevel.removeAllChildren();
  crooked = 0;
  [topLevel, bottomLevel] = [bottomLevel, topLevel];

  stage.removeAllChildren();
  stage.addChild(bottomLevel, topLevel);
  const factor = 2 * line_size;

  topLevel.children.forEach((rhombus) => {
    if (rhombus.x < -factor || rhombus.x > width + factor ||
        rhombus.y < -factor || rhombus.y > height + factor)
      return;
    let shapes = inflate(rhombus);
    addRhombus(...shapes);
  });

  if (da == undefined) {
    da = Math.random() * Math.PI - Math.PI / 2;
  }
  if (dx == undefined) {
    dx = Math.random() * line_size - line_size / 2;
  }
  if (dy == undefined) {
    dy = Math.random() * line_size - line_size / 2;
  }

  topLevel.children.forEach((rhombus, index) => {
    let slope = getSlope(rhombus.x, rhombus.y);
    let count = 0;
    let x = rhombus.x;
    let y = rhombus.y;

    let piece = new toDeleteSingle();
    piece.item = rhombus;
    piece.x = rhombus.x;
    piece.y = rhombus.y;
    piece.dx = slope[0];
    piece.dy = slope[1];

    toDelete.push(piece);
  });

  let count = 0;
  createjs.Ticker.on("tick", function(event) {
    count += event.delta;
    if (count > 1000) {
      toDelete.forEach((entry) => {
        entry.item.visible = false;
      });
      event.remove();
      return;
    }
    toDelete.forEach((entry) => {
      entry.item.x = entry.x + entry.dx * count;
      entry.item.y = entry.y + entry.dy * count;
    });
  });

  let num = bottomLevel.children.length;
  let turned = [];
  bottomLevel.children.forEach((rhombus, index) => {
    let x0 = rhombus.x;
    let y0 = rhombus.y;

    let x = rhombus.x - width/2 - dx;
    let y = rhombus.y - height/2 - dy;

    [x, y] = [
      x * Math.cos(da) - y * Math.sin(da), x * Math.sin(da) + y * Math.cos(da)
    ];

    x*=scale;
    y*=scale;

    x += width/2;
    y += height/2

    rhombus.alpha  = 1;

    let turn = false;
    let edge = 8;
    if (x > width / edge && x < (edge - 1) * width / edge &&
        y > height / edge && y < (edge - 1) * height / edge) {
      turn = Math.random() < 1/8;
    }
    if (dive_forever)
      turn = false;

    let a0 = rhombus.children[0].rotation;
    let a = a0 + da * 180 / Math.PI;

    let outera = 0;
    if (turn) {
      crooked++;
      let factor = Math.random() > .5 ? -1 : 1;
      outera = factor * 80 + 20 * Math.random();
      turned.push(rhombus);
    }

    let s0 = rhombus.children[0].scale;
    let s = s0 * scale;
    s0 = rhombus.children[0].scale /= scale;

    let c = new toMoveSingle();
    c.item = rhombus;
    c.x0 = x0;
    c.y0 = y0;
    c.a0 = a0;
    c.s0 = s0;
    c.x = x;
    c.y = y;
    c.a = a;
    c.s = s;
    c.outera = outera;
    c.turn = turn;

    toMove.push(c);
  });

  let moveCount = 0;
  createjs.Ticker.on("tick", function(event) {
    moveCount += event.delta;
    if (moveCount < 1000) return;
    if (moveCount > 2000) {
      toMove.forEach((entry) => {
        entry.item.x = entry.x;
        entry.item.y = entry.y;
        entry.item.children[0].scale = entry.s;
        entry.item.children[0].rotation = entry.a;
        if (entry.turn) {
          entry.item.on("click", handleClick);
        }
      });
      event.remove();
      return;
    }

    toMove.forEach((entry) => {
      let c = moveCount - 1000;
      entry.item.x = (entry.x - entry.x0) * c / 1000 + entry.x0;
      entry.item.y = (entry.y - entry.y0) * c / 1000 + entry.y0;
      entry.item.children[0].rotation =
          (entry.a - entry.a0) * c / 1000 + entry.a0;
      entry.item.rotation = c / 1000 * entry.outera;
      let c2 = moveCount - 1500
      entry.item.children[0].scale = (entry.s - entry.s0) * c / 1000 + entry.s0;
    });
  });


  bottomLevel.addChild(...turned);
}

function handleClick(event) {
  let a = event.target.rotation;
  event.remove();
  let time = 0;
  event.target.on("tick",function(event){
    time += event.delta;
    if (time < 400) {
      event.target.rotation = (400 - time) / 400 * a;
    } else if (time < 500) {
      event.target.rotation = 0;
    } else {
      event.remove();
      event.target.rotation = 0;
      crooked--;
      if (crooked == 0) {
        advanceLevel();
      }
    }
    //stage.update();
  });
}

let timeSinceEmpty = 0;

function tick(event) {
  stage.update(event);
  if (crooked == 0) {
    timeSinceEmpty += event.delta;
    if (timeSinceEmpty > 5000) {
      advanceLevel();
      timeSinceEmpty = 0;
    }
  } else {
    timeSinceEmpty = 0;
  }
}

function makeQuestionMark() {
  var label = new createjs.Text("?", "128px Arial", "#333333");
  label.x = label.getMeasuredHeight() / 4;
  label.y = height - label.getMeasuredHeight();

  var hit = new createjs.Shape();
  hit.graphics.beginFill("#000").drawRect(0, 0, label.getMeasuredWidth(),
                                          label.getMeasuredHeight());
  label.hitArea = hit;

  label.on("click", function(event) { window.location.href = "about.html"; });

  stage.addChild(label);
}

function init(forever = false) {
  let canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  resize();

  topLevel = new createjs.Container();
  bottomLevel = new createjs.Container();

  stage.addChild(bottomLevel, topLevel);

  makeFirstLevel(forever);

  createjs.Ticker.on("tick",tick);
  dive_forever = forever;

  makeQuestionMark();
}
