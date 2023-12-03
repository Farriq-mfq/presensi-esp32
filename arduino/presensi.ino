#include <WiFi.h>
#include <SocketIoClient.h>

const char* ssid = "Halllo";
const char* password = "farriqmfq";

/// Socket.IO Settings ///
char host[] = "192.168.95.151";                   // Socket.IO Server Address
int port = 4000;                                  // Socket.IO Port Address
char path[] = "/socket.io/?transport=websocket";  // Socket.IO Base Path
bool useSSL = false;                              // Use SSL Authentication
const char* sslFingerprint = "";                  // SSL Certificate Fingerprint
bool useAuth = false;                             // use Socket.IO Authentication
const char* serverUsername = "socketIOUsername";
const char* serverPassword = "socketIOPassword";

SocketIoClient webSocket;
WiFiClient client;


bool led_state = true;
String mode = "PRESENSI";
void socket_Connected(const char* payload, size_t length) {
  Serial.println("Socket.IO Connected!");
}

void changeLedState(const char* payload, size_t length) {
  Serial.print(payload);
  if (led_state) {
    led_state = false;
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    led_state = true;
    digitalWrite(LED_BUILTIN, LOW);
  }
  webSocket.emit("STATE_LAMPU", led_state ? "\"1\"" : "\"0\"");
  Serial.print(led_state);
}

void changeMode(const char* payload, size_t length) {
  mode = String(payload);
  Serial.print(mode);
}

void setup() {
  Serial.begin(115200);
  delay(10);

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
  // webSocket.on("ONLAMPU", changeLedState);
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
}