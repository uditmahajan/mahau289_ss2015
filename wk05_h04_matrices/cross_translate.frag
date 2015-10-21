//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Using u_time together with the shaping functions move the small cross around in an interesting way. Search for a specific quality of motion you are interested in and try to make the cross move in the same way. Recording something from the "real world" first might be useful - it could be the coming and going of waves, a pendulum movement, a bouncing ball, a car accelerating, a bicycle stopping.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y*abs(sin(u_time));
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    vec2 translate = vec2(pow(sin(u_time),2.)*sin(u_time),cos(u_time));
//     vec2 translate = vec2(cos,0.0);
    st += translate*.25;

    // Show the coordinates of the space on the background
    color = vec3(st.x,st.x*st.y,st.y);

    // Add the shape on the foreground
    color *= vec3(cross(st,abs(sin(u_time))));
    
    color += vec3(0.5+sin(u_time), 0.2, 0.3);

    gl_FragColor = vec4(color,1.0);
}