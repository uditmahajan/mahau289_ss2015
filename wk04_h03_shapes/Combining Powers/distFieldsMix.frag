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
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html
float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI-u_time/5.;
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
  
  d2 = field(2.,0.4,0.55,st);
  d3 = field(5.,(0.7),0.55,st);
  d4 = field(6.,(0.5),0.35,st);

//   color = vec3(smoothstep(.5,.52,max(d-abs(sin(u_time)),d2-abs(cos(u_time)))));
    
  
    float field1 = smoothstep(.5,.1,min(min(d*(1.-(0.2*sin(u_time)))*1.6,d2*(1.-(0.1*sin(u_time)))*1.1), min(d3, d4)))-smoothstep(.5,.6,min(min(d3*(1.-(.1*sin(u_time)))*1.6,d4*(1.-(0.1*sin(u_time)))*1.1), min(d*(1.-(0.1*sin(u_time)))*1.5, d2*.93)));
    
    color = vec3(field1/(30.*(0.1+abs(sin(u_time)))), field1/(1.*(0.1+abs(cos(u_time)))), field1/(2.*(0.1+abs(sin(u_time))))); 
    
    float field2 = smoothstep(0.3,.5,d3*(1.-(0.1*sin(u_time)))*d2*4.)-smoothstep(0.3,.72,d3*(1.-(0.4*sin(u_time)))*d4*5.);
    
    color -= vec3(field2/(3.*(0.1+abs(cos(u_time)))), field2/(20.*(0.1+abs(sin(u_time)))), field2/(50.*(0.1+abs(sin(u_time)))));
  // color = vec3(d);
    
    color -= vec3(sin(u_time), cos(u_time), sin(u_time)*cos(u_time));

  gl_FragColor = vec4(1.-color,1.0);
}