//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////
//00.jpg, 04.jpg
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
    st*=1.;

    float a = atan(st.y,st.x);
    float r = sqrt(dot(st,st));

    offset.x = -r*abs(cos(a*2.*PI))+r*abs(sin(r*2.*PI))+u_time;
    offset.y = r*abs(cos(a*2.*PI))+r*abs(sin(r*2.*PI))+u_time;

    float w = .5+.5*(sin(time+1.0*r)+ .7*cos(time+1.0*a));

    vec3 col =  texture2D(u_tex0,offset).rgb;

    gl_FragColor = vec4(col+w,1.0);
}