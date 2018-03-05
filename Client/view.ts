import * as global from "./boardGlobalData"
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

//ボタンのベースクラス
export class ButtonBase extends createjs.Container {
    private onClickCallback: () => void;
    protected awakeClickEvent() {
        this.onClickCallback();
    }
    constructor(onClickCallback: () => void) {
        super();
        this.onClickCallback = onClickCallback;
    }
}

//宣戦布告ボタン
export class DeclareWarButton extends ButtonBase {
    private declareWarButton: createjs.Bitmap;
    private declareWarText: createjs.Text;
    constructor(onClickCallback: () => void, queue: createjs.LoadQueue) {
        super(onClickCallback);
        //ボタン画像
        this.declareWarButton = new createjs.Bitmap(queue.getResult("button"));
        this.declareWarButton.regX = 0;
        this.declareWarButton.regY = this.declareWarButton.image.height;
        this.declareWarButton.x = 20;
        this.declareWarButton.y = global.canvasHeight - 20;
        this.declareWarButton.addEventListener("click", () => onClickCallback());
        this.addChild(this.declareWarButton);

        //ボタンテキスト
        this.declareWarText = new createjs.Text("宣戦布告/降伏", "20px Arial");
        this.declareWarText.regX = this.declareWarText.getMeasuredWidth() / 2;
        this.declareWarText.regY = this.declareWarText.getMeasuredHeight() / 2;
        this.declareWarText.x = this.declareWarButton.x + this.declareWarButton.image.width / 2;
        this.declareWarText.y = this.declareWarButton.y - this.declareWarButton.image.height / 2;
        this.addChild(this.declareWarText);
    }
}

//プレイヤーウインドウ表示のベースクラス
export class PlayerWindowBase extends createjs.Container {
    protected playerNameText: createjs.Text;
    protected speedText: createjs.Text;
    protected resourceText: createjs.Text;
    protected activityRangeText: createjs.Text;
    protected uncertaintyText: createjs.Text;
    protected positiveText: createjs.Text;
    protected negativeText: createjs.Text;
    protected playerFrame: createjs.Bitmap;
    constructor() {
        super();
        this.playerNameText = new createjs.Text();
        this.playerFrame = new createjs.Bitmap("");
        this.speedText = new createjs.Text();
        this.resourceText = new createjs.Text();
        this.activityRangeText = new createjs.Text();
        this.uncertaintyText = new createjs.Text();
        this.positiveText = new createjs.Text();
        this.negativeText = new createjs.Text();
        this.addChild(this.playerFrame);
        this.addChild(this.playerNameText);
        this.addChild(this.speedText);
        this.addChild(this.resourceText);
        this.addChild(this.activityRangeText);
        this.addChild(this.uncertaintyText);
        this.addChild(this.positiveText);
        this.addChild(this.negativeText);
    }
    setPlayerName(name: string) {
        this.playerNameText.text = name;
    }
    setSpeed(speed: number) {
        this.speedText.text = "処理速度:" + speed;
    }
    setResource(resource: number) {
        this.resourceText.text = "リソース:" + resource;
    }
    setActivityRange(range: number) {
        this.activityRangeText.text = "活動範囲:" + range;
    }
    setUncertainty(uncertainty: number) {
        this.uncertaintyText.text = "不確定性:" + uncertainty;
    }
    setPositive(positive: number) {
        this.positiveText.text = "Positive:" + positive;
    }
    setNegative(negative: number) {
        this.negativeText.text = "Negative:" + negative;
    }
    //set PlayerInfo(playerInfo: PlayerInfo) {
}

export class Player1Window extends PlayerWindowBase {
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

export class Player2Window extends PlayerWindowBase {
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

export class Player3Window extends PlayerWindowBase {
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

export class Player4Window extends PlayerWindowBase {
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