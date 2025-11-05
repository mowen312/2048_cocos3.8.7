System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, Label, GameManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, GameOverUI;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../GameManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e05c5HHEoBN4JuuxJZEMt14", "GameOverUI", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'Game', 'Label', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameOverUI", GameOverUI = (_dec = ccclass('GameOverUI'), _dec2 = property(Button), _dec3 = property(Label), _dec(_class = (_class2 = class GameOverUI extends Component {
        constructor() {
          super(...arguments);

          // 再来一局按钮
          _initializerDefineProperty(this, "AgainButton", _descriptor, this);

          // 游戏结束文本
          _initializerDefineProperty(this, "gameOverLabel", _descriptor2, this);
        }

        start() {
          this.AgainButton.node.on(Button.EventType.CLICK, this.onPlayAgainGame, this); // 启用自身ui,在这里不可以直接禁用gameReadyui,初始化会冲突

          this.EnableGameOverUI();
        }

        onPlayAgainGame() {
          // 点击按钮之后，调用
          // 游戏开始
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).inst().PlayAgain(); // 隐藏游戏结束界面

          this.DisableGameOverUI();
        }

        DisableGameOverUI() {
          // 隐藏游戏结束界面
          this.node.active = false;
        }

        EnableGameOverUI(isSuccess) {
          if (isSuccess === void 0) {
            isSuccess = false;
          }

          // 展示游戏结束界面
          this.node.active = true; // 根据是否成功显示不同文本

          if (this.gameOverLabel) {
            this.gameOverLabel.string = isSuccess ? "恭喜通关" : "Game Over";
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "AgainButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameOverLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9c6240a9aa0979838ef619f8ebae980858bb547a.js.map