System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, GameManager, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GameReadyUI;

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
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2a32cnqmMBEr4yfEpxfKvzT", "GameReadyUI", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameReadyUI", GameReadyUI = (_dec = ccclass('GameReadyUI'), _dec2 = property(Button), _dec(_class = (_class2 = class GameReadyUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "startButton", _descriptor, this);
        }

        start() {
          // 当 startButton 被点击时，会自动调用当前脚本中的 onStartGame 方法，
          this.startButton.node.on(Button.EventType.CLICK, this.onStartGame, this); // 启用自身ui

          this.EnableGameReadyUI();
        }

        onStartGame() {
          // 通知游戏管理器开始游戏
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).inst().StartGame(); // 隐藏开始界面

          this.DisableGameReadyUI();
        }

        DisableGameReadyUI() {
          // 隐藏开始界面
          this.node.active = false;
        }

        EnableGameReadyUI() {
          // 显示开始界面
          this.node.active = true;
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6081c7cf2d90b5e4669a6724741066cdb974d465.js.map