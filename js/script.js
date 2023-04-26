// 音楽を流す
const music = new Audio("music/Morning.mp3");
music.play();
music.volume = 0.02;
music.loop = true;

// canvas = myCanvasのテキスト
var canvas = document.getElementById("myCanvas"); 
// グラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す
var ctx = canvas.getContext("2d");

// 背景
var bgImage = new function(){
    this.x = 0
    this.y = 0;

    this.width = canvas.width;
    this.height = canvas.height;

    this.loadImage = function(){
    // 背景の生成
    this.image = new Image();
    // 画像ファイルのパスを指定
    this.image.src = "img/school.jpg";
    this.image.onload = loader;

    // rende関数として背景の描画をまとめる
    this.render = function(){
        // 位置指定して描画
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
  }
}

// 人物オブジェクト
var personImage = new function(){
    this.y = 0;

    this.loadImage = function(){
    // 人物オブジェクトの生成
    this.image = new Image();
    // 画像ファイルのパスを指定
    this.image.src = "img/y_s.png";
    this.image.onload = loader;
    }

    // rende関数として吹き出しの描画をまとめる
    this.render = function(){
    // 画像のアスペクト比
    this.aspect = this.image.width / this.image.height;

    this.width = canvas.height * this.aspect;
    this.height = canvas.height;

    this.x = canvas.width / 2 - this.width / 2;
    // 位置指定して描画
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

// メッセージボックス
var messageBox = new function(){
    this.x = 0;
    // 画像を読み込む関数
    this.loadImage = function(){
    // 吹き出しの生成
    this.image = new Image();
    // 吹き出しのパスを指定
    this.image.src = "img/message_box.png";
    // onloadされたときに実行される関数として小文字loaderを設定
    this.image.onload = loader;
    }
    // rende関数として吹き出しの描画をまとめる
    this.render = function(){
        // 画像のアスペクト比
        this.aspect = this.image.width / this.image.height;
    
        this.width = canvas.width;
        this.height = canvas.height / this.aspect;
    
        this.marginBottom = 20;
        this.y = canvas.height - this.height - this.marginBottom;
    
        // 位置指定して描画
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
 }

// セリフ
var myText = new function(){
    this.render = function(){
    // テキストの横幅
    var messageBoxInnerWidth = messageBox.width - 80;
    var messageBoxPaddingTop = 60;
    var messageBoxPaddingLeft = 20;
    // 空文字
    var s = "";
    // 一つの文を一文字ずつ配列の要素に分ける
    var sentenceArray = text.split("");
    // どれくらい改行させるのか高さを決める
    var kaigyouHeight = 0;
    for(var i = 0; i < sentenceArray.length; i++){
        // 一文字ずつ変数sに文字を追加していく
        s += sentenceArray[i];
        // メッセージボックスより長くなったら改行する（改行：変数sの文字を一旦リセットすることで実現）
        var textWidth = ctx.measureText(s).width;
        console.log(textWidth);
        // テキストを描画するY座標を改行ごとに行の分だけ下にズラす
        if(messageBoxInnerWidth < textWidth){
        // フォントの内容、表示位置の指定
        ctx.fillText(s,messageBoxPaddingLeft,messageBox.y + kaigyouHeight + messageBoxPaddingTop);
        // 開業するごとに改行の高さを加算
        kaigyouHeight += 40;
        // sをリセット
        s = "";
        }
    }

    // 文字の描画色を定義
    ctx.fillStyle = "#fff";
    // 文字の描画(文字の大きさ、フォントの指定)
    ctx.font = "24px serif";
    // テキストの始点を左寄せにする
    ctx.textAlign="left";

    ctx.fillText(s,messageBoxPaddingLeft,messageBox.y + kaigyouHeight + messageBoxPaddingTop);
    }
}

var sentences = [
    "G’s入学おめでとう！",
    "G’s ACADEMYはセカイを変えるGEEKのための起業家・エンジニアスクールを核とするコミュニティだよ。君もこれからGEEKだ！",
    "ところで、創りたいプロダクトがあるそうだね。その「プロダクト」と「Why me」を教えてくれないかい？",
    "なるほど、素晴らしいね。また考えがアップデートされたら教えてほしいな。これからよろしくね！"
    ];

// ３枚の画像が全て読み終わってからテキストを描画する(枚数カウントの期待値、全て終わったら実行される関数)
var Loader =  function(expectedCnt,callback){
    // カウント変数の定義
    var cnt = 0;
    // 関数を返す
    return function(){
        // 関数が実行されるごとに増加
        cnt++;
        // カウントが期待される画像枚数と同じになったらCallBack関数を実行
        if(cnt == expectedCnt)  {
            callback();
        }
    }
}

// カウント３で実行される小文字loader関数
var loader = Loader(3,function(){
    update();
});

bgImage.loadImage();
personImage.loadImage();
messageBox.loadImage();

var sentenceIndex = 0;

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if(sentenceIndex > sentences.length - 1) {
      bgImage.render();
      alert("迷ったらここに立ち返ろう！君の軌跡が記録されていくよ！");
      location.reload();
    } else {
      bgImage.render();
      personImage.render();
      messageBox.render();
  
      myText.render(text=sentences[sentenceIndex]);
      sentenceIndex++;
    }
  }
  // クリックでテキストを変えていく
  canvas.addEventListener("click", function(){
    update();
  });

