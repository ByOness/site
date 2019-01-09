$(document).ready(function(){
    $('.imgContainer').click(buyHandler);
    $('.buyButton').click(buyHandler);

    $('.left').click( function() {
        $(location).attr('href', '/');  
    })

    $('.anyButton').click (function() {
        let url = 'game-' + $(this).parent('.anyItem').attr('id')+'-bonus2018';

        $(location).attr('href',url); 
    })

    $('.sellButton').click( function() {
        $(location).attr('href',"sale"); 
    })
});

function buyHandler(){
   let url = 'game-' + $(this).parent('.buyElement').attr('id')+'-bonus2018';

   $(location).attr('href',url);    
}