//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// 2D Random
float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}
float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st));
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(noise(vec2(abs(sin(u_time/20.)))));
 	float d1, d2, d3, d4 = 0.0;
	float a = 0.0;
  	float r = 0.0;
    
    st -= vec2(0.5);
    // rotate the space
    st = rotate2d(-PI/2.*u_time/.5 ) * st;
    // move it back to the original place
    st += vec2(0.5); 
    
    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*5.)-noise(vec2(noise(st*10.*(.5+abs(sin(u_time/2.))))));

    // Use the noise function
    float n = noise(pos);
	
    st = st *2.-1.;
  
  // Shaping function that modulate the distance
    d1 = field(4.,.5,.5,st)/4.1; // Number of sides, x position, y position, st
	
    d2 = 3.*field(4.,0.5,0.5,st)/9.;    
    
    color += vec3(smoothstep(.2,.4,d1/n)-smoothstep(.2,.4,d2-n));
    
    
    d3 = field(3.,0.5,0.5,st)/.75; 
    
    d4 = field(4.,0.5,0.5,st)/8.; 
    
    color /=vec3(smoothstep(.2,.4,d3)-smoothstep(.2,.23,d4));
   
    
    gl_FragColor = vec4(1.-vec3(color.r/n, color.g*n, color.b/2.*n), 1.0);
}