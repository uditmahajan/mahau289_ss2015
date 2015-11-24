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
    st*=1.;

    float a = atan(st.y,st.x);
    float r = sqrt(dot(st,st))+cos(u_time*.1);

    offset.x = -r*abs(cos(a*2.*PI))+r*abs(sin(r*2.*PI))+sin(u_time)*0.1;
    offset.y = r*abs(cos(a*2.*PI))+r*abs(sin(r*2.*PI))+cos(u_time)*0.1;

    float w = .5+.5*(sin(10.0*r+time)+ .5*cos(10.0*a+time));

    vec3 col =  texture2D(u_tex0,offset).rgb;

    gl_FragColor = vec4(col+w,1.0);
}