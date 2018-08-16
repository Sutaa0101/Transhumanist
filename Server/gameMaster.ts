import { GamePlayer } from "./gamePlayer";
import { PlayerData } from "./playerData";
import { SocketBinder } from "./socketBinder";
import { GamePlayerState } from "../Share/gamePlayerState";
import { SocketBinderList } from "./socketBinderList";
import { DiceNumber } from "../Share/diceNumber";
import { ResourceName } from "../Share/Yaml/resourceYamlData";
import { ActionCardName } from "../Share/Yaml/actionCardYamlData";

export class GameMaster {
    private gamePlayerList: GamePlayer[] = new Array();

    getGamePlayer(uuid: string) {
        return this.gamePlayerList.find(x => x.Uuid == uuid);
    }

    addMember(
        playerData: PlayerData, playerId: number,
        state: SocketBinder<GamePlayerState>, resourceList: SocketBinderList<ResourceName>
        , buildActionList: SocketBinderList<ActionCardName>, diceList: SocketBinder<DiceNumber[]>
        , actionCardList: SocketBinderList<string | null>
    ) {
        this.gamePlayerList.push(new GamePlayer(playerData, playerId, state, resourceList, buildActionList, diceList, actionCardList));
    }

    sendToSocket(socket: SocketIO.Socket) {
        this.gamePlayerList.forEach(x => x.sendToSocket(socket));
    }
}