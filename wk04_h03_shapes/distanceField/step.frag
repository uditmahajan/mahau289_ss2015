//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Use step() to turn everything above 0.5 to white and everything below to 0.0.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = 2.*distance(st,vec2(0.5));

    // b. The LENGTH of the vector 
    //    from the pixel to the center 
//     vec2 toCenter = vec2(0.5)-st;
//     pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
//     vec2 tC = vec2(.5)-st;
//     pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = vec3(pct);

	gl_FragColor = vec4( step(0.5,color), 1.0 );
}