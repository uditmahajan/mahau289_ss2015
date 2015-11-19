//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Make an animated composition of several shapes 'dancing' together using noise.

//Construct "organic-looking" shapes using the noise function.

//Once you have your "creature," try to develop it further into a character by assigning it a particular movement.

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
    return (cos(floor(.5+a/r)*r-a)*length(st));
}

float random(float x){
    return fract(sin(x)*10e5);
}

float noise(vec2 st){
    st *= 10.*(abs(sin(u_time/10.))+.5);
    st.x+=u_time;
//     st*=2.;
    float x = st.x;
    float i = floor(x);  // integer
	float f = fract(x);  // fraction

float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
return mix(random(i), random(i + 1.0), u);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  float d1, d2 = 0.0;
  float a = 0.0;
  float r = 0.0;
	
  st -= vec2(0.5);
    // rotate the space
    st = rotate2d(-PI/2. ) * st;
    // move it back to the original place
    st += vec2(0.5);  
    
  float n = noise(st);  
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  
  // Shaping function that modulate the distance
  d1 = field(9.,n,1.5,st); // Number of sides, x position, y position, st
	
  d2 = field(6.,0.5,n,st);    
    
  color = vec3(smoothstep(.2,.8,d1)-smoothstep(.2,.8,d2));

  gl_FragColor = vec4(color,1.0);
}