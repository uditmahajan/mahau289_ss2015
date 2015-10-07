// Noise Circle

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
    f = smoothstep(-.5,1., abs(cos(a*200.))+abs(sin(a*200.)))*.01/pow(r,2.);

    color = vec3( smoothstep(f+1.,f,r)-smoothstep(f,f+1.5,r)) ;
    
    color += vec3( smoothstep(f,f-5.,r)-smoothstep(f,f-5.5,r)) ;
//     color -= vec3(sin(u_time), cos(u_time), sin(u_time)*cos(u_time));

    gl_FragColor = vec4(fract(color*1000.), 1.0);
}