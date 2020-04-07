x_array = [], y_array = []
coords_array = []
if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context;

  // Initialization sequence.
  function init () {
    // Find the canvas element.
    canvas = document.getElementById('imageView');
    if (!canvas) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    if (!canvas.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    context = canvas.getContext('2d');
    if (!context) {
      alert('Error: failed to getContext!');
      return;
    }

    // Attach the mousemove event handler.
    canvas.addEventListener('mousemove', ev_mousemove, false);
	canvas.addEventListener('mousedown', ev_mousedown, false);
	canvas.addEventListener('mouseup', ev_mouseup, false);
  }

  // The mousemove event handler.
  var started = false;
  function ev_mousemove (ev) {
    var x, y;

    // Get the mouse position relative to the canvas element.
    if (ev.layerX || ev.layerX == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }

    // The event handler works like a drawing pencil which tracks the mouse 
    // movements. We start drawing a path made up of lines.
    if (started) {
		coords_array.push([x,y])		
		context.lineTo(x, y);
		context.stroke();
    }
  }
  function ev_mousedown(ev){
	  var x, y;

    // Get the mouse position relative to the canvas element.
    if (ev.layerX || ev.layerX == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }
	started = true;
	coords_array.push([x,y])	
	context.moveTo(x,y);
  }
  
  function ev_mouseup(ev){
	if (ev.layerX || ev.layerX == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }
	coords_array.push([x,y])
	started = false;
	show_btn();
  } 
  
  function show_btn(){
	document.getElementById("detectDigit").style.display = "block";
  }
  
  init();
}, false); }
 
 function detectDigit_onclick(){
	  width = 0;
	  if (get_highest_x(coords_array) > get_highest_y(coords_array)){
		width = get_highest_x(coords_array)		
	  }
	  else {
		width = get_highest_y(coords_array)
	  }
	  document.getElementById('imageView').getContext("2d").drawImage(
	  document.getElementById('imageView'),
	  get_lowest_x(coords_array), 
	  get_highest_y(coords_array),
	  width, 
	  width, 
	  0,
	  0,
	  width,
	  width)
	  document.getElementById('imageView').getContext("2d").scale(0,0666666666666667, 0,0666666666666667);
	  console.log("detect digit pressed");
	  
	  
  }
  function get_highest_value(arr){
	  if(arr.length == 1){
		return arr[0];
	  }
	  max = arr[0];
	  for(i = 1; i<arr.length; i++){
		if (arr[i]>max){
			max = arr[i];
		}
	  }
	  return max;
  }
  
  function get_lowest_x(arr){
	if(arr.length == 1){
		return arr[0];
	}
	min = arr[0][0];
	for(i=1;i<arr.length;i++){
		if (arr[i][0]<min[0]){
			min = arr[i];
		}
	}
	return min[0];
  }
  
  function get_highest_y(arr){
	if (arr.length == 1){
		return arr[0]
	}
	max = arr[0]
	for(i=1;i<arr.length;i++){
		if(arr[i][1] > max[1]){
			max = arr[i]
		}
	}
	return max[1]
	
  }
  
  function get_highest_x(arr){
	if (arr.length == 1){
		return arr[0]
	}
	max = arr[0]
	for(i=1;i<arr.length;i++){
		if(arr[i][0] > max[0]){
			max = arr[i]
		}
	}
	return max[1]
  }
  