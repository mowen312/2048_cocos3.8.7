import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {

    // 游戏中实时显示的“当前得分”标签
    @property(Label)
    presentScore: Label = null;

    // 游戏中实时显示的“历史最高分”标签
    @property(Label)
    highestScoreEver: Label = null;

    // 游戏结束界面显示的“本局分数”标签
    @property(Label)
    currentScore: Label = null;

    // 游戏结束界面显示的“历史最佳分数”标签
    @property(Label)
    bestScore: Label = null;

    // 当前局内得分（内存变量）
    private _presentScore: number = 0;

    // 历史最高分（从本地存储读取）
    private _highestScoreEver: number = 0;


    // 组件加载时触发：读取存档、初始化显示、注册得分事件
    protected onLoad(): void {
        // 从浏览器本地存储读取历史最高分，不存在则默认为 0
        this._highestScoreEver = parseInt(localStorage.getItem('bestScore') || '0');
        // 同步所有 Label 的初始文字
        this.UpDataLabels();
        // 监听同节点发出的自定义事件 'score'，收到后调用 onScore 方法
        this.node.on('score', this.onScore, this);
    }

    // 得分事件回调：value 为合并后新生成的数字（如 4、8、16...）
    public onScore(value: number): void {
        // 累加到当前局内得分
        this._presentScore += value;
        // 如果突破历史最高分，则更新并持久化
        if (this._presentScore > this._highestScoreEver) {
            this._highestScoreEver = this._presentScore;
            // 写入浏览器本地存储，key 为 'bestScore'
            localStorage.setItem('bestScore', this._highestScoreEver.toString());
        }
        // 刷新所有相关 Label 的显示
        this.UpDataLabels();
    }

    // 统一刷新四个 Label 的显示文字
    private UpDataLabels(): void {
        if (this.presentScore) {
            this.presentScore.string = this._presentScore.toString();
        }
        if (this.highestScoreEver) {
            this.highestScoreEver.string = this._highestScoreEver.toString();
        }
        if (this.currentScore) {
            this.currentScore.string = this._presentScore.toString();
        }
        if (this.bestScore) {
            this.bestScore.string = this._highestScoreEver.toString();
        }
    }

    // 重新开始时重置当前局内得分并刷新显示
    public resetScore(): void {
        this._presentScore = 0;
        this.UpDataLabels();
    }

    start() { }
    update(deltaTime: number) { }
}


