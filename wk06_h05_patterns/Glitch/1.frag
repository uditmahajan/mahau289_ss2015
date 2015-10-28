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
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st)/2.);
}
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    
    float d,d1,d2 = 0.0;
  	float a = 0.0;
 	float r = 0.0;

//     int N = 9;
// 	    st.x += mod(u_time/2.,3.);      // Scale up the space
    st.x *= 6.;
    st = fract(st); // Wrap arround 1.0

  	st = st *4.-1.;
    
//     if(mod(st_i.y,2.)==0.){
//  		d = .3*field(3.,1.,.5,st); 
//     }
    
	d1 = .3*field(3.,0.5,0., rotate2D(st,PI));

    color = (vec3(smoothstep(.4,.41,d))+vec3(smoothstep(.4,.41,d1)))*vec3(.8,.76,.73)+vec3(.39,.48,.54); //80% 76% 73% // 39% 48% 54% 
    
	gl_FragColor = vec4(color,1.0);
}


