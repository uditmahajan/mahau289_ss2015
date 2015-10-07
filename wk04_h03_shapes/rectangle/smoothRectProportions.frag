// Experiment with the same code but using smoothstep() instead of step(). Note that by changing values, you can go from blurred edges to elegant smooth borders.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
	vec2 bl = smoothstep(vec2(0.1, 0.2),vec2(0.2, 0.5),st);       // bottom-left
    vec2 tr = smoothstep(vec2(0.1, 0.2),vec2(0.2, 0.5),1.0-st);   // top-right
    color = vec3(bl.x * bl.y * tr.x * tr.y);

    gl_FragColor = vec4(color,1.0);
}