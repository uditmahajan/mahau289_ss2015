//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//04.jpg
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(void)
{
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 offset;

    float time = u_time;

    st-=0.5;
    st*=2.;

    float a = atan(st.y,st.x)+u_time;
    float r = sqrt(dot(st,st));

    offset.x = r*abs(cos(a*2.*PI))+r*abs(sin(a*2.*PI))+u_time;
    offset.y= sin(2.*r) + cos(a*2.);

    vec3 col =  texture2D(u_tex0,st+offset).rgb;

    gl_FragColor = vec4(col,1.0);
}