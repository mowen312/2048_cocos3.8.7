System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Grid, Chessboard, GameReadyUI, GameOverUI, Score, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _crd, ccclass, property, GameState, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGrid(extras) {
    _reporterNs.report("Grid", "./Grid", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessboard(extras) {
    _reporterNs.report("Chessboard", "./Chessboard", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameReadyUI(extras) {
    _reporterNs.report("GameReadyUI", "./UI/GameReadyUI", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameOverUI(extras) {
    _reporterNs.report("GameOverUI", "./UI/GameOverUI", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScore(extras) {
    _reporterNs.report("Score", "./Score", _context.meta, extras);
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
    }, function (_unresolved_2) {
      Grid = _unresolved_2.Grid;
    }, function (_unresolved_3) {
      Chessboard = _unresolved_3.Chessboard;
    }, function (_unresolved_4) {
      GameReadyUI = _unresolved_4.GameReadyUI;
    }, function (_unresolved_5) {
      GameOverUI = _unresolved_5.GameOverUI;
    }, function (_unresolved_6) {
      Score = _unresolved_6.Score;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e7e30v/lEVFdrYRWOwp6gXS", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']); // import { Chessboard } from './Chessboard';


      ({
        ccclass,
        property
      } = _decorator);

      GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["Ready"] = 0] = "Ready";
        GameState[GameState["Gaming"] = 1] = "Gaming";
        GameState[GameState["GameOver"] = 2] = "GameOver";
        return GameState;
      }(GameState || {});

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(_crd && Grid === void 0 ? (_reportPossibleCrUseOfGrid({
        error: Error()
      }), Grid) : Grid), _dec3 = property({
        type: _crd && Chessboard === void 0 ? (_reportPossibleCrUseOfChessboard({
          error: Error()
        }), Chessboard) : Chessboard
      }), _dec4 = property(_crd && GameReadyUI === void 0 ? (_reportPossibleCrUseOfGameReadyUI({
        error: Error()
      }), GameReadyUI) : GameReadyUI), _dec5 = property(_crd && GameOverUI === void 0 ? (_reportPossibleCrUseOfGameOverUI({
        error: Error()
      }), GameOverUI) : GameOverUI), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          // 导入组件
          _initializerDefineProperty(this, "grid", _descriptor, this);

          // @property(Chessboard)
          // chessboard: Chessboard = null;
          _initializerDefineProperty(this, "chessboard", _descriptor2, this);

          _initializerDefineProperty(this, "gameReadyUI", _descriptor3, this);

          _initializerDefineProperty(this, "gameOverUI", _descriptor4, this);

          this.curGS = GameState.Ready;
        }

        // 静态方法，提供全局访问实例的入口
        static inst() {
          return this._insc;
        }

        onLoad() {
          GameManager._insc = this; // 监听棋盘得分事件

          if (this.chessboard) {
            this.chessboard.node.on('score', value => {
              var score = this.node.getComponent(_crd && Score === void 0 ? (_reportPossibleCrUseOfScore({
                error: Error()
              }), Score) : Score);

              if (score) {
                score.onScore(value); // 直接调用得分逻辑
              }
            });
          }
        }

        start() {
          this.transitionToReadyState();

          if (this.chessboard && this.chessboard.node) {
            this.chessboard.node.on('game-over', evt => {
              this.GameOver(evt == null ? void 0 : evt.has2048);
            }, this);
          }
        }

        transitionToReadyState() {
          this.curGS = GameState.Ready; // 启用ui

          if (this.gameReadyUI) {
            this.gameReadyUI.EnableGameReadyUI();
          }

          if (this.gameOverUI) {
            this.gameOverUI.DisableGameOverUI();
          } // 初始禁用滑动


          if (this.chessboard) {
            this.chessboard.setSwipeEnable(false);
          }
        }

        StartGame() {
          this.curGS = GameState.Gaming; // 启用滑动

          if (this.chessboard) {
            this.chessboard.setSwipeEnable(true);
          }
        }

        GameOver(isSuccess) {
          if (isSuccess === void 0) {
            isSuccess = false;
          }

          this.curGS = GameState.GameOver; // 启用ui，传递是否成功的状态

          if (this.gameOverUI) {
            this.gameOverUI.EnableGameOverUI(isSuccess);
          }

          if (this.gameReadyUI) {
            this.gameReadyUI.DisableGameReadyUI();
          } // 禁用滑动


          if (this.chessboard) {
            this.chessboard.setSwipeEnable(false);
          }
        }

        PlayAgain() {
          if (_crd && Chessboard === void 0 ? (_reportPossibleCrUseOfChessboard({
            error: Error()
          }), Chessboard) : Chessboard) {
            this.chessboard.initChessboard();
            this.chessboard.setSwipeEnable(true);
          }

          var score = this.node.getComponent(_crd && Score === void 0 ? (_reportPossibleCrUseOfScore({
            error: Error()
          }), Score) : Score);
          if (score) score.resetScore();
        }

        update(deltaTime) {}

      }, _class3._insc = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "grid", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "chessboard", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameReadyUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gameOverUI", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class)); // function type(arg0: string): (target: GameManager, propertyKey: "chessboard") => void {
      //     throw new Error('Function not implemented.');
      // }


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2e06f5c3b20ae623fa32240c642bd351e3c743df.js.map