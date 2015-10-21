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

vec3 colorTopBot = vec3(0.91,0.05,0.24); //91%  5% 24%
vec3 colorOne = vec3(.29, .13, .15);//29% 13% 15%
vec3 colorTwo = vec3(.55, .18, .26);//55% 18% 26%
vec3 colorThree = vec3(.46, .15, .15); //46% 15% 15%
vec3 colorFour = vec3(.39, .2, .19);// 39% 20% 19%
//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pcurve(st.y,1.+abs(sin(u_time)),1.0);
    float y2 = pcurve(.4-st.y,0.2+abs(sin(u_time/20.))*5.,1.0);
    float y3 = pcurve(.4-st.y,0.7+abs(sin(u_time/10.))*4.,1.0);
    float y4 = pcurve(.2-st.y,0.3+abs(sin(u_time/30.))*1.,1.0);
    float y5 = pcurve(.3-st.y,0.4+abs(sin(u_time/5.))*2.,1.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = mix(colorTopBot, colorOne, y);
    
    color = mix(color, colorTwo, y2);
    
    color = mix(color, colorThree, y3);
    
    color = mix(color, colorFour, y4);
    
    color = mix(color, colorTopBot, y5);
//     color = (1.-pct)*color;

    gl_FragColor = vec4(color,1.0);
}