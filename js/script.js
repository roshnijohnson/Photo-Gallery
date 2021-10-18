var sol;


$(document).ready(function () {
    $.ajax({
        url: './js/data.json',
        crossDomain: true,
        dataType: "json",
        success: function (result) {
            console.log('successful load on data.json');
            
            sol = result;
            sol.forEach(element => {
                populateImages(element);
            });
        },
        error: function (e) {
           
        }
    });


    $('#imgContainer').on('mouseenter', 'img', function (e) {
        $(this).addClass('gray');
        var img = sol.find(e => {
            return e.title === $(this).attr('alt')
        });
        

        $('.openimage').append
        (
        '<div class="modal popup" id="imgmodal1" tabindex="-1">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-body graycolor" id="bodymodal">'+
                    '<img src='+'"'+$(this).attr('src').replace('square', 'medium')+'"'+ 'class="imagepreview image-modal">'+
                    '<p class="pclass">' + $(this).attr('alt') +  ' '+img.city + ' ' + img.country + ' ' + img.taken + '</p>' +
            '</div></div></div></div>'
        );
     
        var ht=($('.imagepreview').get(0).naturalHeight);

        $('.imagepreview').attr('alt', $(this).attr('alt'));

        $('#imgmodal1').css({
            "left": e.pageX,
            "top": e.pageY-ht
        });

        $('.openimage').html(imgmodal1);
        myModal=new bootstrap.Modal($("#imgmodal1"),{
            backdrop:'null',
            focus:false,
        });

        myModal.show();
    });

    $(document).on('mouseleave', 'img', function () {
        
        $(this).removeClass('gray');
        $('.pclass').empty();
        $('.modal').modal('hide');
         $(".openimage").empty();
        
    });

    $('#imgContainer').on('mousemove', document, function (e) {
       
        $('#imgmodal1').offset({
            left: e.pageX,
            top: e.pageY + 20
        });
    });

});

function populateImages(image) {
  
    $('#imgContainer').append(
        '<img src="images/square/' + image['path'] + '"' + 
        ' alt = "' + image['title'] + '"' + 'class="px-3"> '
    );
}