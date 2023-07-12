import { Card, Space } from "antd";
import { useNavigate } from "react-router";

export default function Rooms() {
  const rooms = Array(10).fill(0);
  const n = useNavigate();

  const joinRoom = (room: number) => {
    n(`/draw?room=${room}`);
  }

  return (
    <Space>
      {rooms.map((item, i) => (
        <Card onClick={() => {
          joinRoom(i)
        }} key={i}>{i.toString()}</Card>
      ))}
    </Space>
  )
}
