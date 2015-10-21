//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

// Combine different shaping functions to cut holes in the shape to make flowers, snowflakes and gears. Use the plot() function we were using in the Shaping Functions Chapter to draw just the contour.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*5.0+(sin(u_time)*cos(u_time));
    float a = atan(pos.y,pos.x)+sin(u_time);

    float f = cos(a*30.);
    // f = abs(cos(a*3.));
//     f = abs(cos(a*2.5)+abs(sin(u_time)))*.5+.3;
//     f = abs(cos(a*7.)*sin(a*30.))*.8+.1+mod(u_time,.5);
    f = smoothstep(-.5,1., abs(cos(a*20.))*abs(sin(a*20.)))*.02/pow(st.y,3.);

    color = vec3( smoothstep(f-0.2,f,r)-smoothstep(f,f+0.2,r-mod(u_time,.05))) ;
    
    color -= vec3(sin(u_time), cos(u_time), sin(u_time)*cos(u_time));

    gl_FragColor = vec4(color, 1.0);
}