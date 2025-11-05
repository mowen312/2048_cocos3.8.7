System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Layout, Prefab, tween, UITransform, Vec3, Grid, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, SwipeDirection, Chessboard;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGrid(extras) {
    _reporterNs.report("Grid", "./Grid", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Layout = _cc.Layout;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Grid = _unresolved_2.Grid;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "740afMm6bZEN7vG5lkz/aX+", "Chessboard", undefined); // /*
      //     0.02版说明：有三种动画
      // */


      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Layout', 'Node', 'Prefab', 'tween', 'UITransform', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      SwipeDirection = /*#__PURE__*/function (SwipeDirection) {
        SwipeDirection[SwipeDirection["Up"] = 0] = "Up";
        SwipeDirection[SwipeDirection["Down"] = 1] = "Down";
        SwipeDirection[SwipeDirection["Left"] = 2] = "Left";
        SwipeDirection[SwipeDirection["Right"] = 3] = "Right";
        SwipeDirection[SwipeDirection["None"] = 4] = "None";
        return SwipeDirection;
      }(SwipeDirection || {}); // 定义移动项（用于播放平移动画）


      _export("Chessboard", Chessboard = (_dec = ccclass('Chessboard'), _dec2 = property(Prefab), _dec(_class = (_class2 = class Chessboard extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "gridPrefab", _descriptor, this);

          _initializerDefineProperty(this, "rowCount", _descriptor2, this);

          _initializerDefineProperty(this, "colCount", _descriptor3, this);

          _initializerDefineProperty(this, "gap", _descriptor4, this);

          this.gridData = [];
          this.values = [];
          this.gridWidth = 0;
          this.gridHeight = 0;
          this.isSwipeEnabled = false;
        }

        onLoad() {
          this.initChessboard();
          this.node.on('swipe', this.handleSwipe, this);
        }

        initChessboard() {
          this.gridData = new Array(this.rowCount);

          for (var i = 0; i < this.rowCount; i++) {
            this.gridData[i] = new Array(this.colCount).fill(null);
          }

          this.values = new Array(this.rowCount);

          for (var _i = 0; _i < this.rowCount; _i++) {
            this.values[_i] = new Array(this.colCount).fill(0);
          }

          var ChessboardSize = this.node.getComponent(UITransform);
          var ChessboardWidth = ChessboardSize.width;
          var ChessboardHeight = ChessboardSize.height;
          var GridWidth = (ChessboardWidth - (this.colCount - 1) * this.gap) / this.colCount;
          var GridHeight = (ChessboardHeight - (this.rowCount - 1) * this.gap) / this.rowCount;
          this.gridWidth = GridWidth;
          this.gridHeight = GridHeight;
          this.MakeGrids(); // 初始两个随机格子（显示生成动画）

          this.spawnRandomGrid(true);
          this.spawnRandomGrid(true);
          var layout = this.node.getComponent(Layout);
          if (layout) layout.updateLayout();
        }

        MakeGrids() {
          this.node.removeAllChildren();

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
              var x = j * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
              var y = -i * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;
              var gridNode = instantiate(this.gridPrefab);
              gridNode.setPosition(x, y);
              this.node.addChild(gridNode);
              var gridComp = gridNode.getComponent(_crd && Grid === void 0 ? (_reportPossibleCrUseOfGrid({
                error: Error()
              }), Grid) : Grid);

              if (gridComp) {
                gridComp.setSize(this.gridWidth, this.gridHeight);
                gridComp.setValue(0);
                this.gridData[i][j] = gridComp;
              }
            }
          }
        }

        setSwipeEnable(enabled) {
          this.isSwipeEnabled = enabled;
          console.log("\u6ED1\u52A8\u529F\u80FD" + (enabled ? '启用' : '禁用'));
        }

        handleSwipe(direction) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (!_this.isSwipeEnabled) return;
            var directionText = {
              [SwipeDirection.Up]: "上",
              [SwipeDirection.Down]: "下",
              [SwipeDirection.Left]: "左",
              [SwipeDirection.Right]: "右",
              [SwipeDirection.None]: "无"
            };
            if (direction === SwipeDirection.None) return;
            console.log("\u5F00\u59CB\u5904\u7406" + directionText[direction] + "\u5411\u79FB\u52A8");
            var result = {
              moved: false,
              moves: []
            };

            switch (direction) {
              case SwipeDirection.Up:
                result = _this.moveUp();
                break;

              case SwipeDirection.Down:
                result = _this.moveDown();
                break;

              case SwipeDirection.Left:
                result = _this.moveLeft();
                break;

              case SwipeDirection.Right:
                result = _this.moveRight();
                break;
            }

            if (result.moved) {
              // 播放平移动画（等待完成），然后生成新格子并检查游戏结束
              yield _this.playMovesAnimation(result.moves); // 生成随机格子（带生成动画）

              _this.spawnRandomGrid(true);

              if (_this.CheckGameOver()) {
                _this.node.emit('game-over', {
                  has2048: _this.checkHas2048()
                });
              }
            }
          })();
        }
        /**
         * moveX 返回移动结果和用于动画的 moves 列表
         * 每个 move 表示一个 tile 从 (fromRow,fromCol) 平移到 (toRow,toCol)
         * merged=true 表示这个移动最终导致合并，resultValue 为合并后的值
         */


        moveUp() {
          var moved = false;
          var moves = [];

          for (var j = 0; j < this.colCount; j++) {
            for (var i = 1; i < this.rowCount; i++) {
              if (this.values[i][j] !== 0) {
                var originalRow = i;
                var originalValue = this.values[i][j];
                var k = i;

                while (k > 0 && this.values[k - 1][j] === 0) {
                  this.values[k - 1][j] = this.values[k][j];
                  this.values[k][j] = 0;
                  k--;
                  moved = true;
                } // 如果可以合并


                if (k > 0 && this.values[k - 1][j] === this.values[k][j]) {
                  var mergedResult = this.values[k - 1][j] * 2; // 记录被移动格子的来源和目标（合并）

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
          } // 更新界面数据（但是我们不会立刻覆盖格子显示，动画期间会控制显示）
          // 注意：不要在这里调用 updateGridViews，否则会立即把值写回 UI（我们要等动画）


          return {
            moved,
            moves
          };
        }

        moveDown() {
          var moved = false;
          var moves = [];

          for (var j = 0; j < this.colCount; j++) {
            for (var i = this.rowCount - 2; i >= 0; i--) {
              if (this.values[i][j] !== 0) {
                var originalRow = i;
                var originalValue = this.values[i][j];
                var k = i;

                while (k + 1 < this.rowCount && this.values[k + 1][j] === 0) {
                  this.values[k + 1][j] = this.values[k][j];
                  this.values[k][j] = 0;
                  k++;
                  moved = true;
                }

                if (k + 1 < this.rowCount && this.values[k + 1][j] === this.values[k][j]) {
                  var mergedResult = this.values[k + 1][j] * 2;
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

          return {
            moved,
            moves
          };
        }

        moveLeft() {
          var moved = false;
          var moves = [];

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 1; j < this.colCount; j++) {
              if (this.values[i][j] !== 0) {
                var originalCol = j;
                var originalValue = this.values[i][j];
                var k = j;

                while (k > 0 && this.values[i][k - 1] === 0) {
                  this.values[i][k - 1] = this.values[i][k];
                  this.values[i][k] = 0;
                  k--;
                  moved = true;
                }

                if (k > 0 && this.values[i][k - 1] === this.values[i][k]) {
                  var mergedResult = this.values[i][k - 1] * 2;
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

          return {
            moved,
            moves
          };
        }

        moveRight() {
          var moved = false;
          var moves = [];

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = this.colCount - 2; j >= 0; j--) {
              if (this.values[i][j] !== 0) {
                var originalCol = j;
                var originalValue = this.values[i][j];
                var k = j;

                while (k + 1 < this.colCount && this.values[i][k + 1] === 0) {
                  this.values[i][k + 1] = this.values[i][k];
                  this.values[i][k] = 0;
                  k++;
                  moved = true;
                }

                if (k + 1 < this.colCount && this.values[i][k + 1] === this.values[i][k]) {
                  var mergedResult = this.values[i][k + 1] * 2;
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

          return {
            moved,
            moves
          };
        } // 生成新格子（animate 表示是否播放生成动画）


        spawnRandomGrid(animate) {
          if (animate === void 0) {
            animate = false;
          }

          var emptyGrids = [];

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
              if (this.values[i][j] === 0) {
                emptyGrids.push([i, j]);
              }
            }
          }

          if (emptyGrids.length === 0) return;
          var [row, col] = emptyGrids[Math.floor(Math.random() * emptyGrids.length)];
          var value = Math.random() < 0.6 ? 2 : 4;
          this.values[row][col] = value;

          if (this.gridData[row][col]) {
            this.gridData[row][col].setValue(value, animate);
          }
        }
        /**
         * 播放平移动画：对 moves 列表中的每一项创建一个临时视觉节点，
         * 将其从 sourcePos 平移到 targetPos，完成后（合并时）播放合并动画，最终刷新底层 grid 显示。
         */


        playMovesAnimation(moves) {
          var _this2 = this;

          return new Promise(resolve => {
            if (!moves || moves.length === 0) {
              // 没有移动直接刷新显示
              this.updateGridViews(false);
              resolve();
              return;
            }

            var tweens = []; // 在动画期间，暂时把源格子的显示清空（避免重复显示）

            for (var m of moves) {
              var srcGrid = this.gridData[m.fromRow][m.fromCol];

              if (srcGrid) {
                srcGrid.setValue(0, false); // 立刻清空源格显示（视觉交给临时节点）
              }
            } // 记录完成计数


            var completed = 0;
            var total = moves.length;

            var _loop = function _loop(_m) {
              // 计算源和目标的本地坐标（相对于 this.node)
              var srcX = _m.fromCol * (_this2.gridWidth + _this2.gap) - (_this2.colCount - 1) * (_this2.gridWidth + _this2.gap) / 2;
              var srcY = -_m.fromRow * (_this2.gridHeight + _this2.gap) + (_this2.rowCount - 1) * (_this2.gridHeight + _this2.gap) / 2;
              var tgtX = _m.toCol * (_this2.gridWidth + _this2.gap) - (_this2.colCount - 1) * (_this2.gridWidth + _this2.gap) / 2;
              var tgtY = -_m.toRow * (_this2.gridHeight + _this2.gap) + (_this2.rowCount - 1) * (_this2.gridHeight + _this2.gap) / 2; // 创建一个临时节点（实例化预制体）

              var tempNode = instantiate(_this2.gridPrefab);
              tempNode.setPosition(srcX, srcY);

              _this2.node.addChild(tempNode); // 配置大小与文字（使用 Grid 组件来设置显示）


              var gridComp = tempNode.getComponent(_crd && Grid === void 0 ? (_reportPossibleCrUseOfGrid({
                error: Error()
              }), Grid) : Grid);

              if (gridComp) {
                gridComp.setSize(_this2.gridWidth, _this2.gridHeight); // 不要播放生成或合并动画在这里（移动动画独立）

                gridComp.setValue(_m.value, false);
              } // 播放平移动画


              var tw = tween(tempNode).to(0.5, {
                position: new Vec3(tgtX, tgtY, 0)
              }, {
                easing: 'sineOut'
              }).call(() => {
                // 到达目标后：
                if (_m.merged) {
                  // 播放目标格子的合并动画（目标格子是 gridData[toRow][toCol]）
                  var targetGrid = _this2.gridData[_m.toRow][_m.toCol];

                  if (targetGrid) {
                    // 先设置目标格子为旧值（动画期间），然后播放合并动画并在最后把新值写回
                    // 注意： values 已经被更新为合并后的值，所以这里直接 playMergeAnimation 然后在最后 refresh
                    targetGrid.playMergeAnimation();
                  }
                } else {// 非合并：目标格子动画可以是轻微弹动或无（保持简洁）
                } // 销毁临时节点（移动结束后）


                tempNode.removeFromParent();
                completed++;

                if (completed >= total) {
                  // 所有移动动画完成 -> 刷新底层格子显示（不播放额外动画）
                  _this2.updateGridViews(false);

                  resolve();
                }
              }).start();
              tweens.push(tw);
            };

            for (var _m of moves) {
              _loop(_m);
            } // 保险：如果 moves.length === 0，上面分支会提前返回

          });
        } // 更新底层 grid 的显示（若 animate 为 true 将调用格子的 setValue(..., true) 播放生成/合并缩放动画）


        updateGridViews(animate) {
          if (animate === void 0) {
            animate = false;
          }

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
              if (this.gridData[i][j]) {
                this.gridData[i][j].setValue(this.values[i][j], animate); // 同时确保 grid 节点位置对齐（避免因为 tween 之类遗留问题）

                var targetX = j * (this.gridWidth + this.gap) - (this.colCount - 1) * (this.gridWidth + this.gap) / 2;
                var targetY = -i * (this.gridHeight + this.gap) + (this.rowCount - 1) * (this.gridHeight + this.gap) / 2;
                this.gridData[i][j].node.setPosition(new Vec3(targetX, targetY, 0));
              }
            }
          }
        }

        CheckGameOver() {
          if (this.checkHas2048()) return true;

          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
              if (this.values[i][j] == 0) return false;
            }
          }

          for (var _i2 = 0; _i2 < this.rowCount; _i2++) {
            for (var _j = 0; _j < this.colCount - 1; _j++) {
              if (this.values[_i2][_j] == this.values[_i2][_j + 1]) return false;
            }
          }

          for (var _j2 = 0; _j2 < this.colCount; _j2++) {
            for (var _i3 = 0; _i3 < this.rowCount - 1; _i3++) {
              if (this.values[_i3][_j2] === this.values[_i3 + 1][_j2]) return false;
            }
          }

          return true;
        }

        checkHas2048() {
          for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.colCount; j++) {
              if (this.values[i][j] === 2048) return true;
            }
          }

          return false;
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gridPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rowCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gap", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=28794ccc65ef4feff9611984fae3a198eda792f2.js.map