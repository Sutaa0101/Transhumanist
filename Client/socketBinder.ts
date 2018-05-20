
//値をサーバと効率よくシェアできるクラス
export class SocketBinder<T>{
    private value: T;
    private socket: SocketIOClient.Socket;
    private valueName: string;

    get ValueName() {
        return this.valueName;
    }

    get Value() {
        return this.value;
    }

    set Value(value: T) {
        this.socket.emit("set" + this.valueName, JSON.stringify(value));
    }

    constructor(
        valueName: string,
        socket: SocketIOClient.Socket,
        updateValueCallBack: (value: T) => void = (_) => { }) {
        this.socket = socket;
        this.valueName = valueName;
        socket.on("get" + valueName, (str: string) => {
            this.value = JSON.parse(str);
            updateValueCallBack(this.value);
        });
    }
}