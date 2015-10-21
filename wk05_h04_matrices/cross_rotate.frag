//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Use rotations to improve the animation you simulated in the translation exercise.

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

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

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    vec2 translate = vec2(sin(u_time),cos(u_time));
//     vec2 translate = vec2(cos,0.0);
    st += translate*.25;
	
     st -= vec2(0.5);
    // rotate the space
    st = rotate2d( abs(sin(u_time))*4.*PI ) * st;
    // move it back to the original place
    st += vec2(0.5);
    
    // Show the coordinates of the space on the background
    color = vec3(st.x,st.x*st.y,st.y);

    // Add the shape on the foreground
    color *= vec3(cross(st,abs(sin(u_time))));
    
    color += vec3(0.5+sin(u_time), 0.2, 0.3);

    gl_FragColor = vec4(color,1.0);
}