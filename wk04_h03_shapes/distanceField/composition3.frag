//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Make three compositions using this technique. If they are animated, even better!

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 st, float w, float h){
    return max( (smoothstep(0.4-w/2., 0.5-w/2.,st.x)-smoothstep(0.5+w/2.,0.6+w/2.,st.x)),(smoothstep(0.4-h/2.,0.5-h/2., st.y)-smoothstep(0.5+h/2.,0.6+h/2.,st.y)));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    float y = rect(st, 0.3*(0.2*(0.1+sin(u_time))),0.3);
    float y2 = rect(st, 0.7*(0.2*(0.1+sin(u_time))),0.7);

    pct = (7.*(distance(st,vec2(0.4)) * distance(st,vec2(0.6))));
    
    vec3 color = vec3(pct/6., pct/1., pct/20.)-vec3(y/3., y/3., y/2.)-vec3(y2/1.,y2/2., y2/10.)+abs(mod(u_time/2., 2.));

	gl_FragColor = vec4( 1.-color, 1.0 );
}