// Choose the implementation you like the most and make a function of it that you can reuse in the future. Make your function flexible and efficient.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 st, float w, float h){
    return min((step(0.5-w/2.,st.x)-step(0.5+w/2.,st.x)),(step(0.5-h/2., st.y)-step(0.5+h/2.,st.y)));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
	
    st.y += 0.2;
//     float y = rect(st,0.8,0.2); // CHANGE VALUES HERE
    float y = rect(st,0.8,0.2*abs(sin(u_time))); // CHANGE VALUES HERE
    color = vec3(y);
    
    gl_FragColor = vec4(color,1.0);
}