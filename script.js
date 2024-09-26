Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    writable: true,
    value: function(i){ // By - MacHacker;
      return this.join("|").replace("|"+i, "").split("|")
    }
});

function call(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return f.apply( this, args )
}

words = ["hack", "rack", "bash", "tack", "bind", "mind", "find", "ring", "ping", "bake", "sack", "left", "meet", "beet", "fate", "fake", "rack", "sake", "tray", "code", "caps", "load"]
rand_chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "+", "_", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "|", "\\", ":", ";", ">", "<", ".", ",", "?", "/","`","~"]
function randint(s,e){
  //e = highest number
  //s = lowwest number
  if (e == undefined){
    return Math.floor((Math.random() * (s+1)) + 0)
  }else{
    return Math.floor((Math.random() * (e+1)) + s)
  }
}
function random_item(l, n){ // By - MacHacker; Randomly guesses characters. If n, then it makes a list of random items from your given list (l).
    if (n){
      r = []
      for (var i = 0; i<n; i++){
      	r.push(random_item(l)) 
      }
      return r
    }else{
      return l[randint(l.length-1)]
    }
}

function addEventlisteners(){
  word = random_item(used_words)
  var tries_left = 3

  $(".codes span").mouseover(function(){
    if ($(this).text().length > 1){
      var audio = new Audio("http://s0.vocaroo.com/media/download_temp/Vocaroo_s0thrSzfSmbQ.mp3")
      audio.play();
    }

  })

  $(".codes span").bind("click", function(){
    var audio = new Audio("http://s0.vocaroo.com/media/download_temp/Vocaroo_s0thrSzfSmbQ.mp3")
    audio.play();
    var t = $(this).text()
    $("#word").text(t)
    var l = find_likeness(t, word)
    if (typeof l == "boolean"){
      $("#likeliness").text("MATCH")
      $(".denied").attr("class", "granted").text("ACCESS GRANTED")
    }else{
      $("#likeliness").text(l)
    }
    $("#tries").text(tries_left--)
  })
}

function find_likeness(a, b){
  c = 0
  var [l, s] = [a, b].sort(function (a, b) { return b.length - a.length; });
  for (var i in l){if(l[i]==s[i]){c++}}
  return l.length == c || c
}

function make_row(){
  var width = 20 // how many characters will be in each row
  var length = 20 // how many lines there will be
  var used_words = []
  var rows = []
  for (var i = 0; i<length; i++){
    rows.push("")
    var r = ""
    var len = ""
    var a = ""
    for (var ii = 0; ii<width; ii++){
      if (randint(50) == 0){ //this is the likeliness that an actual work is chosen (1:100) 
        random_word = random_item(words)
        words = words.remove(random_word)
        if ((random_word.length + len.length)<width){
          a = random_word
          used_words.push(a)
          ii += random_word.length - 1
        }else{
          if ((len.length + 1) <= width){
            a = random_item(rand_chars)
          }
        }
      }else{
        if ((len.length + 1) <= width){
            a = random_item(rand_chars)
        }
      }
      len += a
      r += "<span>"+a+"</span>"
    }
    rows[rows.length-1] = r
  }
  return [rows, used_words]
}

var used_words = []
$(".code-break").each(function(){
  var [codes, used] = make_row()
  used_words = used_words.concat(used)
  for (c in codes){
    var e = this
    call(function(e, t, c, f){
      setTimeout(function(){
        $(e).append('<li><div class="hex"><span>0x'+random_item([1,2,3,4,5,6,7,8,9,0,"A","B","C"], 5).join('')+'</span></div><div class="codes">'+codes[c]+'</div></li>')
        if (f){f()}
      }, t);
    }, e, ((c/2)*500)+(randint(4)*100), c , ((c == (codes.length - 1)) ? addEventlisteners : false));
  }
});