// What about moving this circle? Can you move it and place different circles in a single billboard?

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smoothgrad(vec2 st, float start, float end, float centerX, float centerY){
    return smoothstep(start, end, 2.*distance(st,vec2(centerX, centerY)));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec3 color = vec3(smoothgrad(st,0.8, 0.0, 0.3,abs(sin(u_time))), smoothgrad(st,0.9, 0.3, abs(sin(u_time)),0.5),smoothgrad(st,0.6, 0.2, 0.7*abs(sin(u_time)),0.7*abs(sin(u_time)))); // CHANGE VALUES HERE

	gl_FragColor = vec4( color, 1.0 );
}