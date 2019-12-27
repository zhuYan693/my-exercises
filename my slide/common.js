//根据id获取元素对象
function my$(id) {
  return document.getElementById(id);
}
//格式化日期和时间
function getDate(dt) {
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var second = dt.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hours = hours >= 10 ? hours : "0" + hours;
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  second = second >= 10 ? second : "0" + second;
  return year + "年" + month + "月" + day + "日" + hours + ":" + minutes + ":" + second;
}
//设置任意元素的中间的文本内容
function setInnerText(ele,text) {
  if (typeof ele.textContent==="undefined"){
    ele.innerText=text;
  } else {
    ele.textContent=text;
  }
}
//获取任意元素的中间的文本内容
function getInnerText(ele) {
  if (typeof ele.textContent==="undefined"){
    return ele.innerText;
  } else {
    return ele.textContent;
  }
}
// 绑定事件
function addEventListener(ele,type,fn) {
  if (ele.addEventListener){
    ele.addEventListener(type,fn,false);
  } else if (ele.attachEvent){
    ele.attachEvent("on"+type,fn);
  } else {
    ele["on"+type]=fn;
  }
}
//获取父元素中的最后一个元素
function getLastElementChild(ele) {
  if (ele.lastElementChild){
    return ele.lastElementChild;
  } else {
    var node=ele.lastChild;
    while (node&&node.nodeType!==1){
      node=node.previousSibling;
    }
    return node;
  }
}
//获取父元素中的第一个元素

function getPreviousElementSibling(ele) {
  if (ele.previousElementSibling){
    return ele.previousElementSibling;
  } else {
    var node=ele.previousSibling;
    while (node&&node.nodeType!=1){
      node=node.previousSibling;
    }
    return ele.previousSibling;
  }
}
//获取元素计算后的样式属性值
function getStyle(ele,attr) {
  return window.getComputedStyle?window.getComputedStyle(ele,null)[attr]:ele.currentStyle[attr];
}
//封装动画函数
function animate(ele, json, fn) {
  if (ele.timeId) {
    clearInterval(ele.timeId);
  }
  ele.timeId = setInterval(function () {
    var flag = true;
    for (var attr in json) {
      if (attr === "zIndex") {
        ele.style[attr] = json[attr];
      } else if (attr === "opacity") {
        var current = getStyle(ele, attr) * 100,
          target = json[attr] * 100;
        step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        ele.style[attr] = current / 100;
      } else {
        var current = parseInt(getStyle(ele, attr)),
          target = json[attr];
        step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        ele.style[attr] = current + "px";
      }

      if (current !== target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(ele.timeId);
      if (fn) {
        fn();
      }
    }
    console.log("目标位置" + target + "当前位置" + current + "每次移动步数" + step);


  }, 20);

}
//获取页面向上或者向左卷曲出去的距离的值
function getScroll() {
  return {
    left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0,
    top:window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
  };
}
