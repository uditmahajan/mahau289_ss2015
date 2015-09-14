#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	//Slow down the frequency until the color change becomes almost imperceptible.
	gl_FragColor = vec4(abs(sin(u_time*0.01)),0.0,0.0,1); 

	//Play with the three channels (RGB) in different frequencies to get interesting patterns and behaviors.
	gl_FragColor = vec4(abs(sin(u_time*0.3)),abs(sin(u_time*0.1)),abs(sin(u_time*0.05)),abs(sin(u_time*20.0)));

	//Can you figure out how to use u_mouse knowing that the values are in pixels and NOT normalized values? Can you use it to move colors around?
	vec2 st = gl_FragCoord.xy/u_mouse;
    gl_FragColor = vec4(st.x,st.y,0.0,1.0);

    //Can you imagine an interesting way of changing this color pattern using u_time and u_mouse coordinates?
    gl_FragColor = vec4(abs(sin(u_time*st.x)),abs(sin(st.y*u_time*0.5)),abs(cos(u_time)),1.0);
}