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
	
    pct = 3.*min(distance(st,vec2(abs(sin(u_time/10.)),abs(sin(u_time/20.)))), distance(st,vec2(abs(sin(u_time/20.)),abs(sin(u_time/5.)))));

    vec3 color = vec3(pct/5.,pct/2.,pct);

	gl_FragColor = vec4( 1.-color, 1.0 );
}