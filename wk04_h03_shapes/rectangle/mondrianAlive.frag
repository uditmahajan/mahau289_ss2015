//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Experiment with the same code but using smoothstep() instead of step(). Note that by changing values, you can go from blurred edges to elegant smooth borders.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 st, float w, float h, float w1, float h1){
    return min((step(0.5-w/2.,st.x)-step(0.5+w/2.,st.x)),(step(0.5-h/2., st.y)-step(0.5+h/2.,st.y))) - min((step(0.5-w1/2.,st.x)-step(0.5+w1/2.,st.x)),(step(0.5-h1/2., st.y)-step(0.5+h1/2.,st.y)));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
	
//     st.y += 0.2;
//     float y = rect(st,0.9,0.8, 0.3, 0.2); // CHANGE VALUES HERE
    float y = rect(st,1.*abs(sin(u_time)),1.*abs(cos(u_time)), 0.9*abs(sin(u_time*0.1)), 0.9*abs(cos(u_time))); // CHANGE VALUES HERE
    float y1 = rect(st,0.8*abs(sin(u_time*0.5)),0.5*abs(sin(u_time)), 0.4*abs(cos(u_time)), 0.3*abs(cos(u_time)));
    
    float y2 = rect(st,0.9*abs(cos(u_time*2.)),0.2*abs(sin(u_time*3.)), 0.1*abs(cos(u_time/5.)), 0.3*abs(sin(u_time/4.)));
    
    color = vec3(y*abs(sin(u_time)), y1-abs(sin(u_time*2.)), y2*abs(sin(u_time*3.)));
    
    gl_FragColor = vec4(color,1.0);
}