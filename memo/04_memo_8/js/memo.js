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
            allClearLocalStorage(); // 4.localStorage　からすべて削除
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
                let w_confirm = window.confirm("LocalStorageに\n 「" + key + " " + value +  "」 \n を保存 (save) しますか？"); //version-up1 add
                //確認ダイアログで「OK」を押されたとき、保存する　version-up1 add
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                } //version-up1 add
            }
        }, false
    );
};

        // 3.LocalStorageから選択されている行を削除  //versiob-up3 chg 
        function delLocalStorage() {
            const del = document.getElementById("del");
            del.addEventListener("click",
                function(e) {
                    e.preventDefault();
                    const chkbox1 = document.getElementsByName("chkbox1");  //version-up3 add
                    const table1 = document.getElementById("table1");       //version-up3 add
                    let w_cnt = "0";            //選択されているチェックボックスの数が返却される    //version-up3 w_sel="0" ==> w_cnt = 0
                    w_cnt = selectCheckBox("del");    //テーブルからデータ選択    //version-up3 chg w_sel ===> w_cnt 引数: なし ==> "del"

                    if(w_cnt >= 1){     //version-up3 chg w_sel === "1" ===> w_cnt >= 1
                            // const key = document.getElementById("textKey").value;        //version-up3 del
                            // const value = document.getElementById("textMemo").value;     //version-up3 del
                        let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？"); //version-up3 chg
                        //確認ダイアログで「OK」を押されたとき、削除する　version-up1 add
                        if (w_confirm === true) {
                            for(let i=0; i < chkbox1.length; i++) {        // version-up3 add
                                if(chkbox1[i].checked) {       // version-up3 add
                                    localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); //version-up3 chg
                                }   //version-up3 add
                            }
                            viewStorage();  //localStorageからのデータの取得とテーブルへ表示
                            let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete)　しました。";  //version-up3 chg
                            window.alert(w_msg);
                            document.getElementById("textKey").value = "";
                            document.getElementById("textMemo").value = "";
                        } //version-up1 add
                    }
                }, false
            );
        };

        // 4.LocalStorageからすべて削除
        function allClearLocalStorage() {
            const allClear = document.getElementById("allClear");
            allClear.addEventListener("click",
                function(e) {
                    e.preventDefault();
                    let w_confirm = confirm("LocalStorageのデータをすべて削除(all　clear）します。\n よろしいでしょうか？");
                    //確認ダイアログで「OK」を押された時、すべて削除する
                    if (w_confirm === true) {
                        localStorage.clear();
                        viewStorage();  //localStorageからのデータの取得とテーブルへ表示
                        let w_msg = "LocalStorageのデータをすべてを削除（all clear)　しました。";
                        window.alert(w_msg);
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                }
            ), false
        }

        // 5.データ選択
        function selectTable() {
            const select = document.getElementById("select");
            select.addEventListener("click",
                function(e) {
                    e.preventDefault;
                   //w_sel = selectRadioBtn();
                   selectCheckBox("select");   //テーブルからデータ選択　version-up2 chg: selectRadioBtn ==> selectCheckBox
                }, false
            );
        };

            //テーブルからデータ選択

        function selectCheckBox(mode) {     //version-up3 chg: 引数：なし==>mode
            //let w_sel = "0";    //選択されていれば、”1”にする //version-up3 del
            let w_cnt = 0;      //選択されているチェックボックスの数 //version-up2 add
            const chkbox1 = document.getElementsByName("chkbox1"); //version-up2 chg: radio1 ==> chkbox1
            const table1 = document.getElementById("table1");
            let w_textKey = "";     // work version-up2 add
            let w_textMemo = "";    // work version-up2 add
    
            for(let i=0; i < chkbox1.length; i++) {        // version-up2 chg: radio1 ==> chkbox1
                if(chkbox1[i].checked) {
                    if(w_cnt === 0)  {       // version-up2 chg: radio1 ==> chkbox1
                        w_textKey = table1.rows[i+1].cells[1].firstChild.data; // version-up2 chg document.getElementById("textKey").value ==> w_textKey
                        w_textMemo = table1.rows[i+1].cells[2].firstChild.data; // version-up2 chg document.getElementById("textMemo").value ==> w_textMemo
                        //return w_sel = "1"; version-up2 del
                    } //version-up2 add
                    w_cnt++; //選択されているチェックボックスの数をカウント　version-up2 add
                }   
            }
            document.getElementById("textKey").value = w_textKey;
            document.getElementById("textMemo").value = w_textMemo;

            if (mode === "select") { //version-up3 add
                if(w_cnt === 1){
                    return w_cnt;   // version-up3 chg w_sel = "1" ==> w_cnt
                }else{
                    window.alert("１つ選択（select）してください。");
                }
            }   //version-up3 add

            if (mode === "del") { //version-up3 add
                if(w_cnt >= 1){
                    return w_cnt;   // version-up3 chg w_sel = "1" ==> w_cnt
                }else{
                    window.alert("１つ以上選択（select）してください。");
                }
            }   //version-up3 add
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

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>" ;      //version-up2 chg: radio1 ==> chkbox1
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

        //　jQueryのplugin　tablesorterを使ってテーブルのソート
        //　sortList：引数1．．．最初からソートしておく例を指定、引数2．．．0...昇順、1．．．降順
        $("#table1").tablesorter({      //tablesort add
            sortList: [[1, 0]]          //tablesort add
        });                             //tablesort add

        $("#table1").trigger("update"); //tablesort add
};

