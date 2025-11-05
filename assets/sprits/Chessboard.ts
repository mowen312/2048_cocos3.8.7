// /*
//     0.02版说明：有三种动画

// */




import { _decorator, Component, instantiate, Layout, Node, Prefab, tween, UITransform, Vec3 } from 'cc';
import { Grid } from './Grid';
import { Swipe } from './Swipe';
import { Score } from './Score';
const { ccclass, property } = _decorator;

enum SwipeDirection {
    Up,
    Down,
    Left,
    Right,
    None
}

// 定义移动项（用于播放平移动画）
type Move = {
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    value: number,          // 原始值（被移动的方块原先的值）
    merged: boolean,        // 是否为合并移动（会把该 tile 移到目标并合并）
    resultValue?: number    // 合并后的值（只有 merged=true 时有）
};

@ccclass('Chessboard')
export class Chessboard extends Component {
    @property(Prefab)
    gridPrefab: Prefab = null;

    @property
    rowCount: number = 4;
    @property
    colCount: number = 4;

    @property
    gap: number = 10;

    private gridData: (Grid | null)[][] = [];
    private values: number[][] = [];
    private gridWidth: number = 0;
    private gridHeight: number = 0;
    private isSwipeEnabled: boolean = false;

    protected onLoad(): void {
        this.initChessboard();
        this.node.on('swipe', this.handleSwipe, this);
    }

    public initChessboard() {
        this.gridData = new Array(this.rowCount);
        for (let i = 0; i < this.rowCount; i++) {
            this.gridData[i] = new Array(this.colCount).fill(null);
        }

        this.values = new Array(this.rowCount);
        for (let i = 0; i < this.rowCount; i++) {
            this.values[i] = new Array(this.colCount).fill(0);
        }

        const ChessboardSize = this.node.getComponent(UITransform);
        const ChessboardWidth = ChessboardSize.width;
        const ChessboardHeight = ChessboardSize.height;

        const GridWidth = (ChessboardWidth - (this.colCount - 1) * this.gap) / this.colCount;
        const GridHeight = (ChessboardHeight - (this.rowCount - 1) * this.gap) / this.rowCount;
        this.gridWidth = GridWidth;
        this.gridHeight = GridHeight;

        this.MakeGrids();

        // 初始两个随机格子（显示生成动画）
        this.spawnRandomGrid(true);
        this.spawnRandomGrid(true);

        const layout = this.node.getComponent(Layout);
        if (layout) layout.updateLayout();
    }

    private MakeGrids() {
        this.node.removeAllChildren();

        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                const x = j * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
                const y = -i * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;
                const gridNode = instantiate(this.gridPrefab);
                gridNode.setPosition(x, y);
                this.node.addChild(gridNode);

                const gridComp = gridNode.getComponent(Grid);
                if (gridComp) {
                    gridComp.setSize(this.gridWidth, this.gridHeight);
                    gridComp.setValue(0);
                    this.gridData[i][j] = gridComp;
                }
            }
        }
    }

    public setSwipeEnable(enabled: boolean) {
        this.isSwipeEnabled = enabled;
        console.log(`滑动功能${enabled ? '启用' : '禁用'}`);
    }

    private async handleSwipe(direction: SwipeDirection) {
        if (!this.isSwipeEnabled) return;
        const directionText = {
            [SwipeDirection.Up]: "上",
            [SwipeDirection.Down]: "下",
            [SwipeDirection.Left]: "左",
            [SwipeDirection.Right]: "右",
            [SwipeDirection.None]: "无"
        };
        if (direction === SwipeDirection.None) return;

        console.log(`开始处理${directionText[direction]}向移动`);
        let result: { moved: boolean, moves: Move[] } = { moved: false, moves: [] };

        switch (direction) {
            case SwipeDirection.Up: result = this.moveUp(); break;
            case SwipeDirection.Down: result = this.moveDown(); break;
            case SwipeDirection.Left: result = this.moveLeft(); break;
            case SwipeDirection.Right: result = this.moveRight(); break;
        }

        if (result.moved) {
            // 播放平移动画（等待完成），然后生成新格子并检查游戏结束
            await this.playMovesAnimation(result.moves);
            // 生成随机格子（带生成动画）
            this.spawnRandomGrid(true);

            if (this.CheckGameOver()) {
                this.node.emit('game-over', { has2048: this.checkHas2048() });
            }
        }
    }

    /**
     * moveX 返回移动结果和用于动画的 moves 列表
     * 每个 move 表示一个 tile 从 (fromRow,fromCol) 平移到 (toRow,toCol)
     * merged=true 表示这个移动最终导致合并，resultValue 为合并后的值
     */

    private moveUp(): { moved: boolean, moves: Move[] } {
        let moved = false;
        const moves: Move[] = [];

        for (let j = 0; j < this.colCount; j++) {
            for (let i = 1; i < this.rowCount; i++) {
                if (this.values[i][j] !== 0) {
                    const originalRow = i;
                    const originalValue = this.values[i][j];

                    let k = i;
                    while (k > 0 && this.values[k - 1][j] === 0) {
                        this.values[k - 1][j] = this.values[k][j];
                        this.values[k][j] = 0;
                        k--; moved = true;
                    }

                    // 如果可以合并
                    if (k > 0 && this.values[k - 1][j] === this.values[k][j]) {
                        const mergedResult = this.values[k - 1][j] * 2;
                        // 记录被移动格子的来源和目标（合并）
                        moves.push({
                            fromRow: originalRow,
                            fromCol: j,
                            toRow: k - 1,
                            toCol: j,
                            value: originalValue,
                            merged: true,
                            resultValue: mergedResult
                        });

                        this.values[k - 1][j] = mergedResult;
                        this.values[k][j] = 0;
                        moved = true;
                        this.node.emit('score', this.values[k - 1][j]);
                    } else {
                        // 如果没有合并但发生了移动（或即使没移动，也需要记录当原位置 != 最终位置）
                        if (k !== originalRow) {
                            moves.push({
                                fromRow: originalRow,
                                fromCol: j,
                                toRow: k,
                                toCol: j,
                                value: originalValue,
                                merged: false
                            });
                        }
                    }
                }
            }
        }

        // 更新界面数据（但是我们不会立刻覆盖格子显示，动画期间会控制显示）
        // 注意：不要在这里调用 updateGridViews，否则会立即把值写回 UI（我们要等动画）
        return { moved, moves };
    }

    private moveDown(): { moved: boolean, moves: Move[] } {
        let moved = false;
        const moves: Move[] = [];
        for (let j = 0; j < this.colCount; j++) {
            for (let i = this.rowCount - 2; i >= 0; i--) {
                if (this.values[i][j] !== 0) {
                    const originalRow = i;
                    const originalValue = this.values[i][j];

                    let k = i;
                    while (k + 1 < this.rowCount && this.values[k + 1][j] === 0) {
                        this.values[k + 1][j] = this.values[k][j];
                        this.values[k][j] = 0;
                        k++; moved = true;
                    }
                    if (k + 1 < this.rowCount && this.values[k + 1][j] === this.values[k][j]) {
                        const mergedResult = this.values[k + 1][j] * 2;
                        moves.push({
                            fromRow: originalRow,
                            fromCol: j,
                            toRow: k + 1,
                            toCol: j,
                            value: originalValue,
                            merged: true,
                            resultValue: mergedResult
                        });

                        this.values[k + 1][j] = mergedResult;
                        this.values[k][j] = 0;
                        moved = true;
                        this.node.emit('score', this.values[k + 1][j]);
                    } else {
                        if (k !== originalRow) {
                            moves.push({
                                fromRow: originalRow,
                                fromCol: j,
                                toRow: k,
                                toCol: j,
                                value: originalValue,
                                merged: false
                            });
                        }
                    }
                }
            }
        }
        return { moved, moves };
    }

    private moveLeft(): { moved: boolean, moves: Move[] } {
        let moved = false;
        const moves: Move[] = [];
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 1; j < this.colCount; j++) {
                if (this.values[i][j] !== 0) {
                    const originalCol = j;
                    const originalValue = this.values[i][j];

                    let k = j;
                    while (k > 0 && this.values[i][k - 1] === 0) {
                        this.values[i][k - 1] = this.values[i][k];
                        this.values[i][k] = 0;
                        k--; moved = true;
                    }
                    if (k > 0 && this.values[i][k - 1] === this.values[i][k]) {
                        const mergedResult = this.values[i][k - 1] * 2;
                        moves.push({
                            fromRow: i,
                            fromCol: originalCol,
                            toRow: i,
                            toCol: k - 1,
                            value: originalValue,
                            merged: true,
                            resultValue: mergedResult
                        });

                        this.values[i][k - 1] = mergedResult;
                        this.values[i][k] = 0;
                        moved = true;
                        this.node.emit('score', this.values[i][k - 1]);
                    } else {
                        if (k !== originalCol) {
                            moves.push({
                                fromRow: i,
                                fromCol: originalCol,
                                toRow: i,
                                toCol: k,
                                value: originalValue,
                                merged: false
                            });
                        }
                    }
                }
            }
        }
        return { moved, moves };
    }

    private moveRight(): { moved: boolean, moves: Move[] } {
        let moved = false;
        const moves: Move[] = [];
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = this.colCount - 2; j >= 0; j--) {
                if (this.values[i][j] !== 0) {
                    const originalCol = j;
                    const originalValue = this.values[i][j];

                    let k = j;
                    while (k + 1 < this.colCount && this.values[i][k + 1] === 0) {
                        this.values[i][k + 1] = this.values[i][k];
                        this.values[i][k] = 0;
                        k++; moved = true;
                    }
                    if (k + 1 < this.colCount && this.values[i][k + 1] === this.values[i][k]) {
                        const mergedResult = this.values[i][k + 1] * 2;
                        moves.push({
                            fromRow: i,
                            fromCol: originalCol,
                            toRow: i,
                            toCol: k + 1,
                            value: originalValue,
                            merged: true,
                            resultValue: mergedResult
                        });

                        this.values[i][k + 1] = mergedResult;
                        this.values[i][k] = 0;
                        moved = true;
                        this.node.emit('score', this.values[i][k + 1]);
                    } else {
                        if (k !== originalCol) {
                            moves.push({
                                fromRow: i,
                                fromCol: originalCol,
                                toRow: i,
                                toCol: k,
                                value: originalValue,
                                merged: false
                            });
                        }
                    }
                }
            }
        }
        return { moved, moves };
    }

    // 生成新格子（animate 表示是否播放生成动画）
    private spawnRandomGrid(animate: boolean = false) {
        const emptyGrids: [number, number][] = [];
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                if (this.values[i][j] === 0) {
                    emptyGrids.push([i, j]);
                }
            }
        }
        if (emptyGrids.length === 0) return;
        const [row, col] = emptyGrids[Math.floor(Math.random() * emptyGrids.length)];
        const value = Math.random() < 0.6 ? 2 : 4;
        this.values[row][col] = value;
        if (this.gridData[row][col]) {
            this.gridData[row][col].setValue(value, animate);
        }
    }

    /**
     * 播放平移动画：对 moves 列表中的每一项创建一个临时视觉节点，
     * 将其从 sourcePos 平移到 targetPos，完成后（合并时）播放合并动画，最终刷新底层 grid 显示。
     */
    private playMovesAnimation(moves: Move[]): Promise<void> {
        return new Promise((resolve) => {
            if (!moves || moves.length === 0) {
                // 没有移动直接刷新显示
                this.updateGridViews(false);
                resolve();
                return;
            }

            const tweens: any[] = [];
            // 在动画期间，暂时把源格子的显示清空（避免重复显示）
            for (const m of moves) {
                const srcGrid = this.gridData[m.fromRow][m.fromCol];
                if (srcGrid) {
                    srcGrid.setValue(0, false); // 立刻清空源格显示（视觉交给临时节点）
                }
            }

            // 记录完成计数
            let completed = 0;
            const total = moves.length;

            for (const m of moves) {
                // 计算源和目标的本地坐标（相对于 this.node)
                const srcX = m.fromCol * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
                const srcY = -m.fromRow * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;
                const tgtX = m.toCol * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
                const tgtY = -m.toRow * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;

                // 创建一个临时节点（实例化预制体）
                const tempNode = instantiate(this.gridPrefab);
                tempNode.setPosition(srcX, srcY);
                this.node.addChild(tempNode);

                // 配置大小与文字（使用 Grid 组件来设置显示）
                const gridComp = tempNode.getComponent(Grid);
                if (gridComp) {
                    gridComp.setSize(this.gridWidth, this.gridHeight);
                    // 不要播放生成或合并动画在这里（移动动画独立）
                    gridComp.setValue(m.value, false);
                }

                // 播放平移动画
                const tw = tween(tempNode)
                    .to(0.5, { position: new Vec3(tgtX, tgtY, 0) }, { easing: 'sineOut' })
                    .call(() => {
                        // 到达目标后：
                        if (m.merged) {
                            // 播放目标格子的合并动画（目标格子是 gridData[toRow][toCol]）
                            const targetGrid = this.gridData[m.toRow][m.toCol];
                            if (targetGrid) {
                                // 先设置目标格子为旧值（动画期间），然后播放合并动画并在最后把新值写回
                                // 注意： values 已经被更新为合并后的值，所以这里直接 playMergeAnimation 然后在最后 refresh
                                targetGrid.playMergeAnimation();
                            }
                        } else {
                            // 非合并：目标格子动画可以是轻微弹动或无（保持简洁）
                        }
                        // 销毁临时节点（移动结束后）
                        tempNode.removeFromParent();
                        completed++;
                        if (completed >= total) {
                            // 所有移动动画完成 -> 刷新底层格子显示（不播放额外动画）
                            this.updateGridViews(false);
                            resolve();
                        }
                    })
                    .start();

                tweens.push(tw);
            }

            // 保险：如果 moves.length === 0，上面分支会提前返回
        });
    }

    // 更新底层 grid 的显示（若 animate 为 true 将调用格子的 setValue(..., true) 播放生成/合并缩放动画）
    private updateGridViews(animate: boolean = false) {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                if (this.gridData[i][j]) {
                    this.gridData[i][j].setValue(this.values[i][j], animate);
                    // 同时确保 grid 节点位置对齐（避免因为 tween 之类遗留问题）
                    const targetX = j * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
                    const targetY = -i * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;
                    this.gridData[i][j].node.setPosition(new Vec3(targetX, targetY, 0));
                }
            }
        }
    }

    private CheckGameOver(): boolean {
        if (this.checkHas2048()) return true;
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                if (this.values[i][j] == 0) return false;
            }
        }
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount - 1; j++) {
                if (this.values[i][j] == this.values[i][j + 1]) return false;
            }
        }
        for (let j = 0; j < this.colCount; j++) {
            for (let i = 0; i < this.rowCount - 1; i++) {
                if (this.values[i][j] === this.values[i + 1][j]) return false;
            }
        }
        return true;
    }

    private checkHas2048(): boolean {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                if (this.values[i][j] === 2048) return true;
            }
        }
        return false;
    }

    update(deltaTime: number) { }
}
