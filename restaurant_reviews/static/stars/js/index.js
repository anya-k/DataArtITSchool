jQuery(document).ready(function () {
  $('.rating-input').rating({
    min: 0,
    max: 5,
    step: 1,
    size: 'lg',
    showClear: false,
    showCaption:false
  });
  $( '#rate').children().each(function(i) {
    var source = $(this);
    source.attr('id',i);
  });

  $('.star-rating').on('rating.change', function() {
    //alert($('.rating-input').val());
    var source = $(this);
    var val = source.find('.rating-input').val();
    alert(source.attr('id')+' '+ val);
  });


});