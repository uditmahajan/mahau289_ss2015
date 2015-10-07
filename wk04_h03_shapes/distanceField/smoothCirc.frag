// Using smoothstep(), experiment with different values to get nice smooth borders on your circle.

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

	gl_FragColor = vec4( smoothstep(0.4,0.9,color), 1.0 );
}