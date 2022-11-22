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
                Swal.fire({
                      title : "Memo app" //タイトル設定
                    , html  : "Key, Memoはいずれも必須です。" //メッセージ内容をここに設定
                    , type  : "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                    , allowOutsideClick  :  false   //枠外クリックは許可しない
                });
                //window.alert("Key, Memo　はいずれも必須です。");
                return;
            } else {
                let w_msg = "LocalStorageに\n 「" + key + " " + value + "」\nを保存　（save）しますか？";
                Swal.fire({
                      title : "Memo app" //タイトル設定
                    , html  :  w_msg //メッセージ内容をここに設定
                    , type  : "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                    , showCancelButton  :  true   //枠外クリックは許可しない
                }).then(function(result) {
                     //確認ダイアログで「OK」を押されたとき、保存する
                     if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title : "Memo app" //タイトル設定
                          , html  :  w_msg //メッセージ内容をここに設定
                          , type  : "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                          , allowOutsideClick  :  false   //枠外クリックは許可しない
                      });
                      document.getElementById("textKey").value = "";
                      document.getElementById("textMemo").value = "";
                     }
                });
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
                            
                        let w_msg ="LocalStorageから選択されている" + w_cnt + "件を削除 (delete) しますか？"; //version-up3 chg
                        Swal.fire({
                              title : "Memo app" //タイトル設定
                            , html  :  w_msg //メッセージ内容をここに設定
                            , type  : "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                            , showCancelButton  :  true   //枠外クリックは許可しない
                        }).then(function(result) {
                            //確認ダイアログで「OK」を押されたとき、保存する
                                if (result.value === true) {
                                    for(let i=0; i < chkbox1.length; i++) {        // version-up3 add
                                        if(chkbox1[i].checked) {       // version-up3 add
                                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); //version-up3 chg
                                        }   //version-up3 add
                                    }
                                   viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                                   let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete)　しました。";  //version-up3 chg
                                   Swal.fire({
                                       title : "Memo app" //タイトル設定
                                     , html  :  w_msg //メッセージ内容をここに設定
                                     , type  : "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                                     , allowOutsideClick  :  false   //枠外クリックは許可しない
                                 });
                                 document.getElementById("textKey").value = "";
                                 document.getElementById("textMemo").value = "";
                                }
                            });
                        }
                    }, false
                );

                // version-up5 add-str
                // DELETE 1 ROW

                const table1 = document.getElementById("table1");
                table1.addEventListener("click", (e) => { 
                        if(e.target.classList.contains("trash") === true){
                            let index = e.target.parentNode.parentNode.sectionRowIndex;
                            const key = table1.rows[index + 1].cells[1].firstChild.data;
                            const value = table1.rows[index + 1].cells[2].firstChild.data;
                            let w_delete ="LocalStorageから \n " + key + " " + value + "\n を削除 (delete) しますか？"; //version-up3 chg
                                    Swal.fire({
                                          title : "Memo app" //タイトル設定
                                        , html  :  w_delete //メッセージ内容をここに設定
                                        , type  : "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                                        , showCancelButton  :  true   //枠外クリックは許可しない
                                    }).then(result => {
                                        //確認ダイアログで「OK」を押されたとき、保存する
                                        if (result.value === true) {
                                            localStorage.removeItem(key);
                                            viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                                            let w_msg = "LocalStorageから" + key + " " + value + "を削除 (delete)　しました!"; 
                                            Swal.fire({
                                                  title : "Memo app" //タイトル設定
                                                , html  :  w_msg //メッセージ内容をここに設定
                                                , type  : "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                                                , allowOutsideClick  :  false   //枠外クリックは許可しない
                                            });
                                            document.getElementById("textKey").value = "";
                                            document.getElementById("textMemo").value = "";
                                        }
                                    });
                                }
                        }, false
                    );
                    

                // version-up5 add-end
            };

        // 4.LocalStorageからすべて削除
        function allClearLocalStorage() {
            const allClear = document.getElementById("allClear");
            allClear.addEventListener("click",
                function(e) {
                    e.preventDefault();
                    let w_msg ="LocalStorageのデータをすべて削除(all　clear）します。\n よろしいでしょうか？"; //version-up3 chg
                        Swal.fire({
                              title : "Memo app" //タイトル設定
                            , html  :  w_msg //メッセージ内容をここに設定
                            , type  : "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                            , showCancelButton  :  true   //枠外クリックは許可しない
                        }).then(function(result) {
                            //確認ダイアログで「OK」を押されたとき、すべて削除する
                            
                                if (result.value === true) {
                                   localStorage.clear();
                                   viewStorage();              // localStorage からのデータの取得とテーブルへ表示
                                   let w_msg = "LocalStorageのデータをすべてを削除（all clear)　しました。";  
                                   Swal.fire({
                                       title : "Memo app" //タイトル設定
                                     , html  :  w_msg //メッセージ内容をここに設定
                                     , type  : "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                                     , allowOutsideClick  :  false   //枠外クリックは許可しない
                                 });
                                 document.getElementById("textKey").value = "";
                                 document.getElementById("textMemo").value = "";
                                }
                         });
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
                    Swal.fire({
                        title : "Memo app" //タイトル設定
                      , html  : "１つ選択（select）してください。" //メッセージ内容をここに設定
                      , type  : "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                      , allowOutsideClick  :  false   //枠外クリックは許可しない
                  });

                }
            }   //version-up3 add

            if (mode === "del") { //version-up3 add
                if(w_cnt >= 1){
                    return w_cnt;   // version-up3 chg w_sel = "1" ==> w_cnt
                }else{
                    Swal.fire({
                        title : "Memo app" //タイトル設定
                      , html  : "１つ以上選択（select）してください。" //メッセージ内容をここに設定
                      , type  : "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning, error, success, infor, question
                      , allowOutsideClick  :  false   //枠外クリックは許可しない
                  });
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
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>" ;      //version-up2 chg: radio1 ==> chkbox1
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

        //　jQueryのplugin　tablesorterを使ってテーブルのソート
        //　sortList：引数1．．．最初からソートしておく例を指定、引数2．．．0...昇順、1．．．降順
        $("#table1").tablesorter({      //tablesort add
            sortList: [[1, 0]]          //tablesort add
        });                             //tablesort add

        $("#table1").trigger("update"); //tablesort add
};


