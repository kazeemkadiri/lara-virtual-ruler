(function() {

    document.querySelectorAll( '.textile-thumbnail' ).forEach( function( textileThumbnail ) {

        var mainTextileImageDisplay = document.querySelector( '#main-textile-image' );

        textileThumbnail.addEventListener( 'click', function( ) {

            mainTextileImageDisplay.src =  (this.children[0]).children[0].src;

        })

    });

})();

(function() {

    if( document.querySelector( '.myruler' ) === null ) return;

    $('.myruler').ruler({
        unit: 'cm',
        tickMajor: 10,
        tickMinor: 5,
        tickMicro: 1,
        showLabel: true,
        arrowStyle:'arrow'
    });

    setTimeout(convertToPercentageForWidthScaling(), 3000);

    function convertToPercentageForWidthScaling() {
        
        $('.ruler.left').detach();

        $('.ef-ruler .corner').text( 'cm' ).css('font-size', '8px');

        $('.tick').each( function(idx){

            $(this).html('&nbsp;' + idx + '');

            $(this).css( 'left',  idx === 0 ? '0%' : ( (idx) + '%') );

            $(this).css('transform', 'translateY('+ $(this).css('height') +')');

        });

        $('.tick').each( function( ){

            $(this).click( function(){

                var imageContainer = $( '.image-container' );

                var selectedRulerValue = stripPxFromValue( $(this).text() );

                var newWidthHeight = getNewWidthAndHeightOfImageContainer( selectedRulerValue );

                imageContainer.css( 'width', newWidthHeight);         
                
                document.querySelector( '.image-container' ).style.transform = 'translateX(' + (( stripPxFromValue(newWidthHeight) - 700 ) / 2 ) + 'px)';

            });

        });

        function getNewWidthAndHeightOfImageContainer( selectedRulerValue ) {

            if(selectedRulerValue === 0) return;

            return ( 23.333 * selectedRulerValue ) + 'px';

        }


        function getZoomValue( selectedRulerValue ) {

            if(selectedRulerValue === 30 
                || selectedRulerValue === 0 ) return initial;

            return ( ( ( 700 - ( selectedRulerValue * 23.333 ) ) / 700 ) );

        }

        // function getZoomValue( selectedRulerValue ) {

        //     if(selectedRulerValue === 30 
        //         || selectedRulerValue === 0 ) return initial;

        //     return ( ( ( 700 - ( selectedRulerValue * 23.333 ) ) / 700 ) * 100 );

        //     // return ( (percentageDifference * 700) / 100) + ((selectedRulerValue * 77) / 29 ) + '%';

        // }

        function stripPxFromValue( val ) {

            return val.replace( 'px', '' );

        }

    }

    

}) (); // Javascript to manipulate ruler end


(function () {

    if( document.querySelector( '#switch-checked' ) === null ) return;

        var checkedState = false;

        $('#switch-checked').click(function() {

            console.log( $('input:checked').length );
            // If 1, is blue
            // If 0, is green

        });
    

        $("#show-input").click(function() {

            checkedState = !checkedState; 

            $('#custom-props-example').css('visibility', checkedState ? 'visible' : 'collapse');

        });
        
}) (); // form elements scaling 

(function () {

    
    $('#switch-checked').click(function() {

        var selectedUnit = $('input:checked').length ? 'in' : 'cm';
        
        $('#scale-unit').val( selectedUnit );

        // If 1, is blue
        // If 0, is green

    }); // Add listener for click event

    if( document.querySelector( '#file-drag' ) === null ) return;

    document.querySelector('#file-drag').addEventListener('click', function( e ){

        document.querySelector('#textile_image').click();

    });

    document.querySelector('#apply-settings').addEventListener('click', function( e ) {
    
        
        if( useDOMElement('#textile_image').value === null ) {
             
            useDOMElement( '#my-alert' ).text('Some form fields have not being filled');
            
            return;
        }

        if( useDOMElement( '' ) ) {

            useDOMElement( '#scale-value' ).value === null;

        }

        useDOMElement('#textile-image-uploader').submit();
    
    });

    function useDOMElement( selector ) {
        return document.querySelector( selector );
    }

});