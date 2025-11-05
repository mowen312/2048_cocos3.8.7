System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Score;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2b49edRUJ5CgaXzO5eoznho", "Score", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Score", Score = (_dec = ccclass('Score'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = class Score extends Component {
        constructor(...args) {
          super(...args);

          // 游戏中实时显示的“当前得分”标签
          _initializerDefineProperty(this, "presentScore", _descriptor, this);

          // 游戏中实时显示的“历史最高分”标签
          _initializerDefineProperty(this, "highestScoreEver", _descriptor2, this);

          // 游戏结束界面显示的“本局分数”标签
          _initializerDefineProperty(this, "currentScore", _descriptor3, this);

          // 游戏结束界面显示的“历史最佳分数”标签
          _initializerDefineProperty(this, "bestScore", _descriptor4, this);

          // 当前局内得分（内存变量）
          this._presentScore = 0;
          // 历史最高分（从本地存储读取）
          this._highestScoreEver = 0;
        }

        // 组件加载时触发：读取存档、初始化显示、注册得分事件
        onLoad() {
          // 从浏览器本地存储读取历史最高分，不存在则默认为 0
          this._highestScoreEver = parseInt(localStorage.getItem('bestScore') || '0'); // 同步所有 Label 的初始文字

          this.UpDataLabels(); // 监听同节点发出的自定义事件 'score'，收到后调用 onScore 方法

          this.node.on('score', this.onScore, this);
        } // 得分事件回调：value 为合并后新生成的数字（如 4、8、16...）


        onScore(value) {
          // 累加到当前局内得分
          this._presentScore += value; // 如果突破历史最高分，则更新并持久化

          if (this._presentScore > this._highestScoreEver) {
            this._highestScoreEver = this._presentScore; // 写入浏览器本地存储，key 为 'bestScore'

            localStorage.setItem('bestScore', this._highestScoreEver.toString());
          } // 刷新所有相关 Label 的显示


          this.UpDataLabels();
        } // 统一刷新四个 Label 的显示文字


        UpDataLabels() {
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
        } // 重新开始时重置当前局内得分并刷新显示


        resetScore() {
          this._presentScore = 0;
          this.UpDataLabels();
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "presentScore", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "highestScoreEver", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "currentScore", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bestScore", [_dec5], {
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
//# sourceMappingURL=1f5b4113a1785e7c6d2256880b78e5507d06a39e.js.map