//===================================================
// Parrallax scroll
//===================================================
let bg = document.getElementById("bg");
let mid = document.getElementById("mid");
let front = document.getElementById("front");
let title = document.getElementById("title");

window.addEventListener('scroll', function(){
	var value = window.scrollY;

	bg.style.top = value * 0.5 + 'px';
	mid.style.top = value * 0.15 + 'px';
	front.style.top = value * 0.13 + 'px';
	title.style.top = value * 1 + 'px';
});


//===================================================
// Particle interaction
//===================================================
var NUM_PARTICLES = ( ( ROWS = 100 ) * ( COLS = 180 ) ),
    THICKNESS = Math.pow( 150, 1.8 ),
    SPACING = 8,
    MARGIN = 50,
    COLOR = 220,
    DRAG = 0.90,
    EASE = 0.20,

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
;

particle = {
	vx: 0,
	vy: 0,
	x: 0,
	y: 0
};

function init() {

	container = document.getElementById( 'container' );
	canvas = document.createElement( 'canvas' );
	
	ctx = canvas.getContext( '2d' );
	man = false;
	tog = true;
	
	list = [];
	
	w = canvas.width = COLS * SPACING + MARGIN * 2;
	h = canvas.height = ROWS * SPACING + MARGIN * 2;
	
	// container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
	// container.style.marginTop = Math.round( h * -0.5 ) + 'px';
	
	for ( i = 0; i < NUM_PARTICLES; i++ ) {
	  
	  	p = Object.create( particle );
	  	p.x = p.ox = MARGIN + SPACING * ( i % COLS );
	  	p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
	  
      	list[i] = p;
	}

	container.addEventListener( 'mousemove', function(e) {

	    bounds = container.getBoundingClientRect();
	    mx = e.clientX - bounds.left;
	    my = e.clientY - bounds.top;
	    man = true;
	    
	});
	  
	if ( typeof Stats === 'function' ) {
	    document.body.appendChild( ( stats = new Stats() ).domElement );
	}
	  
	container.appendChild( canvas );
}

function step() {

	if ( stats ) stats.begin();

	if ( tog = !tog ) {

	    if ( !man ) {

	      	t = +new Date() * 0.001;
	      	mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
	      	my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
	    }
	      
	    for ( i = 0; i < NUM_PARTICLES; i++ ) {
	      
	      	p = list[i];
	      
	      	d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
	      	f = -THICKNESS / d;

	      if ( d < THICKNESS ) {
	        t = Math.atan2( dy, dx );
	        p.vx += f * Math.cos(t);
	        p.vy += f * Math.sin(t);
	      }

	      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
	      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

	    }

} else {

	b = ( a = ctx.createImageData( w, h ) ).data;

	for ( i = 0; i < NUM_PARTICLES; i++ ) {

	    p = list[i];
	    b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
	}

	ctx.putImageData( a, 0, 0 );
}

if ( stats ) stats.end();

	requestAnimationFrame( step );
}

init();
step();
//===================================================
// Audio visualization
//===================================================
/**
Muvis Pen: https://codepen.io/one20/pen/GZVBzP
**/
(function() {
  var rotateIndex = 0;
  var playBtn = document.getElementById('playBtn');
  var myAudio = new Muvis("https://s3-us-west-2.amazonaws.com/s.cdpn.io/481938/Shoulder_Closures.mp3", {
    dataMax: 100,
    onLoad: function() {
      playBtn.onclick = function(e) {
        if (!myAudio.isPlaying) {
        	console.log("hello");
          	myAudio.play();
          	this.className = 'stop';
        } else {
          myAudio.stop();
          this.className = '';
        }
      }
    },
    onData: function(data) {
      rotateIndex += .4;
      d3.select('.tiles')
        .style('transform', function() {
          return 'perspective(1000px) rotateX(66deg) rotateZ(' + rotateIndex + 'deg)';
        })
        .selectAll('div')
        .data(data)
        .style('transform', function(h) {
          return 'translateZ(' + ((h / 255) * 100) + 'px)';
        })
        .style('opacity', function(o){
          return (o / 255);
        })
        .enter().append('div')
    },
    onEnded: function() {
      playBtn.className = '';
    }
  });
})();