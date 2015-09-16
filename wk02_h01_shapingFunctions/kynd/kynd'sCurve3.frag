#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

//position, peak, width
float F(float x, float p, float w){
//     return x;
    return 1.0-pow(abs(sin(3.14159*x/2.0)), p);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
//   	vec2 st = gl_FragCoord.xy/u_mouse;
    vec3 color = vec3(0.0);
    
    float count = u_time;
    
    float pos = F(st.x, 3.0*abs(sin(count)), 0.1);
    pos += F(st.y, 3.0*abs(sin(count)), 0.1);
    
    color = vec3(pos);
    gl_FragColor = vec4(color,1.0);
    
}

////////////////////////////////////////////////////////////////////////
//Equation applied to shader
////////////////////////////////////////////////////////////////////////


#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

//position, peak, width
float F(float x, float p, float w){
//     return x;
    return 1.0-pow(abs(sin(3.14159*x/2.0)), p);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
//   	vec2 st = gl_FragCoord.xy/u_mouse;
    vec3 color = vec3(0.0);
    
    float count = u_time;
    
    float pos = F(st.x, 3.0*abs(sin(count/2.0)), 0.1);
    pos += F(st.y, 3.0*abs(sin(count/2.0)), 0.1);
    
    color = vec3(pos, pos/1.7, pos/3.0);
    gl_FragColor = vec4(color,1.0);
    
}