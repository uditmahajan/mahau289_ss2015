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

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

float random(float x){
    return fract(sin(x)*10e5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
	
    st *= vec2(100.,10.);
//         st.y *= 2.;
    // Step will return 0.0 unless the value is over 0.5,
    // in that case it will return 1.0
//     float y = step(0.5,st.x);

//     vec3 color = vec3(y);

//     float pct = plot(st,y);
//     color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    
    float time = floor(u_time);
    float speed = 20.;
    
    float changeSpeed = .5;
    
    if(mod(floor(u_time), 5.)==0.){
        changeSpeed = random(1.);
    }
    
    if(st_i.y == 0.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*-u_time);
    }
    
    if(st_i.y == 1.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*u_time);
    }
    if(st_i.y == 2.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*-u_time/5.);
    }
    
    if(st_i.y == 3.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*u_time*.2);
    }
    if(st_i.y == 4.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*-u_time*1.);
    }
    
    if(st_i.y == 5.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*u_time*.3);
    }
    if(st_i.y == 6.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*-u_time*4.);
    }
    
    if(st_i.y == 7.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*u_time*.9);
    }
    if(st_i.y == 8.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*-u_time/2.);
    }
    
    if(st_i.y == 9.){
        st_f.y = 1.-st_f.x;
        time = floor(speed*u_time/8.);
    }
    
   
    
//     float time = floor(u_time*5.);
    
    float pct = random(time+st_i.x);
    
    vec3 color = vec3(step(pct,st_f.y)-step(.3,st_f.y));

    color += vec3(random(st.y*sin(time)));
    
    gl_FragColor = vec4(1.-color,1.0);
}