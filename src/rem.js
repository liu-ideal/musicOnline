export default function(){
  window.addEventListener('load',function(){
    var myhtml=document.documentElement;
    var viewWidth=document.documentElement.clientWidth;
    myhtml.style.fontSize=viewWidth+'px';
  },false);
  window.addEventListener('resize',function(){
    console.log('ll');
    var myhtml=document.documentElement;
    var viewWidth=document.documentElement.clientWidth;
    myhtml.style.fontSize=viewWidth+'px';
  },false)

}
