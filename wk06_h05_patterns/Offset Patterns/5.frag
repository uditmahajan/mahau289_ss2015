//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Try combining an offset on x and y axis to get something like this:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 brickR(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += -u_time;
    }
    return st;
}
vec2 brickL(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 0.) {
        st.x += u_time;
    }
    return st;
}
vec2 brickU(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,2.) == 1.) {
        st.y += -u_time;
    }
    return st;
}
vec2 brickD(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,2.) == 0.) {
        st.y += u_time;
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
//     st /= vec2(1.15,1.8)/1.5;

    st*=10.;
	
    if(mod(floor(u_time),2.) == 0.){
    	st = brickR(st);
   		st = brickL(st);
    }
    if(mod(floor(u_time),2.) == 1.){
    	st = brickU(st);
   		st = brickD(st);
    }
    
    vec2 st_f = fract(st);
    
    vec2 pct = brickL(st_f);
    color += vec3(pct,.5);
    
    color = vec3(box(st_f,vec2(.5))-box(st_f,vec2(.4)));

    gl_FragColor = vec4(1.-color,1.0);    
}