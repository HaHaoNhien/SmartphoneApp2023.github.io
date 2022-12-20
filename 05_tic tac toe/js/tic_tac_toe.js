"use strict";

let soundEndflag ="0"; //sound control

//flagが"pen-flag"の時penguinsのターン,"bear-flag"の時bearのターン
let flag = "pen-flag";

//ターン数カウンター
let counter = 9;

// class="square" を取得
const squares = document.getElementsByClassName("square");

// Array に変化
// https://developer.nozilla.org/ja/docs/web/Javasrcipt/Reference/Global_Objects/Array/from
const squaresArray = Array.from(squares); 

//squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//New Gameボタン取得
const newgamebtn_display = document.getElementById("newgame-btn");

//Win or Lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray, ["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray, ["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray, ["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray, ["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray, ["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray, ["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

//メッセージ
const msgtxt1 = '<p class="image"><img src="img/hello-pinguin.gif"  width=150px height=150px ></p><p class="text">Penguins Attack!!!</p>';
const msgtxt2 = '<p class="image"><img src="img/bear.gif" width=150px height=150px ></p><p class="text">WhiteBear Attack!!!</p>';
const msgtxt3 = '<p class="image"><img src="img/hello-pinguin.gif" width=150px height=150px ></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!!</p>';
const msgtxt4 = '<p class="image"><img src="img/bear.gif" width=150px height=150px ></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!!</p>';
const msgtxt5 = '<p class="image"><img src="img/hello-pinguin.gif" width=150px height=150px ><img src="img/bear.gif" width=150px height=150px ></p><p class="text animate__bounceIn">Draw!!!</p>';

/********************************************/
window.addEventListener("DOMContentLoaded",
    function() {
        setMessage("pen-turn");
    }, false
);

//********************************************
//Win or Lose Judgment Line 配列化
//********************************************
//Javasrciptでfilterを使う方法:https:/techacademy.jp/magazine/15575
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//********************************************
//square をクリックしたときにイベント発火
//********************************************
//クリックしたsquareに、penguinsかbearを表示、画像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し

a_1.addEventListener("click",
    function() {
        isSelect(a_1);
    },false
);
//上記のコーディングと下記のコーディングは同じ意味
a_2.addEventListener("click", () => {
    isSelect(a_2);
});
a_3.addEventListener("click", () => {
    isSelect(a_3);
});
b_1.addEventListener("click", () => {
    isSelect(b_1);
});
b_2.addEventListener("click", () => {
    isSelect(b_2);
});
b_3.addEventListener("click", () => {
    isSelect(b_3);
});
c_1.addEventListener("click", () => {
    isSelect(c_1);
});
c_2.addEventListener("click", () => {
    isSelect(c_2);
});
c_3.addEventListener("click", () => {
    isSelect(c_3);
});
// *******************************************
// クリックしたsquareにはpenguinsかbearを表示
// 表示したところはクリックできないようにする
// win  or lose 判定を呼び出す
// *******************************************
function isSelect(selectSquare) {
    if(flag === "pen-flag") {
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");

        //penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win"); //display win message
            gameOver("penguins");
            return;
        }

        setMessage("bear-turn");
        flag = "bear-flag";
    }else {
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");

        //white-bear win 
        if (isWinner("bear")) {
            setMessage("bear-win"); //display win message
            gameOver("bear");
            return;
        }

        setMessage("pen-turn");
        flag = "pen-flag";
    }

    //　ターン数カウンターをー1する
    counter--;
    
    // ターン数＝０になったらDRAW
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
    }
}
// **********************************************
// 勝敗判定
// **********************************************
// classListの使い方まとめ：http://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
// **********************************************
function isWinner(symbol) {
    // some: 1つでも条件を満たしていればTrueを返す
    const result = lineArray.some(function(line) {
        //every: 全て条件を満たしていればTrueを返す
        const subResult = line.every(function (square){
            if (symbol === "penguins"){
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear"){
                return square.classList.contains("js-bear-checked");
            }
        });
        //trueを返すlineをwinningLineに代入
        if (subResult) { winningLine = line}
        return subResult;
    });
    return result;
}
// **********************************************
// メッセージ切り替え関数
// **********************************************
function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}

// **********************************************
// ゲーム終了時の処理
// **********************************************
function gameOver(status) {
    //all square unclickable
    squaresArray.forEach(function (square) {
        square.classList.add("js-unclickable");
    });

    //winEffect
    if(status === "penguins") {
        //winner-line penguins high-light
        if(winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }
        //penguins win!!! ==> snow color is pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245",
            maxSpeed   : 3,
            minSpeed   : 1,
            maxSize    : 20,
            minSize    : 10,
            round      : true
        });
    } else if (status === "bear") {
        //winner-line penguins high-light
        if(winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }
        //penguins win!!! ==> snow color is pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245",
            maxSpeed   : 3,
            minSpeed   : 1,
            maxSize    : 20,
            minSize    : 10,
            round      : true
        });
    }
}

// **********************************************
// NewGameボタン　クリック時　ゲーム初期化
// **********************************************

//sound control
let w_sound
let music
function soundControl(status, w_sound) {
  if (status === 'start') {
    music = new Audio(w_sound)
    music.currentTime = 0
    music.play()
  } else if (status === 'end') {
    music.pause()
    music.currentTime = 0
  }
}
