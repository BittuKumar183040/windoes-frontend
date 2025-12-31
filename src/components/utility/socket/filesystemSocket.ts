import type { Node } from "../../../Applications/FileManager/types/node";

const wsUrl = import.meta.env.VITE_WS_URL as string;

type OnMessage = (data: Node) => void;
type OnOpen = (event: Event) => void;

class FileSystemSocket {
  private socket: WebSocket | null = null;

  init(handlers?: { onMessage?: OnMessage; onOpen?: OnOpen }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    if (handlers?.onMessage) {
      this.socket.onmessage = (event) => handlers.onMessage?.(event.data);
    }
    if (handlers?.onOpen) {
      handlers.onOpen(new Event("open"));
    }
    return this.socket;
  }

    const ws = new WebSocket(wsUrl + "/filesystem");
    this.socket = ws;

    ws.onmessage = (event) => { handlers?.onMessage?.(event.data) };

    ws.onopen = (event) => {
      console.log("New Connection opened")
      handlers?.onOpen?.(event);
    };

    ws.onclose = () => {
      console.log("Socket closed");
      this.socket = null;
    };

    return ws;
  }

  send(data: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.warn("WebSocket not open, cannot send:", data);
    }
  }

  close(reason: string = "window closed") {
    if (this.socket) {
      this.socket.close(1000, reason);
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const fileSystemSocket = new FileSystemSocket();
