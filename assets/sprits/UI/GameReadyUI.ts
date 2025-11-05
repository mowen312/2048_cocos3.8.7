import { _decorator, Button, Component, Node } from 'cc';
import { GameManager } from '../GameManager';
import { GameOverUI } from './GameOverUI';
const { ccclass, property } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {

    @property(Button)
    startButton: Button = null;


    start() {
        // 当 startButton 被点击时，会自动调用当前脚本中的 onStartGame 方法，
        this.startButton.node.on(Button.EventType.CLICK, this.onStartGame, this);
        // 启用自身ui
        this.EnableGameReadyUI();

    }

    private onStartGame() {
        // 通知游戏管理器开始游戏
        GameManager.inst().StartGame();
        // 隐藏开始界面
        this.DisableGameReadyUI();
    }

    DisableGameReadyUI(){
        // 隐藏开始界面
        this.node.active = false;
    }

    EnableGameReadyUI(){
        // 显示开始界面
        this.node.active = true;

    }

    update(deltaTime: number) {
        
    }
}


