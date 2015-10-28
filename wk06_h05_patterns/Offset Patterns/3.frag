//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Make another animation where even rows move to the left and odd rows move to the right.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 brickR(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5-u_time;
    }
    return st;
}
vec2 brickL(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 0.) {
        st.x += .5+u_time;
    }
    return st;
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    st /= vec2(2.15,0.6)/1.5;

    st*=10.;

    st = brickR(st);
    st = brickL(st);
    
    vec2 st_f = fract(st);
    
    vec2 pct = brickR(st_f);
    color += vec3(pct,.5);
    
    color = vec3(box(st_f,vec2(0.8))-box(st_f,vec2(0.7)));

    gl_FragColor = vec4(color,1.0);    
}