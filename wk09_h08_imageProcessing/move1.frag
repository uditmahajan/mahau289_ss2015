//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////
//02.jpg

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e5);
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(st.x,st.y,0.0,1.0);

    vec2 offset = vec2(0.);
    
    // st.y+=0.5;

    vec2 st_f = fract(st);
    vec2 st_i = floor(st*3.);
    
    offset.x = -u_time+random(st_i.y);
    color.r = texture2D(u_tex0,(st+offset)).g;
    offset.x = u_time/10.;
    color.g = texture2D(u_tex0,(st+offset)).b;
    offset.x = -u_time*.999*random(st_i.y);
    color.b = texture2D(u_tex0,(st+offset)).r;

    gl_FragColor =color;
}