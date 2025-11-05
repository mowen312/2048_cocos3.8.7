import { _decorator, AudioClip, Component, EventTouch, Node, Vec2 } from 'cc';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

enum SwipeDirection {
    Up,
    Down,
    Left,
    Right,
    None
}

@ccclass('Swipe')
export class Swipe extends Component {
    @property
    minSwipeDistance: number = 0; // 滑动阈值

    @property(Node)
    chessboardNode: Node = null;

     // 声明音频资源属性
    @property(AudioClip)
    clickAudio:AudioClip = null;

    private startPos: Vec2 = new Vec2(0, 0);
    private isSwiping: boolean = false; // 标记是否正在滑动

    protected onLoad() {
        // 注册触摸事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        console.log("Swipe组件初始化，已注册触摸事件"); // 初始化日志
    }

    protected onTouchStart(event: EventTouch) {
        this.startPos = event.getLocation();
        this.isSwiping = false;
        // 触摸开始日志，打印起始位置
       // console.log(`触摸开始 - 位置: (${this.startPos.x.toFixed(0)}, ${this.startPos.y.toFixed(0)})`);
        console.log("触摸开始");
    }

    protected onTouchMove(event: EventTouch) {
        this.isSwiping = true;
        const currentPos = event.getLocation();
        const deltaX = currentPos.x - this.startPos.x;
        const deltaY = currentPos.y - this.startPos.y;
        // 触摸移动日志，打印当前位置和偏移量
        //console.log(`触摸移动 - 当前位置: (${currentPos.x.toFixed(0)}, ${currentPos.y.toFixed(0)}) | 偏移: (${deltaX.toFixed(0)}, ${deltaY.toFixed(0)})`);
    }

    protected onTouchEnd(event: EventTouch) {
        const endPos = event.getLocation();
        const deltaX = endPos.x - this.startPos.x;
        const deltaY = endPos.y - this.startPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // 触摸结束基础信息日志
        console.log(`触摸结束 - 结束位置: (${endPos.x.toFixed(0)}, ${endPos.y.toFixed(0)}) | 总偏移: (${deltaX.toFixed(0)}, ${deltaY.toFixed(0)}) | 滑动距离: ${distance.toFixed(0)}`);

        let direction: SwipeDirection = SwipeDirection.None;
        // 滑动距离达标且有移动行为，才判定为有效滑动
        if (this.isSwiping && distance >= this.minSwipeDistance) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                direction = deltaX > 0 ? SwipeDirection.Right : SwipeDirection.Left;
            } else {
                direction = deltaY > 0 ? SwipeDirection.Up : SwipeDirection.Down;
            }
            // 有效滑动方向日志
            console.log(`有效滑动 - 方向: ${this.getDirectionText(direction)}`);
        } else {
            // 无效滑动日志
            console.log(`无效滑动 - 距离不足或未移动 (阈值: ${this.minSwipeDistance})`);
        }

        this.emitSwipeEvent(direction);
        this.isSwiping = false;
    }

    protected onTouchCancel(event: EventTouch) {
        this.isSwiping = false;
        console.log("触摸取消 - 触摸事件被中断"); // 触摸取消日志
    }

    private emitSwipeEvent(direction: SwipeDirection) {
         // 播放滑动音效（方向有效才播）
        if (direction !== SwipeDirection.None && this.clickAudio) {
            AudioMgr.inst.playOneShot(this.clickAudio);
        }

        if (this.chessboardNode) {
            this.chessboardNode.emit('swipe', direction);
            console.log(`已向棋盘发送滑动事件 - 方向: ${this.getDirectionText(direction)}`); // 事件发送日志
        } else {
            console.warn("未设置chessboardNode，无法发送滑动事件"); // 警告日志
        }
    }

    // 辅助方法：将方向枚举转为文本
    private getDirectionText(direction: SwipeDirection): string {
        switch(direction) {
            case SwipeDirection.Up: return "上";
            case SwipeDirection.Down: return "下";
            case SwipeDirection.Left: return "左";
            case SwipeDirection.Right: return "右";
            default: return "无";
        }
    }

    protected onDestroy() {
        // 移除事件监听，避免内存泄漏
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        console.log("Swipe组件销毁，已移除触摸事件监听"); // 销毁日志
    }
}
