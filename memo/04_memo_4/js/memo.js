"use strict";

window.addEventListener("DOMContentLoaded",
    function() {
        
        // 1. LocalStorageが使えるか確認
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal　Storage　機能が実装されていません。");
            return;
        } else {
            viewStorage();          // 1.LocalStorage からのデータの取得とテーブルへ表示
            saveLocalStorage();     // 2.LocalStorage への保存
            delLocalStorage();      // 3.LocalStorage から１件削除

            selectTable();          // 5.データ選択
        }
    },false
);
        // 2. Local Storage への保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
                
            // 値の入力チェック
            if (key=="" || value=="") {
                window.alert("Key, Memo　はいずれも必須です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

        // 3.LocalStorageから１件削除
        function delLocalStorage() {
            const del = document.getElementById("del");
            del.addEventListener("click",
                function(e) {
                    e.preventDefault();
                    let w_sel = "0";
                    w_sel = selectRadioBtn();

                    if(w_sel === "1"){
                        const key = document.getElementById("textKey").value;
                        const value = document.getElementById("textKey").value;
                        localStorage.removeItem(key);
                        viewStorage();  //localStorageからのデータの取得とテーブルへ表示
                        let w_msg = "LocalStorageから" + key + "　" + value + "を削除（delete)　しました。";
                        window.alert(w_msg);
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                }, false
            );
        };


        // 5.データ選択
        function selectTable() {
            const select = document.getElementById("select");
            select.addEventListener("click",
                function(e) {
                    e.preventDefault;
                    selectRadioBtn();       //テーブルからデータ選択
                }, false
            );
        };
            //テーブルからデータ選択
        function selectRadioBtn() {
            let w_sel = "0";    //選択されていれば、”1”にする
            const radio1 = document.getElementsByName("radio1");
            const table1 = document.getElementById("table1");
    
            for(let i=0; i < radio1.length; i++) {
                if(radio1[i].checked) {
                    document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
                    document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
                    return w_sel = "1";
                }
            }
            window.alert("１つ選択（select）してください。");
        };

//localStorageからのデータの取得とテーブルへ表示
function viewStorage() {

    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);

    //localStorage すべての情報の取得
    for (let i=0; i<localStorage.length; i++) {
        let w_key = localStorage.key(i);

        //localStorage のキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>" ;
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
};