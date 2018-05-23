var el = document.getElementsByName('input')[0];
function test(){
    console.log('im listening');
}
el.addEventListener('focus',test,false);
