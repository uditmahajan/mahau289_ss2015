import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class processing extends PApplet {

//////////////////////////////////////////////////////////////// 
// Udit Mahajan, MFADT Parsons School of Design, uditmahajan.com
////////////////////////////////////////////////////////////////

PShader shader;

public void setup() {
  size(640, 360, P2D);
  noStroke();
  
  // Load and compile shader
  shader = loadShader("shader.frag");
}

public void draw() {
  // Set uniforms
  shader.set("u_resolution", PApplet.parseFloat(width), PApplet.parseFloat(height));
  shader.set("u_mouse", PApplet.parseFloat(mouseX), PApplet.parseFloat(mouseY));
  shader.set("u_time", millis() / 1000.0f);
  
  // Replace the default pipeline programs with our shader
  shader(shader);
  
  // Draw a billboard
  rect(0,0,width,height);
}

public void keyPressed(){
  // Reload shader everytime a key is press
  shader = loadShader("shader.frag");
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "processing" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
