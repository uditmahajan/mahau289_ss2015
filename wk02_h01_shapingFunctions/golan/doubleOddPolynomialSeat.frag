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

float doubleOddPolynomialSeat (float x, float a, float b, float n){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 

  float p = 2.0*n + 1.0;
  float y = 0.0;
  if (x <= a){
    y = b - b*pow(1.0-x/a, p);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), p);
  }
  return y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
//     float y = smoothstep(0.1,0.9,st.x);
        float y = doubleOddPolynomialSeat(st.x,abs(sin(u_time)),abs(sin(u_time)), 2.0*(sin(u_time))+1.0);

    vec3 color = vec3(y/abs(cos(u_time)), y/abs(sin(u_time)), y/abs(tan(u_time)));
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
//         color = (1.0-pct)*color*abs(cos(u_time))+pct*vec3(0.0,1.0,0.0);
//     color = (1.0-pct)*color;
//     color = (1.0-pct)*color;
    

    gl_FragColor = vec4(color,1.0);
}