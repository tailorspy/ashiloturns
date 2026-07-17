// As Hilo Turns
//
// A simple javascript game

var stage;
var preload;

var art_crooked = 0;
var rooms_cleared = 0;
var art_rightened = 0;

var images = [
  "images/mona_lisa.png",
];

var borders = [
  "images/border.png",
];

var nextButton = "images/next2.png";
var infoButton = "images/info2.png";

var nextButtonObj;

var imagex = 74;
var imagey = 106;
var marginx = 84;
var marginy = 125;

var scale = 1;

function generateAngle() {
  if (.5 > Math.random()) {
    return 7 + 5 * Math.random();
  } else {
    return -7 - 5 * Math.random();
  }
}

function addPainting(x, y, imageNum = -1, borderNum = -1, rotateChance = .1) {
  var container = new createjs.Container();
  container.mouseChildren = false;

  var rotate = rotateChance > Math.random();
  if (rotate) {
    art_crooked++;
    container.rotation = generateAngle();
  }

  if (imageNum == -1) imageNum = Math.floor(Math.random() * paintings.length);
  if (borderNum == -1) borderNum = 0;

  var paintingObj = preload.getResult(paintings[imageNum].file);
  var borderObj = preload.getResult(borders[borderNum]);
  var painting = new createjs.Bitmap(paintingObj);
  var edges = new createjs.Bitmap(borderObj);

  container.x = x;
  container.y = y;
  container.regX = imagex / 2;

  container.addChild(painting, edges);
  container.on("click", paintingClick);
  stage.addChild(container);
}

function paintingClick(event) {
  var clicked = event.target;
  if (clicked.rotation != 0) {
    art_crooked--;
    clicked.rotation = 0;
    art_rightened++;

    if (art_crooked == 0) {
      rooms_cleared++;
      nextButtonObj.rotation = 10;
    }
  }

  stage.update();
}

function addInfoButton(x, y, empty) {
  var container = new createjs.Container();

  var imageNum = Math.floor(Math.random() * paintings.length);
  var infoObj = preload.getResult(infoButton);

  var paintingObj = preload.getResult(paintings[imageNum].file);
  var borderObj = preload.getResult(borders[0]);
  var painting = new createjs.Bitmap(paintingObj);
  var edges = new createjs.Bitmap(borderObj);
  var info = new createjs.Bitmap(infoObj);

  container.x = x;
  container.y = y;
  container.regX = imagex / 2;

  container.addChild(painting, edges, info);
  stage.addChild(container);
 
  if (empty) {
    container.on("click", clickInfo2);
  } else {
    container.on("click", clickInfo);
  }
}

function clickInfo2() {
  window.location.href = "info.html";
}

function clickInfo() {
  var text = new createjs.Text("","16px Arial","#ffffff");
  var width = canvas.width / scale;
  text.lineWidth = width * .80;
  text.x = width * .1;
  text.y = width * .1;
  text.text += "Welcome to Hilo Museum!"
  text.text += "\n\n";
  text.text += "Currently, you have finished: " + rooms_cleared + " rooms\n";
  text.text += "And straigthened: " + art_rightened + " paintings\n\n";
  text.text +=
      "Hilo Museum sits in the center of Hilo Island, the third largest island in the central Pacific.  Over the centuries, Hilo Museum has amassed an unparalleled art collection.  Hilo Island sits at the confluence of 17 tetonic plates which spins the entire landmass like the world's slowest carousel.  Seismic activity also poses the greatest threat to the art collection.  The frequent little tremors do little more than turn the paintings askew, making the great art colleciton look like an unregulated mess.";
  text.text += "\n\n";
  text.text +=
      "Thank you for volunteering to help out.  It's really simple, just go from room to room and straighten any crooked artwork you find.  Nothing bad happened to the last volunteer, they just left after the last full moon.  Nothing wrong there.  Anyways, have fun and try not to take it too seriously.  It's not like you unlock something special after a hundred rooms or something.  Nope, nothing weird about this museum at all.";
  text.text += "\n\n";

  text.text += "As Hilo turns, so must you turn the paintings level again.";
  stage.removeAllChildren();
  createGallery(false, true);
  stage.addChild(text);
  stage.update();
}

function addNextButton(x, y) {
  var container = new createjs.Container();

  var imageNum = Math.floor(Math.random() * paintings.length);
  var infoObj = preload.getResult(infoButton);

  var paintingObj = preload.getResult(paintings[imageNum].file);
  var borderObj = preload.getResult(borders[0]);
  var nextObj = preload.getResult(nextButton);
  var painting = new createjs.Bitmap(paintingObj);
  var edges = new createjs.Bitmap(borderObj);
  var next = new createjs.Bitmap(nextObj);

  container.x = x;
  container.y = y;
  container.regX = imagex / 2;

  if (art_crooked == 0) {
    container.rotation = generateAngle();
  }

  container.addChild(painting, edges, next);
  stage.addChild(container);

  container.on("click", function(event) { createGallery(); });

  nextButtonObj = container;
}

// Create a grid of images to match the screen size.
// On firstRun, only have image rotated.
function createGallery(firstRun = false, empty = false) {
  resize();
  stage.removeAllChildren();
  art_crooked = 0;

  var width = canvas.width / scale;
  var height = canvas.height / scale;

  var limity = Math.trunc(height / marginy) - 1;
  var limitx = Math.trunc((width - marginx/2) / marginx) - 1;

  var startx = (width - (limitx - 1) * marginx) / 2;
  var starty = marginy / 2;

  for (y = starty, j = 0; j < limity; y += marginy, ++j) {
    for (x = startx, i = 0; i < limitx; x += marginx, ++i) {
      if (j == limity - 1 && i == 0) {
        addInfoButton(x, y, empty);
      } else if (j == limity - 1 && i == limitx - 1) {
        addNextButton(x, y);
      } else {
        if (empty) continue;
        if (firstRun) {
          if (i == 1 && j == 1) {
            addPainting(x, y, -1, -1, 1);
          } else {
            addPainting(x, y, -1, -1, 0);
          }
        } else {
          addPainting(x, y);
        }
      }
    }
  }

  stage.update();
}

// After all files are loaded, create first level.
function handleFileComplete() {
  createGallery(true);
}

// Load all graphics before using them.
function preload() {
  preload = new createjs.LoadQueue();

  preload.on("complete", handleFileComplete, this);
  paintings.forEach(painting => {
    preload.loadFile(painting.file);
  });
  preload.loadManifest(borders);
  preload.loadFile(nextButton);
  preload.loadFile(infoButton);
}

// Resize canvas to match window size.
function resize() {
  var x = window.innerWidth;
  var y = window.innerHeight;
  if ( x < 640 || y < 480 ) {
    document.getElementById("body").style.overflow = "scroll";
  } else {
    document.getElementById("body").style.overflow = "hidden";
  }
  canvas.width = x > 640 ? x : 640;
  canvas.height = y > 480 ? y : 480;
  canvas.background = "black";
}

// Called after body is loaded to set up the canvas.
function init() {
  var canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  // Trying to detect mobile devices.
  if (createjs.Touch.isSupported()) {
    scale = 2;
  } else {
    scale = 1;
  }

  stage.scale = scale;

  preload();

  window.onresize = windowResize;
}

function windowResize() {
  createGallery(true);
}
