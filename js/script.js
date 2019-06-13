/* **********************************************************

	できるかなシリーズ
	〜視差効果（パララックス）の仕組みを理解しよう〜

*********************************************************** */

$(function(){
	// それぞれのコンテンツの位置（上からの位置）を取得して変数に格納
	var para01Pos = $('#parallax1').offset().top;
	var para02Pos = $('#parallax2').offset().top;
	var para03Pos = $('#parallax3').offset().top;
	var para04Pos = $('#parallax4').offset().top;

	// それぞれの要素の現在のmarginの値を取得して変数に格納
	// ※取得される値は単位「px」が付いているので、整数化するためにparseInt関数を使用
	var paraImgPos = parseInt($('#parallaxImage').css('margin-right'));
	var paraMtdPos = parseInt($('#parallaxMethod').css('margin-left'));

	var circle1Pos = parseInt($('#parallax2 .circle1').css('top'));
	var circle2Pos = parseInt($('#parallax2 .circle2').css('top'));
	var circle3Pos = parseInt($('#parallax2 .circle3').css('top'));
	var circle4Pos = parseInt($('#parallax2 .circle4').css('top'));
	var circle5Pos = parseInt($('#parallax2 .circle5').css('top'));

	// 要素を非表示設定及び透明度0に設定
	$('#parallax3 ul').hide();
	$('#parallax4 ul').css('opacity',0);
	$('#parallax4 ol').css('opacity',0);
	$('#pageTop').hide();

	// スクロールイベントが発生したら実行
	$(window).scroll(function(){

		// スクロール量を取得して変数に格納
		var scrollVal = $(window).scrollTop();

		// スクロール量をテキスト要素として出力
		$('#scrollVal').text('スクロール量 = '+scrollVal+'px');

		// パララックスの条件設定と実行
		// １つ目のコンテンツに対して設定
		if(scrollVal > para01Pos + 250){
			$('#parallax1').css('background-position-y', scrollVal - para01Pos);
		}else{
			$('#parallax1').css('background-position-y', 250);
		}

		// ２つ目のコンテンツに対して設定
		if(scrollVal > para02Pos){
			$('#parallax2').css('background-position-y', scrollVal - para02Pos);
		}else{
			$('#parallax2').css('background-position-y', 0);
		}

		if(scrollVal > para02Pos - 600){
			if(paraImgPos + (scrollVal - para02Pos + 600) < 0){
				$('#parallaxImage').css('margin-right', paraImgPos + (scrollVal - para02Pos + 600));
			}
		}

		// ３つ目のコンテンツに対して設定
		if(scrollVal > para03Pos - 300){
			$('#parallaxMethod').fadeTo(500,1);
		}

		if(scrollVal > para03Pos - 1000){
			if(paraMtdPos + (scrollVal - para03Pos + 1000) < 0){
				$('#parallaxMethod').css('margin-left', paraMtdPos + (scrollVal - para03Pos + 1000));
			}
		}

		if(scrollVal > para03Pos){
			$('#parallax3').css('background-position-y', scrollVal - para03Pos);
		}else{
			$('#parallax3').css('background-position-y', 0);
		}

		// ４つ目のコンテンツに対して設定
		if(scrollVal > para04Pos - 300){
			$('#parallax4 ol').fadeTo(300,1);
		}

		if(scrollVal > para04Pos - 100){
			$('#parallax4 ul').fadeTo(800,1);
		}

		if(scrollVal > para04Pos){
			$('#parallax4').css('background-position-y', scrollVal - para04Pos);
		}else{
			$('#parallax4').css('background-position-y', 0);
		}

		// ２つ目のコンテンツ内にある円オブジェクトに視差効果をつける
		$('#parallax2 .circle1').css('top', circle1Pos + scrollVal / 10);
		$('#parallax2 .circle2').css('top', circle2Pos + -scrollVal / 3);
		$('#parallax2 .circle3').css('top', circle3Pos + -scrollVal / 6);
		$('#parallax2 .circle4').css('top', circle4Pos + -scrollVal / 4);
		$('#parallax2 .circle5').css('top', circle5Pos + scrollVal / 3);


		// ナビゲーションをスクロール位置によってカレント設定をする
		if(scrollVal < para02Pos){
			classRemoveFunc('current');
			$('#nav li').eq(0).addClass('current');
		}else if(scrollVal >= para02Pos && scrollVal < para03Pos){
			classRemoveFunc('current');
			$('#nav li').eq(1).addClass('current');
		}else if(scrollVal >= para03Pos && scrollVal < para04Pos){
			classRemoveFunc('current');
			$('#nav li').eq(2).addClass('current');
		}else if(scrollVal >= para04Pos){
			classRemoveFunc('current');
			$('#nav li').eq(3).addClass('current');
		}

		// ページトップボタンをスクロール位置によって表示・非表示させる
		if(scrollVal > 300){
			$('#pageTop').fadeIn(300);
		}else{
			$('#pageTop').fadeOut(300);
		}
	});

	// カレント設定のリセット関数
	function classRemoveFunc(name){
		$('#nav li').removeClass(name);
	}

	// ナビゲーションをクリックしたらコンテンツ位置までページ内リンクする
	$('#nav li a').click(function(){
		var targetID = $(this).attr('href');
		var targetPos = $(targetID).offset().top;
		$('html, body').animate({scrollTop:targetPos},{easing:'easeInOutQuint', duration:1500});
		return false;
	});

	// ページのトップにスクロールして戻る
	$('#pageTop a').click(function(){
		$('html, body').animate({scrollTop:0},{easing:'easeInOutQuint', duration:1000});
		return false;
	});
});



/* **********************************************************

--- 補足 ---

jQueryのプラグインを使用することで、イージング（動きを加速、減速）も設定可能です。
プラグインを利用した記述方法にもチャレンジしてみましょう。

--- jQuery Easing Plugin ---
サイトURL
http://gsgd.co.uk/sandbox/jquery/easing/

*********************************************************** */
