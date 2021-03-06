import { global } from "../../boardGlobalData";
import { createMyShadow } from "../../utility";
import { DecisionButton } from "./decisionButton";

//戦争相手選択しろのダイアログ
export class UnavailableDialog extends createjs.Container {
    private label: createjs.Text;
    private callBack: () => void;
    onClick(callBack: () => void) {
        this.callBack = callBack;
    }
    constructor() {
        super();
        const width = 500;
        const height = 250;
        const background = new createjs.Shape(new createjs.Graphics().beginFill("gray")
            .drawRect(global.canvasWidth / 2 - width / 2, global.canvasHeight / 2 - height / 2, width, height));
        
        this.label = new createjs.Text("");
        this.label.font = "28px Bold ＭＳ ゴシック";
        this.label.color = "white";
        this.label.shadow = createMyShadow();
        this.label.textAlign = "center";
        this.label.x = global.canvasWidth / 2;
        this.label.y = global.canvasHeight / 2 - 100;

        const button = new DecisionButton("閉じる");
        button.x = global.canvasWidth / 2;
        button.y = global.canvasHeight / 2 + height / 2 - 30 - button.height / 2;
        button.addEventListener("click", () => this.callBack());
        this.addChild(background, this.label, button);
    }

    setText(text: string) {
        this.label.text = text;
    }
}