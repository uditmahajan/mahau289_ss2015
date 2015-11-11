//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////


#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(10.0,0.);
    st.y *=2.;
//     st = (st-vec2(5.0))*(abs(sin(u_time*0.2))*5.);
//     st.x += u_time*3.0;
	
    if(mod(st.y,2.) == 0.){
//         fpos.y = sin(u_time)-fpos.y;
        st.x+=u_time;
        st.y+=u_time;
    }
    if(mod(st.y,2.) == 1.){
//         fpos.y = sin(u_time)-fpos.y;
        st.x+=u_time;
        st.y+=u_time;
    }
    
    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
	
    
    
    vec2 tile = truchetPattern(fpos, random( ipos ));

    float color = 0.0;
	
    
    
    // Maze
    color = smoothstep(tile.x-0.01,tile.x,random(ipos))-
            smoothstep(tile.x,tile.x+0.01,random(ipos)-.3);

    // Circles
    color *= (step(length(tile),0.6) -
             step(length(tile),0.4) ) +
            (step(length(tile-vec2(1.)),0.6) -
             step(length(tile-vec2(1.)),0.4) );

    // Truchet (2 triangles)
    // color = step(tile.x,tile.y);

    gl_FragColor = vec4(vec3(color),1.0);
}