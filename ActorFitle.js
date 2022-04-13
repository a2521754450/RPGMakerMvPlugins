//=============================================================================
// ActorFitle.js
//=============================================================================

/*:zh
 * @plugindesc 菜单栏职位角色显示控制。
 * @author yaga
 * @help 输入对应的角色职位id，菜单中将过滤此类职位的角色的显示。
 *
 * @param ------分组1------
 * @default  
 *
 * @param 要过滤的职业id
 * @parent ------分组1------
 * @desc 这是个数字类型的参数。
 * @type number
 * @min 1
 * @max 100
 * @default 1
 *
 *
 */
(function() {

    var parameters = PluginManager.parameters('ActorFitle');

    var param = parameters['要过滤的职业id'];

    var drawItemImageItemRectIndex = 0;
    var drawItemStatusItemRectIndex = 0;

    Window_MenuStatus.prototype.drawItemImage = function(index) {
        if ($gameParty.members()[index]._classId != param) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(drawItemImageItemRectIndex);
            this.changePaintOpacity(actor.isBattleMember());
            this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
            this.changePaintOpacity(true);
            drawItemImageItemRectIndex++;
        }
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        if ($gameParty.members()[index]._classId != param) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(drawItemStatusItemRectIndex);
            var x = rect.x + 162;
            var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
            var width = rect.width - x - this.textPadding();
            this.drawActorSimpleStatus(actor, x, y, width);
            drawItemStatusItemRectIndex++;
        }
    };

    Window_MenuStatus.prototype.drawItem = function(index) {
        this.drawItemBackground(index);
        this.drawItemImage(index);
        this.drawItemStatus(index);
        drawItemImageItemRectIndex = 0;
        drawItemStatusItemRectIndex = 0;
    };

})();
