import { global } from "../../boardGlobalData";
import { createMyShadow } from "../../utility";
import { DecisionButton } from "./decisionButton";
import { PopupWindowBase } from "./bases/popupWindowBase";

export class SelectEventWindow extends PopupWindowBase {
    private layerUpdate: () => void;
    private submitCallback: () => void;
    private selectEvent: SelectEvent[] = [new SelectEvent("陸0"), new SelectEvent("海1"), new SelectEvent("空2")];

    constructor(layerUpdate: () => void) {
        super(700, 400);

        this.layerUpdate = layerUpdate;

        const description = new createjs.Text("1 2 3の順でイベントは発生します。\n順番を入れ替える場合、入れ替える対象をクリックして下さい。");
        description.textAlign = "center";
        description.color = "white";
        description.font = "22px Bold ＭＳゴシック";
        description.shadow = createMyShadow();
        description.x = global.canvasWidth / 2;
        description.y = global.canvasHeight / 2 - 160;
        this.addChild(description);
        
        const orderText: createjs.Text[] = [
            new createjs.Text("1"),
            new createjs.Text("2"),
            new createjs.Text("3")];

        orderText.forEach((e, i) => {
            e.y = global.canvasHeight / 2 - 70;
            e.x = global.canvasWidth / 2;
            e.x = e.x + (140 * (i - 1));

            e.textAlign = "center";
            e.color = "white";
            e.font = "30px ＭＳ ゴシック";
            e.shadow = createMyShadow();
            this.addChild(e);
        });
        this.selectEvent.forEach((e, i) => {
            e.y = global.canvasHeight / 2 + 40;
            e.x = global.canvasWidth / 2;

            e.x = e.x + (140 * (i - 1));
            e.addEventListener("click", () => this.eventButtonClick(i));

            e.Enable = true;
            e.BeginIndex = i;
            e.NowIndex = i;
            this.addChild(e);
        });

        const submit = new DecisionButton("決定");
        submit.x = global.canvasWidth / 2;
        submit.y = global.canvasHeight / 2 + 100;
        submit.addEventListener("click", () => this.submitCallback());
        this.addChild(submit);
    }

    eventButtonClick(index: number) {
        if (this.selectEvent[index].Enable) {
            this.selectEvent[index].Selected = !this.selectEvent[index].Selected;
            this.selectEvent[index].alphaUpdate();
        }

        if(this.selectEvent.filter((x)=>{return x.Selected}).length == 2) {
            //swap!
            
        }

        this.layerUpdate();
    };
}

class SelectEvent extends createjs.Container {
    private cardName: createjs.Text;
    private selected = false;
    private enable = false;
    private beginIndex: number;
    private nowIndex: number;
    readonly size = 100;

    constructor(name: string) {
        super();

        const base = new createjs.Shape();
        base.graphics.beginFill("white").drawRect(- this.size/2,- this.size/2, this.size, this.size);
        this.addChild(base);

        this.cardName = new createjs.Text(name);
        this.cardName.textAlign = "center";
        this.cardName.color = "black";
        this.cardName.font = "48px ＭＳ ゴシック";
        this.addChild(this.cardName);
    }

    get CardName() { return this.cardName.text;}
    set CardName(name: string) {
        this.cardName.text = name;
    }
    get Enable() { return this.enable; }
    set Enable(val: boolean) {
        this.enable = val;
    } 
    get Selected() {return this.selected;}
    set Selected(val: boolean) {
        this.selected = val;
    }
    get BeginIndex() { return this.beginIndex;}
    set BeginIndex(val: number) {
        this.beginIndex = val;
    }
    get NowIndex() { return this.nowIndex; }
    set NowIndex(val: number) {
        this.nowIndex = val;
    }
    alphaUpdate() {
        this.alpha = this.selected ? 0.5 : 1.0;
    }
}