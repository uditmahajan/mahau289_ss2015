//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Once you are happy with an implementation, make a function of it that you can reuse in the future.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smoothgrad(vec2 st, float start, float end){
    return smoothstep(start, end, 2.*distance(st,vec2(0.5)));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec3 color = vec3(smoothgrad(st, 0.4, 0.9)); // CHANGE VALUES HERE

	gl_FragColor = vec4( color, 1.0 );
}