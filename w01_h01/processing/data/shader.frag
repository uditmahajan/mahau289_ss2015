#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.st/u_mouse;
	//gl_FragColor = vec4(st.x,st.y,0.0,1.0);
	gl_FragColor = vec4(abs(sin(u_time*st.x)),abs(sin(st.y*u_time*0.5)),abs(cos(u_time)),1.0);
}