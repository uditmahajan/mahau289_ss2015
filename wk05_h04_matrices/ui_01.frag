//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float boxy(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.y;
}
float boxx(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x;
}

float crossy(in vec2 _st, float _size){
    return  boxy(_st, vec2(_size,_size/4.)) + 
            boxy(_st, vec2(_size/4.,_size));
}

float crossx(in vec2 _st, float _size){
    return  boxx(_st, vec2(_size,_size/4.)) + 
            boxx(_st, vec2(_size/4.,_size));
}

float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st));
}

void main(){
    float d,d1,d2,d3,d4 = 0.0;
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    vec2 translate = vec2(0.0,0.0);
//     st -= translate*0.2;
    st = st *2.-1.;
    d1 = field(100.,0.5,0.5,st);
    d2 = field(100.,0.5,0.5,st);
    
    float field1 = smoothstep(.1,.12,d2)-smoothstep(.2,.22,d1)-smoothstep(.3,.32,d1)-smoothstep(.4,.42,d1)-smoothstep(.5,.52,d1)-smoothstep(.6,.62,d1)-smoothstep(.7,.72,d1)-smoothstep(.8,.82,d1);
    
    color += vec3(fract(field1)); 
    
    st+=1.;
    st/=2.;

    // Add the shape on the foreground
    color += (5.*vec3(crossy(st,.9)))*(5.*vec3(crossx(st,0.01))); // y-axis
    
    color += (5.*vec3(crossx(st,.9)))*(5.*vec3(crossy(st,0.01))); //x-axis
    
    translate = vec2(0.3*cos(u_time*2.*PI),.3*sin(u_time*2.*PI)); //speed
    st += translate*.5; 
    
    color += (5.*vec3(crossx(st,0.05))*(5.*vec3(crossy(st,0.05)))); // square
    
    st = st *2.-1.;
    
    translate = vec2(0.2*cos(u_time*3.*PI),0.2*sin(u_time*3.*PI));
    
    st += translate*1.;
    d = 10.*field(3.,0.5,0.5,st); // Number of sides, x position, y position, st
	
    
  color += 1.-vec3(smoothstep(.4,.41,d)); // triangle
    
    st += translate*0.5;
    
    translate = vec2(.2*cos(u_time*2.*PI),.2*sin(u_time*2.*PI)); //speed
    st += vec2(0.5);
    st -= translate*2.;
    
    color += (5.*vec3(crossx(st,0.02))*(5.*vec3(crossy(st,0.02)))); // dot
    gl_FragColor = vec4(color,1.0);
}