//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = 2.*PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st))*1.0;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
	
    float d=0.;
	
    // Divide the space in 4
    st = tile(st,8.);   
	
    d = field(8.,0.75,0.75,st); // Number of sides, x position, y position, st
//     color = vec3(d);
    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25*-u_time);
    color = vec3(1.0-smoothstep(.4,.41,d));
    
    // Draw a square
    color -= vec3(box(st,vec2(.1,1.),0.01));
    
    
    
    
    color -= vec3(0.,sin(u_time*2.),cos(u_time*2.));

    gl_FragColor = vec4(color,1.0);    
}