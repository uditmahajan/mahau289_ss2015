//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Combine different shaping functions to cut holes in the shape to make flowers, snowflakes and gears. Use the plot() function we were using in the Shaping Functions Chapter to draw just the contour.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Make the distance field
  d = length( abs(st)-abs(sin(u_time) ));

    vec2 pos = vec2(0.5)-st;

    float r = length(st)*1.0;
    float a = atan(st.y,st.x)+u_time;

    float f = cos(a*3.);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    f = abs(cos(a*12.)*sin(a*3.))*.1+.1;
//     f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    color = vec3(smoothstep(f,f+0.02,d-0.3)-smoothstep(f,f+0.02,d-0.7) );
    
    color-=vec3(fract(d*100000.));

    gl_FragColor = vec4(1.-color, 1.0);
}