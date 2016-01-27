//jQuery(document).ready(function(){
//    start(false)
//});

function start(value) {
  var count = 4;
  var parent = '#rate';
  //for(var i=0; i < count; ++i) {
  //  var starHtml = '<input class="rating-input" type="number" />';
  //  $( starHtml ).attr('id',i).appendTo($( parent));
  //}

  $('.rating-input').rating({
    min: 0,
    max: 5,
    step: 1,
    size: 'sm',
    showClear: false,
    disabled:value,
    //disabled:false,
    showCaption:false
  });

  $('.rating-input').on('rating.change', function() {
    var source = $(this);
    var val = source.val();
    alert(source.attr('id')+' '+ val);
  });

}