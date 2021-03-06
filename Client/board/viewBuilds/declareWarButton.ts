import { BindParams } from "../bindParams";
import { DeclareWarButton } from "../views/declareWarButton";
import { LayerTag } from "../../board";
import { DeclareWarDialog } from "../views/declareWarDialog";
import { DeclareWarSelectButton } from "../views/declareWarSelectButton";
import { SocketBinder } from "../../socketBinder";
import { GamePlayerCondition } from "../../../Share/gamePlayerCondition";

//宣戦布告ボタン生成
export function build(bindParams: BindParams) {
    const declareWarDialog = new DeclareWarDialog();
    bindParams.layerManager.add(LayerTag.PopUp, declareWarDialog);
    const declareWarSelectButton = new DeclareWarSelectButton(bindParams);

    declareWarDialog.visible = false;
    declareWarDialog.onClick(() => {
        declareWarDialog.visible = false;
        declareWarSelectButton.visible = false;
        console.log("反応してるよ！");
        bindParams.layerManager.update();
    });

    declareWarSelectButton.visible = false;
    declareWarSelectButton.OnselectedWarTarget((playerId: number, targetId: number) => {
        let warPair: number[] = [playerId, targetId];

        //ここで2つの引数で配列を作る。
        //このemitには引数で作ったjsonを添える。
        console.log(JSON.stringify(warPair));
        bindParams.socket.emit("declareWar", JSON.stringify(warPair));
    });
    const warFlag = new SocketBinder<boolean>("warFlag", bindParams.socket);

    const declareWarButton =
        new DeclareWarButton(
            () => {
                if (warFlag.Value) {
                    bindParams.socket.emit("surrender");
                }
                else {
                    declareWarDialog.visible = true;
                    declareWarSelectButton.visible = true;
                    bindParams.layerManager.update();
                }
            },
            bindParams.imgQueue
        );
    warFlag.onUpdate(x => {
        if (x)
            declareWarButton.Text = "降伏";
        else
            declareWarButton.Text = "宣戦布告";
        declareWarDialog.visible = false;
        declareWarSelectButton.visible = false;
        bindParams.layerManager.update();
    });

    const gamePlayerCondition =
        new SocketBinder<GamePlayerCondition>("gamePlayerCondition", bindParams.socket);

    gamePlayerCondition.onUpdate(cond => {
        switch (cond) {
            case GamePlayerCondition.Start:
                declareWarButton.visible = false;
                break;
            case GamePlayerCondition.MyTurn:
                declareWarButton.visible = true;
                break;
            case GamePlayerCondition.Wait:
                declareWarButton.visible = false;
                break;

        }
        bindParams.layerManager.update();
    })


    bindParams.layerManager.add(LayerTag.Ui, declareWarButton);
    bindParams.layerManager.add(LayerTag.Ui, declareWarSelectButton);

}