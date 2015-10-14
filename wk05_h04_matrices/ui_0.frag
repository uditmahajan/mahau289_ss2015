// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float boxy(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.y;
}
float boxx(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x;
}

float crossy(in vec2 _st, float _size){
    return  boxy(_st, vec2(_size,_size/4.)) + 
            boxy(_st, vec2(_size/4.,_size));
}

float crossx(in vec2 _st, float _size){
    return  boxx(_st, vec2(_size,_size/4.)) + 
            boxx(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    vec2 translate = vec2(0.0,0.0);
//     st -= translate*0.2;

    // Add the shape on the foreground
    color += (5.*vec3(crossy(st,.9)))*(5.*vec3(crossx(st,0.01)));
    
    color += (5.*vec3(crossx(st,.9)))*(5.*vec3(crossy(st,0.01)));
    
    st += translate*0.1;
//     color *= ;
    
    translate = vec2(.1*cos(u_time),.1*sin(u_time));
    st -= translate*0.3;
    
    color += (2.*vec3(crossx(st,0.01))*(5.*vec3(crossy(st,0.01))));
    
translate = vec2(0.2*cos(u_time),0.2*sin(u_time));
    st -= translate*0.5;
    
    color += (5.*vec3(crossx(st,0.05))*(5.*vec3(crossy(st,0.05))));
    gl_FragColor = vec4(color,1.0);
}