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
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}



float parabola( float x, float k )
{
    return pow( 4.0*x*(1.0-x), k );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
//     float y = smoothstep(0.1,0.9,st.x);
        float y = parabola(st.x,10.0*abs(sin(u_time)));

    vec3 color = vec3(y/abs(cos(u_time)), y/abs(sin(u_time)), y/abs(tan(u_time)));
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
//         color = (1.0-pct)*color*abs(cos(u_time))+pct*vec3(0.0,1.0,0.0);
//     color = (1.0-pct)*color;
//     color = (1.0-pct)*color;
    

    gl_FragColor = vec4(color,1.0);
}