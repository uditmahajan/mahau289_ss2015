//Do another implementation that uses floor().

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
	vec2 bl = step(floor(vec2(.0)),st);       // bottom-left
    vec2 tr = smoothstep(1.5-vec2(0.5, 0.5),1.-vec2(0.4, 0.8),1.-st);   // top-right
    color = vec3(bl.x * bl.y * tr.x * tr.y);

    gl_FragColor = vec4(color,1.0);
}