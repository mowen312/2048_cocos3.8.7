import { _decorator, Component, Node } from 'cc';
import { Grid } from './Grid';
// import { Chessboard } from './Chessboard';
import { Chessboard } from './Chessboard';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameOverUI } from './UI/GameOverUI';
import { Score } from './Score';
const { ccclass, property } = _decorator;

enum GameState{
    // 游戏状态
    Ready,
    Gaming,
    GameOver
}

@ccclass('GameManager')
export class GameManager extends Component {
    // 单例模式
    // 静态变量，存储 GameManager 的唯一实例
    private static _insc:GameManager = null;
    
    

    // 导入组件
    @property(Grid)
    grid:Grid = null;

    // @property(Chessboard)
    // chessboard: Chessboard = null;

    @property({ type: Chessboard }) 
    public chessboard: Chessboard | null = null;

    @property(GameReadyUI)
    gameReadyUI:GameReadyUI = null;

    @property(GameOverUI)
    gameOverUI: GameOverUI = null;

    curGS: GameState = GameState.Ready;

    // 静态方法，提供全局访问实例的入口
    public static inst(){
        return this._insc;
    }

    onLoad() {
        GameManager._insc = this;

        // 监听棋盘得分事件
        if (this.chessboard) {
            this.chessboard.node.on('score', (value: number) => {
                const score = this.node.getComponent(Score);
                if (score) {
                    score.onScore(value); // 直接调用得分逻辑
                }
            });
        }
    }

protected start(): void {
    this.transitionToReadyState();

     if (this.chessboard && this.chessboard.node) {
        this.chessboard.node.on('game-over', (evt: { has2048?: boolean }) => {
            this.GameOver(evt?.has2048);
        }, this);
    }
}

    transitionToReadyState(){
        this.curGS = GameState.Ready;
        // 启用ui
        if(this.gameReadyUI){
            this.gameReadyUI.EnableGameReadyUI();
        }

        if(this.gameOverUI){
            this.gameOverUI.DisableGameOverUI();
        }


        // 初始禁用滑动
        if ( this.chessboard ){
            this.chessboard.setSwipeEnable(false);
        }
    }

    StartGame(){
        this.curGS = GameState.Gaming;

        // 启用滑动
        if( this.chessboard ){
            this.chessboard.setSwipeEnable(true);
        }
    }


    GameOver(isSuccess: boolean = false){
        this.curGS = GameState.GameOver;

        // 启用ui，传递是否成功的状态
        if(this.gameOverUI){
            this.gameOverUI.EnableGameOverUI(isSuccess);
        }

        if(this.gameReadyUI){
            this.gameReadyUI.DisableGameReadyUI();
        }

        // 禁用滑动
        if(this.chessboard){
            this.chessboard.setSwipeEnable(false);
        }
    }

    PlayAgain(){
        if(Chessboard){
            this.chessboard.initChessboard();
            this.chessboard.setSwipeEnable(true);
        }

        const score = this.node.getComponent(Score);
        if (score) score.resetScore();
    }


    update(deltaTime: number) {
        
    }
}


// function type(arg0: string): (target: GameManager, propertyKey: "chessboard") => void {
//     throw new Error('Function not implemented.');
// }

