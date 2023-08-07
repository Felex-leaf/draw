import { Card, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface Room { room: number, people: number };

export default function Rooms() {
  const rooms: Record<string, Room> = Array(10).fill(0).reduce((pre, item, room) => {
    pre[room] = {
      room,
      people: 0
    }
    return pre;
  }, {});
  const n = useNavigate();

  const joinRoom = (room: number) => {
    n(`/draw?room=${room}`);
  }

  useEffect(() => {

  })

  return (
    <Space>
      {Object.keys(rooms).map((key, i) => {
        const { room, people } = rooms[key];
        return (
          <Card
            onClick={() => {
              joinRoom(room)
            }}
            title={`${people || 0}人`}
            key={i}
          >
            {i.toString()}
          </Card>
        )
      })}
    </Space>
  )
}
