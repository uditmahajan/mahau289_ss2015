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

vec3 colorTopBot = vec3(0.01,0.5,0.24); //91%  5% 24%
vec3 colorOne = vec3(.29, .13, .15);//44% 41% 99%
vec3 colorTwo = vec3(.65, .18, .36);//55% 18% 26%
vec3 colorThree = vec3(.06, .15, .55); //46% 15% 15%
vec3 colorFour = vec3(.03, .2, .99);// 39% 20% 19%
//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(-.9,4.,1.5),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = sqrt(pow(((0.5-st.x)),2.0)+pow(((st.y-0.5)),2.0))*.6;
    
    float y5 = sqrt(pow(((0.5-st.x)),2.0)+pow(((st.y-0.5)),2.0)) - abs(cos(u_time/5.));
    float y6 = sqrt(pow(((0.5-st.x)),2.0)+pow(((st.y-0.5)),2.0)) - abs(sin(u_time/20.));
    
    float y7 = sqrt(pow(((0.5-st.x)),2.0)+pow(((st.y-0.5)),2.0)) - abs(sin(u_time/10.));

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = mix(color, colorOne, 5.-y);
    
//     color = mix(color, colorTwo, y2);
    
//     color = mix(color, colorThree, y3);
    
//     color = mix(color, colorFour, y4);
    
    color = mix(color, colorTwo, 2.-y5);
    color = mix(color, colorThree, 6. - y6);
    color = mix(color, colorFour, y7);
    
	
    gl_FragColor = vec4(color,1.0);
}