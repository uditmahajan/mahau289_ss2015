// Make three compositions using this technique. If they are animated, even better!

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
	
    pct = 30.*(distance(st,vec2(abs(sin(u_time/.5)),0.3)) * distance(st,vec2(abs(sin(u_time/2.)),.7)));

    vec3 color = vec3(pct,pct/3.,pct/2.);

	gl_FragColor = vec4( color, 1.0 );
}