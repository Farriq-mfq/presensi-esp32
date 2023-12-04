#include <WiFi.h>
#include <SocketIoClient.h>
#include <MFRC522.h>
#include <SPI.h>
#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);
const char* ssid = "Halllo";
const char* password = "farriqmfq";

/// Socket.IO Settings ///
char host[] = "192.168.199.151";
int port = 4000;
char path[] = "/socket.io/?transport=websocket";
bool useSSL = false;
const char* sslFingerprint = "";
bool useAuth = false;
const char* serverUsername = "socketIOUsername";
const char* serverPassword = "socketIOPassword";

SocketIoClient webSocket;
WiFiClient client;


String mode = "PRESENSI";
void socket_Connected(const char* payload, size_t length) {
  Serial.println("Socket.IO Connected!");
}


void changeMode(const char* payload, size_t length) {
  mode = String(payload);
  Serial.print(mode);
}



void setup() {
  Serial.begin(115200);
  // init rfid
  SPI.begin();
  rfid.PCD_Init();
  // end init rfid
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  webSocket.on("connect", socket_Connected);
  webSocket.emit("IOT_CONNECT", "\"BERHASIL\"");
  webSocket.on("IOT_MODE", changeMode);
  // Setup Connection
  if (useSSL) {
    webSocket.beginSSL(host, port, path, sslFingerprint);
  } else {
    webSocket.begin(host, port, path);
  }

  // Handle Authentication
  if (useAuth) {
    webSocket.setAuthorization(serverUsername, serverPassword);
  }
}

void loop() {
  webSocket.loop();
  if (mode.equals("REGISTER")) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(500);
    digitalWrite(LED_BUILTIN, LOW);
    delay(500);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }
  handleRfid();
}


void handleRfid() {
  if (rfid.PICC_IsNewCardPresent()) {
    if (rfid.PICC_ReadCardSerial()) {
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));
      Serial.print("UID:");
      String uuid = "";
      for (int i = 0; i < rfid.uid.size; i++) {
        uuid += rfid.uid.uidByte[i];
      }
      if (mode.equals("REGISTER")) {
        webSocket.emit("RFID_REGISTER", uuid.c_str());
      } else {
        webSocket.emit("RFID_PRESENSI", uuid.c_str());
      }

      Serial.print(uuid);
      Serial.println();

      rfid.PICC_HaltA();
      rfid.PCD_StopCrypto1();
    }
  }
}
