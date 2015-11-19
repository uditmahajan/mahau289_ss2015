//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

//Make your own float noise(float x) function.

//Use your noise function to animate a shape by moving it, rotating it or scaling it.

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float x){
    return fract(sin(x)*10e5);
}

float noise(vec2 st){
    st *= 100.*(abs(sin(u_time/10.))+.5);
    float x = st.x;
    float i = floor(x);  // integer
	float f = fract(x);  // fraction

float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
return mix(random(i), random(i + 1.0), u);
}

float rect(vec2 st, float w, float h){
    return min((step(0.5-w/2.,st.x)-step(0.5+w/2.,st.x)),(step(0.5-h/2., st.y)-step(0.5+h/2.,st.y)));
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    
    st -= vec2(0.5);
    // rotate the space
    st = rotate2d( (-u_time)*.1*PI ) * st;
    // move it back to the original place
    st += vec2(0.5);
    
    float n = noise(st);
    
    float y = rect(st,.05,.7); // CHANGE VALUES HERE
    color = vec3(y);

    gl_FragColor = vec4(color*vec3(n),1.0);
}