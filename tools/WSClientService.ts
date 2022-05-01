import { ScheduledTask, TIME_PERIOD } from "./ScheduledTask";

const DEFAULT_REFRESH_RATE = TIME_PERIOD.sec / 40;


export class WebSocketClientService extends ScheduledTask {
  static instance
  static ws;
  static msgData;
  static msgCount = 0;
  static isConnected;

  static data;
  static lastTimeSent;


  constructor(address, refreshRate = 25) {
    super(refreshRate)
    // if first instance init
    // if (!WebSocketClientService.instances.length) WebSocketClientService.init();
    if (!WebSocketClientService.ws) {
      console.log("[WebSocketClientService] Init")
      WebSocketClientService.ws = new WebSocket(address);
      WebSocketClientService.ws.onmessage = WebSocketClientService.onMsg;

      WebSocketClientService.ws.onopen = (event) => {
        console.log("[WebSocket] Connection opened");
        WebSocketClientService.isConnected = true;
      };

      WebSocketClientService.ws.onclose = (event) => {
        console.log("[WebSocket] Connection closed");
        WebSocketClientService.isConnected = false;
        // setTimeout(initWebSocket, 2000);
      };

    } else {
      console.warn("[WebSocketClientService] is singleton")
    }
  }

  static createSingleton(address) {
    WebSocketClientService.instance = WebSocketClientService.instance ? WebSocketClientService.instance : new WebSocketClientService(address)
    return WebSocketClientService.instance
  }
  // sendMsg(msgData) {
  //   // const msgData = {};
  //   // msgData[this.service] = serviceData;
  //   // inject service type in message
  //   msgData.service = this.service;
  //   WebSocketClientService.sendData(msgData)
  // }

  /**
   * Watch data queue for update
   */
  onTick() {
    // Watch data queue for update
    if (WebSocketClientService.data) WebSocketClientService.sendData(WebSocketClientService.data)
    // Send keepalive
    // else if()

    WebSocketClientService.data = null; // clear data
  }

  static onMsg(evt: MessageEvent<any>) {
    // const content = document.createTextNode(event.data);
    //   console.log(event.data);
    WebSocketClientService.msgData = evt.data;
    WebSocketClientService.msgCount++;
    console.log(this.msgData);
  }

  /**
   * Send data to websocket server
   */
  static sendData(data, service?) {
    if (WebSocketClientService.isConnected) {
      data.service = service ? service : data.service
      // console.log(`send data to ${data.service} service`, data)
      const msg = JSON.stringify(data);
      console.log("[WebSocketClientService] sending data")
      try {
        WebSocketClientService.ws.send(msg); //send msg to the server
      } catch (error) {
        console.log(error); // catch error
      }
    }
  }

}
