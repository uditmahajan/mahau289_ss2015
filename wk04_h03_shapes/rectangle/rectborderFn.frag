//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Make another function that just draws the outline of a rectangle.

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
//     float y = rect(st,0.8,0.6, 0.7, 0.5); // CHANGE VALUES HERE
    float y = rect(st,1.*abs(sin(u_time)),1.*abs(cos(u_time)), 0.9*abs(sin(u_time)), 0.9*abs(cos(u_time))); // CHANGE VALUES HERE
    color = vec3(y);
    
    gl_FragColor = vec4(color,1.0);
}