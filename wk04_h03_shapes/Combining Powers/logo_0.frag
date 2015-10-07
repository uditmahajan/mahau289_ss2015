#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html
float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st))*1.0;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d,d2,d3,d4 = 0.0;
  float a = 0.0;
  float r = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = 9;

  // Angle and radius from the current pixel
//   float a = atan(st.x,st.y)+PI;
//   float r = TWO_PI/float(N);
  
  // Shaping function that modulate the distance
  d = field(3.,0.5,0.5,st); // Number of sides, x position, y position, st
  
  d2 = field(6.,0.5,0.5,st);
  d3 = field(9.,0.5,0.5,st);
  d4 = field(12.,0.5,0.5,st);

//   color = vec3(smoothstep(.5,.52,max(d-abs(sin(u_time)),d2-abs(cos(u_time)))));
    
  
    float field1 = smoothstep(.5,.52,min(min(d*1.6,d2*1.1), min(d3, d4)))-smoothstep(.5,.52,min(min(d3*1.6,d4*1.1), min(d*1.5, d2*.93)));
    
    color = vec3(field1/3., field1/1., field1/(2.*(0.1+abs(sin(u_time))))); 
    
    float field2 = smoothstep(0.3,.32,d3*d2*4.)-smoothstep(0.3,.32,d3*d4*5.);
    
    color -= vec3(field2/30., field2/2., field2/(5.*(0.1+abs(sin(u_time)))));
  // color = vec3(d);

  gl_FragColor = vec4(1.-color,1.0);
}