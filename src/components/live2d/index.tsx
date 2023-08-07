import { useEffect } from "react";
import PIXI, { Application } from 'pixi.js';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { Live2DModel } from "pixi-live2d-display";

Live2DModel.registerTicker(Ticker);
Application.registerPlugin(TickerPlugin);


export default function Live2d() {
  const init = async ( ) => {
    // 初始化 view
    const app = new PIXI.Application({
      view: document.getElementById("live2d") as HTMLCanvasElement,
    });

    // 读取模型
    const model = await Live2DModel.from('shizuku.model.json');

    // 显示模型
    app.stage.addChild(model);
    // transforms
    model.x = 100;
    model.y = 100;
    model.rotation = Math.PI;
    model.skew.x = Math.PI;
    model.scale.set(2, 2);
    model.anchor.set(0.5, 0.5);

    // interaction
    model.on('hit', (hitAreas) => {
        if (hitAreas.includes('body')) {
            model.motion('tap_body');
        }
 });
  }

  useEffect(() => {
    init();
  }, []);

  return <canvas id="live2d" />;
}
