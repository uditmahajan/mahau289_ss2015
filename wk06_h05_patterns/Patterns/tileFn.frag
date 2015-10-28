//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Make a reusable function of this tiling trick.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

vec2 tile(float num, vec2 _st){
    _st *= num;
    return fract(_st);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st = tile(5.,st); // Wrap arround 1.0

    // Now we have 3 spaces that goes from 0-1

    color = vec3(st,0.0);
    //color = vec3(circle(st,0.5));
    
	gl_FragColor = vec4(color,1.0);
}


