import { ActionCardHover } from "../views/actionCardHover";
import { ActionCardName } from "../../../Share/Yaml/actionCardYamlData";
import { BindParams } from "../bindParams";
import { SocketBinderList } from "../../socketBinderList";
import { SelectBuildActionData } from "../../../Share/selectBuildActionData";
import { PlayerBuildAreaBase } from "../views/bases/playerBuildAreaBase";
import * as playerBuildAreas from "../views/playerBuildActionAreas";
import { LayerTag } from "../../board";
//プレイヤーの設置アクション欄生成
export function build(actionCardHover: ActionCardHover, bindParams: BindParams) {
    const playerBuildActionAreaList: PlayerBuildAreaBase[] = [
        new playerBuildAreas.Player1BuildArea(bindParams.imgQueue),
        new playerBuildAreas.Player2BuildArea(bindParams.imgQueue),
        new playerBuildAreas.Player3BuildArea(bindParams.imgQueue),
        new playerBuildAreas.Player4BuildArea(bindParams.imgQueue)
    ];
    for (let i = 0; i < 4; i++) {
        const buildActionKindList = new SocketBinderList<ActionCardName>("BuildActionKindList" + (i + bindParams.playerId) % 4, bindParams.socket);
        buildActionKindList.onUpdate((list) => {
            list.forEach((cardName, iconId) =>
                playerBuildActionAreaList[i].setResource(
                    iconId, cardName,
                    cardName != null ? bindParams.yamls.buildActionCardHash[cardName].index : -1,
                    bindParams.imgQueue
                ));
            bindParams.layerManager.update();
        });
        buildActionKindList.onSetAt((iconId: number, cardName: ActionCardName) => {
            playerBuildActionAreaList[i].setResource(
                iconId, cardName, bindParams.yamls.buildActionCardHash[cardName].index, bindParams.imgQueue);
            bindParams.layerManager.update();
        });
        bindParams.layerManager.add(LayerTag.Ui, playerBuildActionAreaList[i]);
        playerBuildActionAreaList[i].onMouseOveredIcon(cardName => {
            actionCardHover.visible = true;
            actionCardHover.setYamlData(bindParams.yamls.buildActionCardHash[cardName], bindParams.imgQueue);
            bindParams.layerManager.update();
        });
        playerBuildActionAreaList[i].onMouseOutedIcon(() => {
            actionCardHover.visible = false;
            actionCardHover.setYamlData(null, bindParams.imgQueue);
            bindParams.layerManager.update();
        });
    }
    playerBuildActionAreaList[0].onClickedIcon((cardIcon) => {
        const selectBuildActionData: SelectBuildActionData = { iconId: cardIcon.IconId };
        bindParams.socket.emit("SelectBuildAction", JSON.stringify(selectBuildActionData));
    });
}