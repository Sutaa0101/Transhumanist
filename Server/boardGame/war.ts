import { SocketBinder } from "../socketBinder";

export class War {

    private declareWar: SocketBinder.EmitReceiveBinder<(number | null)[]>;
    private warPairList: SocketBinder.BinderList<{ playerId1: number, playerId2: number }>;
    private warFlags: SocketBinder.Binder<boolean>[] = [];
    constructor(boardSocketManager: SocketBinder.Namespace) {
        this.declareWar = new SocketBinder.EmitReceiveBinder<number[]>("declareWar");
        this.declareWar.OnReceive(x => {
            if (
                x.length == 2 &&
                x[0] != null &&
                x[1] != null &&
                x[0] != x[1]
            ) {
                console.log(`declareWar player_id[${x[0]},${x[1]}]`);
                const same = this.warPairList.Value.find(y =>
                    y.playerId1 == x[0] || y.playerId2 == x[0] || y.playerId1 == x[1] || y.playerId2 == x[1]
                );
                if (same == undefined) {
                    this.warFlags[x[0]!].Value = true;
                    this.warFlags[x[1]!].Value = true;
                    this.warPairList.push({ playerId1: x[0]!, playerId2: x[1]! });
                }
            }
        });
        this.warPairList = new SocketBinder.BinderList<{ playerId1: number, playerId2: number }>("warPairList");
        this.warPairList.Value = [];
        boardSocketManager.addSocketBinder(this.declareWar, this.warPairList);
        for (let i = 0; i < 4; i++) {
            const warFlag = new SocketBinder.Binder<boolean>("warFlag", true, [`player${i}`]);
            warFlag.Value = false;
            this.warFlags.push(warFlag);
            const surrender = new SocketBinder.EmitReceiveBinder("surrender", true, [`player${i}`]);
            const playerId = i;
            surrender.OnReceive(() => {
                if (this.warFlags[playerId].Value) {
                    const warPair = this.warPairList.Value.find(x => x.playerId1 == playerId || x.playerId2 == playerId)!;
                    this.warFlags[warPair.playerId1].Value = false;
                    this.warFlags[warPair.playerId2].Value = false;
                    this.warPairList.Value = this.warPairList.Value.filter(x => x.playerId1 != playerId && x.playerId2 != playerId);
                }
            });
            boardSocketManager.addSocketBinder(warFlag, surrender);
        }
    }
}