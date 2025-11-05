System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, UITransform, _dec, _class, _crd, ccclass, property, CellPrefab;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5225188IqNDtrHMsXbfE38L", "CellPrefab", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CellPrefab", CellPrefab = (_dec = ccclass('CellPrefab'), _dec(_class = class CellPrefab extends Component {
        constructor() {
          super(...arguments);
          this._sprite = null;
          this._uiTransform = null;
        }

        onLoad() {
          this._sprite = this.node.getComponent(Sprite);
          this._uiTransform = this.node.getComponent(UITransform);
        } // 设置格子大小


        setSize(width, height) {
          if (this._uiTransform) {
            this._uiTransform.setContentSize(width, height);
          }
        }

        start() {}

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6f0166732984b92ec6d5d84c968d23c5d4f053ec.js.map