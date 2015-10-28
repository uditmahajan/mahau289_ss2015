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
uniform float u_time;

#define PI 3.14159265358979323846

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

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,5.);   

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25);

    // Draw a square
    color = vec3(box(vec2(st.x),vec2(.1,.1),0.01),0.,0.);
    // color = vec3(st,0.0);
    st = tile(st,3.); 
    st = rotate2D(st,PI*u_time);
    color += vec3(box(vec2(st.y),vec2(0.9,.5),0.01),0.,1.);
    
    st = tile(st,5.); 
    color += vec3(box(vec2(st.x-.1,st.y-0.4),vec2(0.7,.6),0.01),0.,1.);

    gl_FragColor = vec4(color,1.0);    
}