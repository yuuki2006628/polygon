var canvas,
	context,
	width = window.innerWidth,
	height = window.innerHeight;
var POLYGON_NUMBER = 10,
	SIZE = 300,
	polygon_list = [],
	polygon_color = [],
	INIT_POLYGON = 3;

init();

function init(){
	canvas = document.getElementById( "canvas" );
	context = canvas.getContext( "2d" );
	canvas.width = width;
	canvas.height = height;
	var angle = 360/(INIT_POLYGON*180) * Math.PI;
	for (var i = 0; i < POLYGON_NUMBER; i++) {
		var point_list = [];
		polygon_color[i] = colors(Math.random()*360);
		for (var u = 0; u < INIT_POLYGON; u++) {
			var r = u+1;
			point_list[u] = {
				x:(width/2)+ SIZE*Math.cos(angle*r+i),
				y:(height/2)+ SIZE*Math.sin(angle*r + i)
			};
		};
		polygon_list.push(point_list);
		
	};
	onFrame();
}

var _onFrame;

function onFrame(){
	_onFrame = requestAnimationFrame(onFrame);
	draw();
	pologon_number_change();
}


var flag = false;
var f = 1;
var v = 0;
var t = 0;
function pologon_number_change(){
	var d = polygon_list[0].length + f;
	if(d > 100){
		flag = true;
		f = 0
		
	}
	if(d<INIT_POLYGON){
		flag = false;
		f = 1;
		t = Math.random()*360*Math.PI;
		v += 10;
		context.clearRect(0,0,width,height);
	}
	var angle = 360/(d*180) * Math.PI;

	for (var i = 0; i < polygon_list.length; i++) {
		var points = polygon_list[i];
		polygon_color[i] = colors(v);
		for (var u = 0; u < d; u++) {
			var r = u+1;
			points[u] = {
				x:(width/2)+ SIZE*Math.cos(angle*r + t+i),
				y:(height/2)+ SIZE*Math.sin(angle*r + i*t)
			};
		};
		polygon_list[i] = points;
		if(flag){
			polygon_list[i].pop();
		}
	};

}
function draw(){
	context.fillStyle = "rgba(255,255,255, 0.1)";
	context.fillRect(0,0,canvas.width, canvas.height);
	for (var i = 0; i < polygon_list.length; i++) {
		context.beginPath();
		context.lineWidth = 10/POLYGON_NUMBER;
		var this_points = polygon_list[i];
		context.strokeStyle = polygon_color[i];
		for (var u = 0; u < this_points.length; u++) {
			
			u==0?context.moveTo(this_points[u].x,this_points[u].y):
			context.lineTo(this_points[u].x,this_points[u].y);
			if (u == this_points.length-1) {
				context.lineTo(this_points[0].x,this_points[0].y);
			};
		};
		context.stroke();
	};
	
}


function colors(randomNum){
	var s  = 100;
    var l = 50;
    var h = randomNum;
    var hsl = "hsl(" + h + "," + s + "%," + l + "%)";
    return hsl;
}
