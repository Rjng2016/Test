window.onload = function(){
	animation();
	innerNav();
	publicAnimate();
	footAnimate();
}

//焦点图
function animation(){
	var list = document.getElementById('list');
	var imgList = document.getElementById('imgList');
	var mainNav = document.getElementById('main_nav');
	var buttons = document.getElementById('buttons').getElementsByTagName('span')
	var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = buttons.length;
    var animated = false;	//判断当前是否正在位移
    var playTime;
    var space = 3000;

     //动画效果
	function animate(offset){

		animated = true;
		var time = 300;		//位移总时间
		var interval = 10;	//时间间隔
		var speed = offset/(time/interval);	//每次的偏移量
		var newLeft = parseInt(imgList.style.left)+ offset;

		function go(){
			if ((speed > 0 && parseInt(imgList.style.left) < newLeft) || (speed < 0 && parseInt(imgList.style.left) > newLeft)) {
				imgList.style.left = parseInt(imgList.style.left) + speed +'px';
				setTimeout(go, interval);
			}
			else{
				imgList.style.left = newLeft +'px';
				if (newLeft > -1200) {
					imgList.style.left = -3600 + 'px';
				}
				if (newLeft < -3600) {
					imgList.style.left = -1200 + 'px';
				}
				animated = false;
			}
		}
		go();
	}

	//自动播放
	function play(){
		playTime = setTimeout(function(){
			next.onclick();
			play();
		},space);
	}

	//停止自动播放
	function stop(){
		clearTimeout(playTime);
	}

    //匹配小圆点
    function showBtns(){
    	for (var i=0; i<len; i++) {
    		if (buttons[i].className == 'on') {
    			buttons[i].className = '';
    			break;
    		}
    	}
    	buttons[index - 1].className = 'on';
    }

	prev.onclick = function (){
		if (animated) {
			return;
		}
		if (index == 1) {
			index = 3;
		}
		else{
			index --;
		}
		showBtns();
		animate(1200);
	}
	next.onclick = function (){
		if (animated) {
			return;
		}
		if (index == 3) {
			index = 1;
		}
		else{
			index ++;
		}
		showBtns();
		animate(-1200);
	}

	for (var i = 0; i < len; i++) {
		buttons[i].onclick = function (){
			if (animated) {
			return;
			}
			if (this.className == 'on') {
				return;
			}

			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -1200 * (myIndex - index);

			animate(offset);
			index = myIndex;
			showBtns();
		}
	}

	list.onmouseover = stop;	//鼠标滑过，停止自动播放
	list.onmouseout = play;		//鼠标移开，开始自动播放
	play();
}

//导航栏
function innerNav(){
	var nav = document.getElementById('main_nav');
	var oLi = nav.getElementsByTagName('li');
	var submenu = document.getElementById('submenu');
	var div = submenu.getElementsByTagName('div');
	var dLen = div.length;

	for (var i = 0, len = oLi.length; i < len; i++) {
		oLi[i].onmouseover = function(){
			var myButton = this.getAttribute('button');
			for (var i = 0; i < div.length; i++) {
				var myCode = div[i].getAttribute('code');
				if (myCode == myButton) {
					div[i].className = 'imghover';
					return;
				}
			}
		}
		oLi[i].onmouseout = function(){
			for (var i = 0; i < dLen; i++) {
				if(div[i].className = 'on'){
					div[i].className = '';
				}
			}
		}
	}
	for (var i = 0; i < dLen; i++) {
		div[i].onmouseover = function(){
			this.className = 'imghover';
		}
		div[i].onmouseout = function(){
			this.className = '';
		}
	}
}

//公用动画效果
function publicAnimate(){
	//解决IE8之类不支持getElementsByClassName
	function getElementsByClassName(className, root, tagName) {    //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
	    if (root) {
	        root = typeof root == "string" ? document.getElementById(root) : root;
	    } else {
	        root = document.body;
	    }
	    tagName = tagName || "*";
	    if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
	        return root.getElementsByClassName(className);
	    }
	    else {
	        var tag = root.getElementsByTagName(tagName);    //获取指定元素
	        var tagAll = [];                                    //用于存储符合条件的元素
	        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
	            for (var j = 0, n = tag[i].className.split(' ') ; j < n.length; j++) {    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
	                if (n[j] == className) {
	                    tagAll.push(tag[i]);
	                    break;
	                }
	            }
	        }
	        return tagAll;
	  	}
	}

	var pub = document.getElementsByClassName('public');
	var intval = 30;

	function mouseEvent (arr,clsName,speedNum,minTop,maxTop){
		for (var i = 0; i < arr.length; i++) {
			arr[i].onmouseover = function () {
				var This = this.getElementsByClassName(clsName)[0];
				clearInterval(This.time);
				This.time = setInterval(function(){
					if (This.offsetTop <= minTop) {
						clearInterval(This.time);
					}
					else{
						This.style.top = This.offsetTop - speedNum + 'px';
					}
				},intval);
				// debugger;
			}

			arr[i].onmouseout = function () {
				var This = this.getElementsByClassName(clsName)[0];
				clearInterval(This.time);
				This.time = setInterval(function(){
					if (This.offsetTop >= maxTop) {
						clearInterval(This.time);
					}
					else{
						This.style.top = This.offsetTop + speedNum + 'px';
					}
				},intval);
				// debugger;
			}
		}
	}

	//给每一个类添加鼠标滑过事件
	for (var i = 0; i < pub.length; i++) {
		mouseEvent(pub[i].getElementsByTagName('a'),'public-animate',8,30,90);
	}
}

function footAnimate(){
	var footA = document.getElementById('foot').getElementsByTagName('a')
	for (var i = 0; i < footA.length; i++) {
		footA[i].onmouseover = function () {
			this.style.backgroundPositionY = '-262px';
		}

		footA[i].onmouseout = function () {
			this.style.backgroundPositionY = '-221px';
		}
	}
}