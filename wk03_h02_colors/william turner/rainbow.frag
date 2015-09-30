#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorV = vec3(0.67,0.,0.99); //67%  0% 99%
vec3 colorI = vec3(0.22,0.,0.44); //22%  0% 44%
vec3 colorB = vec3(0.,0.,1.0); //
vec3 colorG = vec3(0.,1.,0.0); //
vec3 colorY = vec3(1.,1.,0.);  // 
vec3 colorO = vec3(0.98,0.29,0.03); //98% 29%  3%
vec3 colorR = vec3(1.,0.,0.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
    if(st.y <= 1./6.){
        pct.b = smoothstep(0., 1./6., st.y);
        color = mix(colorV, colorI, pct.b);
    }else if(st.y >=1./6. && st.y <= 2./6.){
        pct.g = smoothstep(1./6., 2./6., st.y);
        color = mix(colorI, colorB, pct.g);
    }else if(st.y >=2./6. && st.y <= 3./6.){
        pct.r = smoothstep(2./6., 3./6., st.y);
        color = mix(colorB, colorG, pct.r);
    }else if(st.y >=3./6. && st.y <= 4./6.){
        pct.g = smoothstep(3./6., 4./6., st.y);
        color = mix(colorG, colorY, pct.g);
    }else if(st.y >=4./6. && st.y <= 5./6.){
        pct.r = smoothstep(4./6., 5./6., st.y);
        color = mix(colorY, colorO, pct.r);
    }else if(st.y >=5./6. && st.y <= 6./6.){
        pct.r = smoothstep(5./6., 6./6., st.y);
        color = mix(colorO, colorR, pct.r);
    }


    gl_FragColor = vec4(color,1.0);
}