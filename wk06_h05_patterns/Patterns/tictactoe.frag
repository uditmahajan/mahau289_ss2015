//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Divide the space into 3 rows and 3 columns. Find a way to know in which column and row the thread is and use that to change the shape that is displaying. Try to compose a tic-tac-toe match.

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st, float radius) {
    st -= .5;
    return (1.-step(radius*.5,dot(st,st)*2.))-(1.-step(radius*.4,dot(st,st)*2.));
}

float stripes(vec2 st) {
    return step(st.y,st.x);
}

vec2 tile(vec2 st) {
    return floor(st);
}
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }
    return st;
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
//     float d = distance(st,vec2(.5));
//     d = sin(d*3.14*5.-u_time*3.);
	
    float hash = box(st+vec2(.2,.15), vec2(3.,.01))+box(st-vec2(.2,.15), vec2(3.,.01))+box(st+vec2(.2,.15), vec2(.01,3.))+box(st-vec2(.2,.15), vec2(.01,3.));
   	color += hash;
    
    st *= 3.;
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    
    if (mod(st_i.y,3.)==0. && mod(st_i.x,3.) == 0.) {
        float pct = circle(st_f,.4);
   		color += pct;
    }
    
    if (mod(st_i.y,3.)==1. && mod(st_i.x,3.) == 0.) {
        st_f -=.5;
		st_f = rotate2d( PI/4. ) * st_f;
   		st_f +=.5;
        float pct = cross(st_f, .6);
   		color += pct;
    }
     if (mod(st_i.y,3.)==1. && mod(st_i.x,3.) == 1.) {
        float pct = circle(st_f,.4);
   		color += pct;
    }
    
    if (mod(st_i.y,2.)==0. && mod(st_i.x,3.) == 1.) {
        st_f -=.5;
		st_f = rotate2d( PI/4. ) * st_f;
   		st_f +=.5;
        float pct = cross(st_f, .6);
   		color += pct;
    }
    
	if (mod(st_i.y,3.)==0. && mod(st_i.x,2.) == 0.) {
        float pct = circle(st_f,.4);
   		color += pct;
    }
    
	gl_FragColor = vec4(color,1.0);
}
