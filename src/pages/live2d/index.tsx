import { useEffect } from "react";
import './live2d.min.js';

import './live2d-tips';
import './live2d.css';


import { Application } from 'pixi.js';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { Renderer } from '@pixi/core';
import { InteractionManager } from '@pixi/interaction';
import { Live2DModel } from 'pixi-live2d-display/cubism2';
const live2d_path = "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";

Application.registerPlugin(TickerPlugin);
Live2DModel.registerTicker(Ticker);
Renderer.registerPlugin('interaction', InteractionManager);

export default function Live2d() {
  const init = async () => {

    // 模型文件
    const cubism2Model =
      "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
    // 初始化 view
    const app = new Application({
        view: document.getElementById('canvas'),
    });
        // 读取模型
    const model = await Live2DModel.from(cubism2Model, { });
    console.log(model);
    
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
  //  init();
    window.initWidget({
      waifuPath: live2d_path + "waifu-tips.json",
      //apiPath: "https://live2d.fghrsh.net/api/",
      cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
      tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"]
    });
  }, []);

  return <div></div>;
}
