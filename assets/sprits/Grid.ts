/*
    0.02版说明：包含三种动画（生成、合并、移动）
*/
// 导入Cocos Creator引擎相关模块
import { _decorator, AudioClip, Color, Component, Label, Node, Sprite, tween, UITransform, Vec3 } from 'cc';
// 注册组件，允许在编辑器中使用
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {
    // 格子背景精灵组件（用于显示颜色）
    private _sprite: Sprite = null;
    // UI变换组件（用于控制大小和位置）
    private _uiTransform: UITransform = null;
    // 数字标签组件（用于显示格子上的数值）
    private _label: Label = null;
    // 格子当前的数值（如2、4、8等）
    private _value: number = 0;
    // 标记格子是否可被控制（预留功能）
    private _canContorl: boolean = false;

    // 组件加载时调用（初始化）
    protected onLoad(): void {
        // 获取精灵组件引用（用于设置背景颜色）
        this._sprite = this.node.getComponent(Sprite);
        // 获取UI变换组件引用（用于设置大小）
        this._uiTransform = this.node.getComponent(UITransform);
        // 获取子节点"GridNumber"上的标签组件（用于显示数字）
        const gridNumberNode = this.node.getChildByName("GridNumber");
        this._label = gridNumberNode.getComponent(Label);
    }

    // 设置格子的大小
    public setSize(width: number, height: number) {
        // 如果UI变换组件存在，设置其宽高
        if (this._uiTransform) {
            this._uiTransform.setContentSize(width, height);
        }
    }

    // 设置格子的数值，animate参数控制是否播放动画
    public setValue(value: number, animate: boolean = false) {
        // 记录旧值，用于判断是否需要播放动画
        const oldValue = this._value;
        // 更新当前值
        this._value = value;
        // 如果标签组件存在，设置显示文本（0不显示）
        if (this._label) {
            this._label.string = value > 0 ? value.toString() : '';
        }

        // 根据数值的位数调整字体大小（避免数字溢出）
        if (value > 0) {
            const digitCount = value.toString().length; // 获取数字的位数
            switch (digitCount) {
                case 1:
                    this._label.fontSize = 130;
                    break;
                case 2:
                    this._label.fontSize = 96.5;
                    break;
                case 3:
                    this._label.fontSize = 69.2;
                    break;
                case 4:
                    this._label.fontSize = 55.6;
                    break;
                default:
                    this._label.fontSize = 10; // 超过4位的特殊处理
            }
        } else {
            this._label.fontSize = 0; // 0值时隐藏文字
        }

        // 更新格子的颜色（背景和文字）
        this.UpdateColor();

        // 动画逻辑：根据数值变化判断是否播放动画
        if (animate) {
            // 新生成格子（从0变为有值）
            if (oldValue === 0 && value > 0) {
                this.playSpawnAnimation();
            } 
            // 合并格子（值变大且旧值不为0）
            else if (value > oldValue && oldValue > 0) {
                this.playMergeAnimation();
            }
        }
    }

    // 更新格子的背景颜色和文字颜色
    private UpdateColor() {
        // 如果精灵组件不存在，直接返回
        if (!this._sprite) return;

        // 定义不同数值对应的背景颜色映射表
        const colorMap: { [key: number]: Color } = {
            0: new Color(205, 193, 180), // 空格子颜色
            2: new Color(238, 228, 218),
            4: new Color(237, 224, 200),
            8: new Color(242, 177, 121),
            16: new Color(245, 149, 99),
            32: new Color(246, 124, 95),
            64: new Color(246, 94, 59),
            128: new Color(237, 207, 114),
            256: new Color(237, 204, 97),
            512: new Color(237, 200, 80),
            1024: new Color(237, 197, 63),
            2048: new Color(237, 194, 46)
        };

        // 设置背景颜色（如果没有对应数值的颜色，默认用空格子颜色）
        this._sprite.color = colorMap[this._value] || colorMap[0];

        // 设置文字颜色（数值>=8用白色，否则用黑色，增强对比度）
        this._label.color = this._value >= 8 ? new Color(249, 246, 242) : new Color(119, 110, 101);
    }

    // 获取当前格子的数值
    public getValue(): number {
        return this._value;
    }

    // 设置格子是否可被控制（预留功能）
    public setControl(_canContorl: boolean) {
        this._canContorl = _canContorl;
    }

    // 获取格子是否可被控制的状态（预留功能）
    public getCanControl(): boolean {
        return this._canContorl;
    }

    // === 动画相关方法 ===

    // 播放移动动画（从当前位置移动到目标位置）
    public playMoveAnimation(targetPos: Vec3, duration: number = 2.0) {
        // 使用tween创建缓动动画：在指定时间内移动到目标位置
        tween(this.node)
            .to(duration, { position: targetPos }, { easing: 'quadOut' }) // quadOut缓动：先快后慢，更自然
            .start(); // 启动动画
    }

    // 播放新生成格子的动画（缩放弹出效果）
    public playSpawnAnimation() {
        // 初始状态：缩放到0（不可见）
        this.node.setScale(new Vec3(0, 0, 1));
        // 动画序列：先放大到1.1倍（0.15秒），再缩小到1倍（0.1秒）
        tween(this.node)
            .to(0.15, { scale: new Vec3(1.1, 1.1, 1) }) // 放大阶段
            .to(0.1, { scale: new Vec3(1, 1, 1) }) // 恢复阶段
            .start(); // 启动动画
    }

    // 播放合并动画（放大后恢复效果）
    public playMergeAnimation() {
        // 动画序列：先放大到1.2倍（0.1秒），再缩小到1倍（0.1秒）
        tween(this.node)
            .to(0.1, { scale: new Vec3(1.2, 1.2, 1) }) // 放大强调合并
            .to(0.1, { scale: new Vec3(1, 1, 1) }) // 恢复正常大小
            .start(); // 启动动画
    }

    // 组件启动时调用（空实现，预留）
    start() { }

    // 每帧更新（空实现，预留）
    update(deltaTime: number) { }
}
