//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return 1.0- smoothstep( pct-0.02, pct, 0.1*abs(cos(u_time))) +
          smoothstep( pct, pct+0.02, 0.3*abs(sin(u_time)));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

//     float y = pow(st.x,5.0);
    float y = sqrt(pow(((0.5-st.x)/sin(u_time)),2.0)+pow(((st.y-0.5)/sin(u_time)),2.0));

    vec3 color = vec3(y);
// 	st = st - vec2(0.5, 0.5);
    float pct = plot(st,y);
    color = (pct)*color+(color*pct)*vec3(sin(u_time),cos(u_time),0.0);
    
    gl_FragColor = vec4(color,1.0);
}