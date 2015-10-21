//////////////////////////////////////////////////////////////// 
// Udit Mahajan                                               //
// MFADT Parsons School of Design                             //
// uditmahajan.com                                            //
// uditmahajan24@gmail.com                                    //
////////////////////////////////////////////////////////////////

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorMid = vec3(.05,0.01,0.65);
vec3 colorTopBot = vec3(0.93,0.36,0.9);

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 2.-x, b );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //y
    float y = pcurve(2.*(2.*st.y-abs(sin(u_time/10.))),1.0,1.0);
    float y2 = pcurve(.5*(1.5*st.y-abs(cos(u_time/2.))),1.0,1.0); 
    float y3 = pcurve(.1*(1.*st.y-abs(sin(u_time/5.))),1.0,1.0);
    
    //x
//     float x = pcurve(.6*(st.x+abs(sin(u_time/10.))),1.0,1.0);
//     float x2 = pcurve(.2*(st.x+abs(cos(u_time/2.))),1.0,1.0); 
//     float x3 = pcurve(1.2*(st.x+abs(sin(u_time/50.))),1.0,1.0);

    vec3 color = vec3(y);
    
    
//     float pct = plot(st,y);
//     color = color;
	color = mix(colorTopBot, colorMid, y);
    color += mix(colorTopBot, colorMid, y2);
    color += mix(colorTopBot, colorMid, y3);
//     color += mix(colorTopBot, colorMid, x);
//     color += mix(colorTopBot, colorMid, x2);
//     color += mix(colorTopBot, colorMid, x3);
    
    
    gl_FragColor = vec4(color,1.0);
}