import { _decorator, Button, Component, Game, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
import { GameReadyUI } from './GameReadyUI';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    // 再来一局按钮
    @property(Button)
    AgainButton: Button = null;

    // 游戏结束文本
    @property(Label)
    gameOverLabel: Label = null;


    start() {
        this.AgainButton.node.on(Button.EventType.CLICK,this.onPlayAgainGame,this);
        // 启用自身ui,在这里不可以直接禁用gameReadyui,初始化会冲突
        this.EnableGameOverUI();
    }

    onPlayAgainGame(){
        // 点击按钮之后，调用
        // 游戏开始
        GameManager.inst().PlayAgain();

        // 隐藏游戏结束界面
        this.DisableGameOverUI();
    }

    public DisableGameOverUI(){
        // 隐藏游戏结束界面
        this.node.active = false;
    }

    EnableGameOverUI(isSuccess: boolean = false){
        // 展示游戏结束界面
        this.node.active = true;

        // 根据是否成功显示不同文本
        if (this.gameOverLabel) {
            this.gameOverLabel.string = isSuccess ? "恭喜通关" : "Game Over";
        }
    }

    update(deltaTime: number) {
        
    }
}


