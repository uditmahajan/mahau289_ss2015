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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float shape(vec2 st, float radius) {
// 	st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
    float f = radius;
    m += noise(st+u_time*0.1)*.5;
    // a *= 1.+abs(atan(u_time*0.2))*.1;
    // a *= 1.+noise(st+u_time*0.1)*0.1;
    f += sin(a*50.)*noise(st+u_time*.2)*.1;
    f += (sin(a*20.)*.1*pow(m,2.));
    return 1.-smoothstep(f,f+0.007,r);
}

float shapeBorder(vec2 st, float radius, float width) {
    return shape(st,radius)-shape(st,radius-width);
}

float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st));
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    float d1, d2, d3, d4 = 0.0;
 
    
    st = st *2.-1.;
    
	vec3 color = vec3(1.0) * shapeBorder(st,0.8,0.02);
    
    d1 = 1.9*field(4.,.5,.5,st);
    
    d2 = 2.*field(4.,.5,.5,st);
    
    d3 = field(4.,.5,.5,st)/1.;
    
    d4 = field(4.,.5,.5,st)/1.03;
    
    st = rotate2d(-PI/2.*u_time/.5 ) * st;
    
    color = (vec3(smoothstep(.5,.51,d3)-smoothstep(0.5,0.51,d4)))-vec3(shape(st,1.1));
    
//     st -= vec2(0.5);
    // rotate the space
    st = rotate2d(PI/4.*2.*u_time ) * st;
    // move it back to the original place
//     st += vec2(0.5); 
    
    color += (vec3(smoothstep(.5,.52,d2)-smoothstep(0.5,0.52,d1)))+vec3(shape(st,.6));
    
//     color += vec3(smoothstep(.5,.52,noise(st*4.))+smoothstep(0.5,0.52,noise(st*10.)));

	gl_FragColor = vec4( 1.-color, 1.0 );
}