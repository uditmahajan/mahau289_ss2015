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

vec3 colorA = vec3(1.,0.74,0.05); //100% 74%  5%
vec3 colorB = vec3(0.83,.03,0.06); //83%  3%  6%
vec3 colorC = vec3(0.,0.,.0); // 0%  0%  0%

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
    if(st.y <= 0.33){
        pct.b = step(0.33, st.y);
        color = mix(colorA, colorB, pct.b);
    }else if(st.y >=0.33 && st.y <= 0.66){
        pct.g = step(0.66, st.y);
        color = mix(colorB, colorC, pct.g);
    }else if(st.y >= 0.66){
        pct.r = step(1., st.y);
        color = mix(colorC, colorA, pct.r);
    }

    gl_FragColor = vec4(color,1.0);
}