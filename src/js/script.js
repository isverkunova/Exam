$(function () {

    // carousels
    var carousels = $('.carousel');

    carousels.each(function(el){
        var pictures = $(this).find('> div');
        var index = 0;

        setInterval(function(){
            if(index === 3){
                index = 0;
            }

            pictures.each(function(el){
                $(this).removeClass('swipe');
            });

            $(pictures[index]).addClass('swipe');

            index++;
        }, 90000);

        pictures.each(function(el){
            if(el === 0){
                $(this).addClass('swipe');
            }
        });
    });

    // masonry
    function grid() {
        var $grid = $('.grid');
        $grid.imagesLoaded(function () {
            $grid.masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                gutter: '.gutter-sizer'
            });
        });
    }

    // search
    function request(){
        $('.pictures').find('div').remove();
        var $query = $('input').val();

        $.ajax({
            url: 'https://pixabay.com/api/?key=2650584-e8feab9b11ed644dcec728ac9&q=' + $query + '&image_type=photo',            method: 'GET',
            success: function(info){
                var $html = $('#grid').html();
                var $content = tmpl($html, info);
                $('.pictures').append($content);
                grid();
            },
            error: function() {
                console.log('Error!');
            }
        });
    }

    request();

    $('.ajaxBtn').on('click', function(e){
        e.preventDefault();
        request();
        $('input').val();
    });

});