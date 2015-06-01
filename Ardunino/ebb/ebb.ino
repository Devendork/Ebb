/*
  Example Bluetooth Serial Passthrough Sketch
 by: Jim Lindblom
 SparkFun Electronics
 date: February 26, 2013
 license: Public domain
 
 This example sketch converts an RN-42 bluetooth module to
 communicate at 9600 bps (from 115200), and passes any serial
 data between Serial Monitor and bluetooth module.
 */
#include <SoftwareSerial.h>  
#define BUFFER_SIZE 64

const int output[5] = {12, 11, 10, 9, 8};

int bluetoothTx = 3;  // TX-O pin of bluetooth mate, Arduino D2
int bluetoothRx = 4;  // RX-I pin of bluetooth mate, Arduino D3
char rx_buf[BUFFER_SIZE] = {0};
int rx_len = 0;

SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

void setup()
{
  Serial.begin(9600);  // Begin the serial monitor at 9600bps

  bluetooth.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  bluetooth.print("$$$");  // Enter command mode
  delay(100);  // Short delay, wait for the Mate to send back CMD
  bluetooth.println("U,9600,N");  // Temporarily Change the baudrate to 9600, no parity
  // 115200 can be too fast at times for NewSoftSerial to relay the data reliably
  bluetooth.begin(9600);  // Start bluetooth serial at 9600
  
  for(int i = 0; i < 5; i++){
    pinMode(output[i], OUTPUT);
  }
    
   for(int i = 0; i < 5; i++){
    digitalWrite(output[i], LOW);
  }
  
  
  
}

void bufferData(char c) {
  if (rx_len < BUFFER_SIZE) {
      rx_buf[rx_len++] = c;
  }
}


void checkBluetooth(){
  //receive incoming data
  if (bluetooth.available()) {
    while (bluetooth.available()) {
      char c = bluetooth.read();
      if (c == 0xA || c == 0xD) { // \n or \r
        //add the NULL character as EOF
        bufferData(NULL);
        digestData();
      } 
      else {
        bufferData(c);
      }
    }
  }
}

void digestData(){
   
  Serial.write("<- ");
  Serial.write(rx_buf[0]);
  int value = atoi(rx_buf+1);
  Serial.println(value);
  
  if(rx_buf[0] == 'b'){
    parseBits(value);
  }else if(rx_buf[0] == 'c'){
    for(int i = 0; i < 5; i++){
      digitalWrite(output[i], LOW);
    }
  }
   
  rx_len = 0;
  bluetooth.flush();   
}

void parseBits(int x){
  int check[5] = {1, 2, 4, 8, 16};
  for(int i = 4; i >= 0; i--){
    if(x - check[i] >= 0){
      digitalWrite(output[i], HIGH);
      x -= check[i];
    }else{
      digitalWrite(output[i], LOW);
    }
  }
}


void loop()
{  
  checkBluetooth();
}


