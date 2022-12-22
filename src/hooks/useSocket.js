import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SocketContext from '../wssConnection/socketContext';


export default function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(url);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socket;
}
