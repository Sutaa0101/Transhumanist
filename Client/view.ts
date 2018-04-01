import * as global from "./boardGlobalData"
import * as viewBase from "./viewBase"
import { successResultCreateRoomData } from "../Share/resultCreateRoomData";

//player情報
export class PlayerInfo {
    playerName: string;
    speed: number;
    resource: number;
    activityRange: number;
    uncertainty: number;
    positive: number;
    negative: number;
}

//宣戦布告ボタン
export class DeclareWarButton extends viewBase.ButtonBase {
    constructor(onClickCallback: () => void, queue: createjs.LoadQueue) {
        //ボタン画像
        const declareWarButton = new createjs.Bitmap(queue.getResult("button"));
        declareWarButton.regX = 0;
        declareWarButton.regY = declareWarButton.image.height;
        declareWarButton.x = 20;
        declareWarButton.y = global.canvasHeight - 20;
        super(declareWarButton, onClickCallback);

        //ボタンテキスト
        const declareWarText = new createjs.Text("宣戦布告/降伏", "20px Arial");
        declareWarText.regX = declareWarText.getMeasuredWidth() / 2;
        declareWarText.regY = declareWarText.getMeasuredHeight() / 2;
        declareWarText.x = declareWarButton.x + declareWarButton.image.width / 2;
        declareWarText.y = declareWarButton.y - declareWarButton.image.height / 2;
        this.addChild(declareWarText);
    }
}

//ターン終了ボタン
export class TurnFinishButton extends viewBase.ButtonBase {

    constructor(onClickCallback: () => void, queue: createjs.LoadQueue) {

        //ターン終了ボタン画像
        const turnFinishButton = new createjs.Bitmap(queue.getResult("button"));
        turnFinishButton.regX = turnFinishButton.image.width;
        turnFinishButton.regY = turnFinishButton.image.height;
        turnFinishButton.x = global.canvasWidth - 20;
        turnFinishButton.y = global.canvasHeight - 20;
        super(turnFinishButton, onClickCallback);
        //ターン終了ボタンテキスト
        const turnFinishText = new createjs.Text("ターン終了", "20px Arial");
        turnFinishText.regX = turnFinishText.getMeasuredWidth() / 2;
        turnFinishText.regY = turnFinishText.getMeasuredHeight() / 2;
        turnFinishText.x = turnFinishButton.x - turnFinishButton.image.width / 2;
        turnFinishText.y = turnFinishButton.y - turnFinishButton.image.height / 2;
        this.addChild(turnFinishText);
    }
}

//設定ボタン
export class SettingButton extends viewBase.ButtonBase {
    private height: number;
    constructor(onClickCallback: () => void, queue: createjs.LoadQueue) {
        const settingButton = new createjs.Bitmap(queue.getResult("setting"));
        //Graphicsオブジェクトを作成する
        var g = new createjs.Graphics()
            .beginStroke("#000")
            .beginFill("#000")
            .rect(0, 0, settingButton.image.width, settingButton.image.height);
        const rect = new createjs.Shape(g);
        settingButton.hitArea = rect;
        super(settingButton, onClickCallback);
        this.height = settingButton.image.height;
    }

    public getHeight() { return this.height; }

}

//オプション罰ボタン
export class OptionCrossButton extends viewBase.ButtonBase {
    constructor(onClickCallback: () => void, queue: createjs.LoadQueue) {
        const crossButton = new createjs.Bitmap(queue.getResult("optionCross"));
        var g = new createjs.Graphics()
            .beginStroke("#000")
            .beginFill("#000")
            .rect(0, 0, crossButton.image.width, crossButton.image.height);
        const rect = new createjs.Shape(g);
        crossButton.hitArea = rect;
        super(crossButton, onClickCallback);
    }
}

export class Player1Window extends viewBase.PlayerWindowBase {
    constructor(queue: createjs.LoadQueue) {
        super();

        this.playerFrame.image = <any>queue.getResult("evenPlayerFrame");
        this.playerFrame.regX = this.playerFrame.image.width / 2;
        this.playerFrame.regY = 0;

        this.x = global.canvasWidth / 2;
        this.y = global.canvasHeight - this.playerFrame.image.height;

        this.playerNameText.color = "blue";
        this.playerNameText.font = "20px Arial";
        this.playerNameText.regX = this.playerNameText.getMeasuredWidth() / 2;
        this.playerNameText.y = 5;

        this.speedText.x = -180;
        this.speedText.y = 35;
        this.speedText.color = "white";
        this.speedText.font = "15px Arial";

        this.resourceText.x = -80;
        this.resourceText.y = 35;
        this.resourceText.color = "white";
        this.resourceText.font = "15px Arial";

        this.activityRangeText.x = 10;
        this.activityRangeText.y = 35;
        this.activityRangeText.color = "white";
        this.activityRangeText.font = "15px Arial";

        this.uncertaintyText.x = 90;
        this.uncertaintyText.y = 35;
        this.uncertaintyText.color = "white";
        this.uncertaintyText.font = "15px Arial";

        this.positiveText.x = -80;
        this.positiveText.y = 60;
        this.positiveText.color = "green";
        this.positiveText.font = "15px Arial";

        this.negativeText.x = 0;
        this.negativeText.y = 60;
        this.negativeText.color = "red";
        this.negativeText.font = "15px Arial";
    }
}

export class Player2Window extends viewBase.PlayerWindowBase {
    constructor(queue: createjs.LoadQueue) {
        super();

        this.playerFrame.image = <any>queue.getResult("oddPlayerFrame");
        this.playerFrame.regY = this.playerFrame.image.height / 2;

        this.y = global.canvasHeight / 2;

        this.playerNameText.color = "green";
        this.playerNameText.font = "10px Arial";
        this.playerNameText.y = -60;

        this.speedText.y = -30;
        this.speedText.color = "white";
        this.speedText.font = "12px Arial";

        this.resourceText.y = -15;
        this.resourceText.color = "white";
        this.resourceText.font = "12px Arial";

        this.activityRangeText.y = 0;
        this.activityRangeText.color = "white";
        this.activityRangeText.font = "12px Arial";

        this.uncertaintyText.y = 15;
        this.uncertaintyText.color = "white";
        this.uncertaintyText.font = "12px Arial";

        this.positiveText.y = 45;
        this.positiveText.color = "green";
        this.positiveText.font = "12px Arial";

        this.negativeText.y = 60;
        this.negativeText.color = "red";
        this.negativeText.font = "12px Arial";
    }
}

export class Player3Window extends viewBase.PlayerWindowBase {
    constructor(queue: createjs.LoadQueue) {
        super();

        this.playerFrame.image = <any>queue.getResult("evenPlayerFrame");
        this.playerFrame.regX = this.playerFrame.image.width / 2;
        this.playerFrame.regY = this.playerFrame.image.height;
        this.playerFrame.rotation = 180;

        this.x = global.canvasWidth / 2;

        this.playerNameText.color = "orange";
        this.playerNameText.font = "20px Arial";
        this.playerNameText.regX = this.playerNameText.getMeasuredWidth() / 2;
        this.playerNameText.y = 5;

        this.speedText.x = -180;
        this.speedText.y = 35;
        this.speedText.color = "white";
        this.speedText.font = "15px Arial";

        this.resourceText.x = -80;
        this.resourceText.y = 35;
        this.resourceText.color = "white";
        this.resourceText.font = "15px Arial";

        this.activityRangeText.x = 10;
        this.activityRangeText.y = 35;
        this.activityRangeText.color = "white";
        this.activityRangeText.font = "15px Arial";

        this.uncertaintyText.x = 90;
        this.uncertaintyText.y = 35;
        this.uncertaintyText.color = "white";
        this.uncertaintyText.font = "15px Arial";

        this.positiveText.x = -80;
        this.positiveText.y = 60;
        this.positiveText.color = "green";
        this.positiveText.font = "15px Arial";

        this.negativeText.x = 0;
        this.negativeText.y = 60;
        this.negativeText.color = "red";
        this.negativeText.font = "15px Arial";
    }
}

export class Player4Window extends viewBase.PlayerWindowBase {
    constructor(queue: createjs.LoadQueue) {
        super();

        this.playerFrame.image = <any>queue.getResult("oddPlayerFrame");
        this.playerFrame.regY = this.playerFrame.image.height / 2;
        this.playerFrame.regX = this.playerFrame.image.width;
        this.playerFrame.rotation = 180;
        this.y = global.canvasHeight / 2;
        this.x = global.canvasWidth - this.playerFrame.image.width;

        this.playerNameText.color = "yellow";
        this.playerNameText.font = "10px Arial";
        this.playerNameText.y = -60;

        this.speedText.y = -30;
        this.speedText.color = "white";
        this.speedText.font = "12px Arial";

        this.resourceText.y = -15;
        this.resourceText.color = "white";
        this.resourceText.font = "12px Arial";

        this.activityRangeText.y = 0;
        this.activityRangeText.color = "white";
        this.activityRangeText.font = "12px Arial";

        this.uncertaintyText.y = 15;
        this.uncertaintyText.color = "white";
        this.uncertaintyText.font = "12px Arial";

        this.positiveText.y = 45;
        this.positiveText.color = "green";
        this.positiveText.font = "12px Arial";

        this.negativeText.y = 60;
        this.negativeText.color = "red";
        this.negativeText.font = "12px Arial";
    }
}

//オプションウインドウ
export class OptionWindow extends createjs.Container {
    private optionFrame: createjs.Bitmap;
    private optionCrossButton: OptionCrossButton;
    constructor(queue: createjs.LoadQueue) {
        super();
        this.optionFrame = new createjs.Bitmap(queue.getResult("optionWindow"));
        this.optionFrame.regX = this.optionFrame.image.width / 2;
        this.optionFrame.regY = this.optionFrame.image.height / 2;
        this.addChild(this.optionFrame);
        this.optionCrossButton = new OptionCrossButton(() => { this.visible = false; this.stage.update(); }, queue);
        this.optionCrossButton.x = 200;
        this.optionCrossButton.y = - 270;
        this.addChild(this.optionCrossButton);
    }
}