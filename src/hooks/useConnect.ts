import Socket, { LISTEN_CONNECT } from "@/socket";
import { DependencyList, useEffect } from "react";

export default function useConnect(init: () => void, arr: DependencyList = []) {
  useEffect(() => {
    const { instance } = Socket || {};
    if (instance.connected) init?.();
    Socket[LISTEN_CONNECT]?.(init);
    return () => {
      instance.removeAllListeners();
    }
  }, arr)
}
