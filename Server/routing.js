const fs = require('fs');
const router = require('router');
const finalhandler = require('finalhandler');

exports.createRouter = () => {
    let myRouter = router();
    myRouter.get("/", (req, res) => {
        sendHtml(res, "./Html/login.html");
    });
    myRouter.get("/Js/Lib/easel.js", (req, res) => {
        sendHtml(res, "./Js/Lib/easeljs-0.8.2.min.js");
    });
    myRouter.get("/Css/:path", (req, res) => {
        sendCss(res, "./Css/" + req.params.path);
    });
    myRouter.get("/Js/:path", (req, res) => {
        sendJs(res, "./Js/" + req.params.path);
    });
    myRouter.get("/:path", (req, res) => {
        sendHtml(res, "./Html/" + req.params.path);
    });

    return (req, res) => {
        myRouter(req, res, finalhandler(req, res));
    }
}

/*

//ルーティングをして適切にデータをクライアントに送信
exports.routing = function (req, res) {
    switch (req.url) {
        case "/":
            sendHtml(res, "./Html/login.html");
            break;
        case "/Css/login.css":
            sendCss(res, "./Css/login.css");
            break;
        case "/Css/board.css":
            sendCss(res, "./Css/board.css");
            break;
        case "/board.html":
            sendHtml(res, "./Html/board.html");
            break;
        case "/Js/Lib/easel.js":
            sendJs(res, "./Js/Lib/easeljs-0.8.2.min.js");
            break;
        case "/Js/board.js":
            sendJs(res, "./Js/board.js");
            break;
        default:
            res.end("not find url " + req.url);
            break;
    }
}
*/

function sendHtml(res, path) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(fs.readFileSync(path));
}

function sendCss(res, path) {
    res.writeHead(200, {
        'Content-Type': 'text/css'
    });
    res.end(fs.readFileSync(path));
}

function sendJs(res, path) {
    res.writeHead(200, {
        'Content-Type': 'text/plane'
    });
    res.end(fs.readFileSync(path));
}