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

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
	
    vec2 st_i = floor(st);
    
    if(mod(st_i.x,2.)==0.){
    	st.y -= mod(u_time,1.);      // Scale up the space by 3
    	st.x *= 1.;
    }
//     else if(mod(st_i.x,2.)==1.){
//     	st.y += mod(u_time,1.);      // Scale up the space by 3
//     	st.x *= 1.;
//     }
    vec2 st_f = fract(st); // Wrap arround 1.0

    // Now we have 3 spaces that goes from 0-1

    color = vec3(st_f.x,st_f.y,st_f.x/st_f.y*vec3(circle(st_f,0.5)));
    color -= vec3(circle(st,0.4));
    
	gl_FragColor = vec4(1.-color,1.0);
}


