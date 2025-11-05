System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioClip, Component, Node, Vec2, AudioMgr, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SwipeDirection, Swipe;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAudioMgr(extras) {
    _reporterNs.report("AudioMgr", "./AudioMgr", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioClip = _cc.AudioClip;
      Component = _cc.Component;
      Node = _cc.Node;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      AudioMgr = _unresolved_2.AudioMgr;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "367daq0STBKAqARoJYL1Fqo", "Swipe", undefined);

      __checkObsolete__(['_decorator', 'AudioClip', 'Component', 'EventTouch', 'Node', 'Vec2']);

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
      }(SwipeDirection || {});

      _export("Swipe", Swipe = (_dec = ccclass('Swipe'), _dec2 = property(Node), _dec3 = property(AudioClip), _dec(_class = (_class2 = class Swipe extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "minSwipeDistance", _descriptor, this);

          // 滑动阈值
          _initializerDefineProperty(this, "chessboardNode", _descriptor2, this);

          // 声明音频资源属性
          _initializerDefineProperty(this, "clickAudio", _descriptor3, this);

          this.startPos = new Vec2(0, 0);
          this.isSwiping = false;
        }

        // 标记是否正在滑动
        onLoad() {
          // 注册触摸事件
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
          console.log("Swipe组件初始化，已注册触摸事件"); // 初始化日志
        }

        onTouchStart(event) {
          this.startPos = event.getLocation();
          this.isSwiping = false; // 触摸开始日志，打印起始位置
          // console.log(`触摸开始 - 位置: (${this.startPos.x.toFixed(0)}, ${this.startPos.y.toFixed(0)})`);

          console.log("触摸开始");
        }

        onTouchMove(event) {
          this.isSwiping = true;
          var currentPos = event.getLocation();
          var deltaX = currentPos.x - this.startPos.x;
          var deltaY = currentPos.y - this.startPos.y; // 触摸移动日志，打印当前位置和偏移量
          //console.log(`触摸移动 - 当前位置: (${currentPos.x.toFixed(0)}, ${currentPos.y.toFixed(0)}) | 偏移: (${deltaX.toFixed(0)}, ${deltaY.toFixed(0)})`);
        }

        onTouchEnd(event) {
          var endPos = event.getLocation();
          var deltaX = endPos.x - this.startPos.x;
          var deltaY = endPos.y - this.startPos.y;
          var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 触摸结束基础信息日志

          console.log("\u89E6\u6478\u7ED3\u675F - \u7ED3\u675F\u4F4D\u7F6E: (" + endPos.x.toFixed(0) + ", " + endPos.y.toFixed(0) + ") | \u603B\u504F\u79FB: (" + deltaX.toFixed(0) + ", " + deltaY.toFixed(0) + ") | \u6ED1\u52A8\u8DDD\u79BB: " + distance.toFixed(0));
          var direction = SwipeDirection.None; // 滑动距离达标且有移动行为，才判定为有效滑动

          if (this.isSwiping && distance >= this.minSwipeDistance) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              direction = deltaX > 0 ? SwipeDirection.Right : SwipeDirection.Left;
            } else {
              direction = deltaY > 0 ? SwipeDirection.Up : SwipeDirection.Down;
            } // 有效滑动方向日志


            console.log("\u6709\u6548\u6ED1\u52A8 - \u65B9\u5411: " + this.getDirectionText(direction));
          } else {
            // 无效滑动日志
            console.log("\u65E0\u6548\u6ED1\u52A8 - \u8DDD\u79BB\u4E0D\u8DB3\u6216\u672A\u79FB\u52A8 (\u9608\u503C: " + this.minSwipeDistance + ")");
          }

          this.emitSwipeEvent(direction);
          this.isSwiping = false;
        }

        onTouchCancel(event) {
          this.isSwiping = false;
          console.log("触摸取消 - 触摸事件被中断"); // 触摸取消日志
        }

        emitSwipeEvent(direction) {
          // 播放滑动音效（方向有效才播）
          if (direction !== SwipeDirection.None && this.clickAudio) {
            (_crd && AudioMgr === void 0 ? (_reportPossibleCrUseOfAudioMgr({
              error: Error()
            }), AudioMgr) : AudioMgr).inst.playOneShot(this.clickAudio);
          }

          if (this.chessboardNode) {
            this.chessboardNode.emit('swipe', direction);
            console.log("\u5DF2\u5411\u68CB\u76D8\u53D1\u9001\u6ED1\u52A8\u4E8B\u4EF6 - \u65B9\u5411: " + this.getDirectionText(direction)); // 事件发送日志
          } else {
            console.warn("未设置chessboardNode，无法发送滑动事件"); // 警告日志
          }
        } // 辅助方法：将方向枚举转为文本


        getDirectionText(direction) {
          switch (direction) {
            case SwipeDirection.Up:
              return "上";

            case SwipeDirection.Down:
              return "下";

            case SwipeDirection.Left:
              return "左";

            case SwipeDirection.Right:
              return "右";

            default:
              return "无";
          }
        }

        onDestroy() {
          // 移除事件监听，避免内存泄漏
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
          console.log("Swipe组件销毁，已移除触摸事件监听"); // 销毁日志
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "minSwipeDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "chessboardNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clickAudio", [_dec3], {
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
//# sourceMappingURL=dd2540ea2c6ccd07b8ecaa77bb6c1a3ed9e967d2.js.map