var currentRulerValue = {
    unit: '',
    scaleValue: '',
};

(function() {

    document.querySelectorAll( '.textile-thumbnail' ).forEach( function( textileThumbnail ) {

        var mainTextileImageDisplay = document.querySelector( '#main-textile-image' );

        textileThumbnail.addEventListener( 'click', function( ) {

            // Renders image into main image view
            mainTextileImageDisplay.src =  (this.children[0]).children[0].src;

            setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

            console.log(currentRulerValue.scaleValue);

            //Passes the corresponding cm or in value to ruler
            if( currentRulerValue.scaleValue !== undefined ) {

                initializeRulerWithParam($);
                
                $('.myruler').ruler({
                    unit: currentRulerValue.unit,
                    tickMajor: 10,
                    tickMinor: 5,
                    tickMicro: 1
                });

                $('.myruler').css( 'display', 'initial');

                return;
            }

            $('.myruler').css( 'display', 'none');
        })

    });

})();// Hanldles all thumbnail actions

function setImageRulerAttributes( liImageItem ) {

    currentRulerValue.unit = liImageItem[1].nodeValue;
    currentRulerValue.scaleValue = liImageItem[1].nodeValue;

}

(function() {

    if( document.querySelector( '.myruler' ) === null ) return;

    var textileThumbnail = document.querySelectorAll( '.textile-thumbnail' )[0];

    setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

    //Passes the corresponding cm or in value to ruler
    if( currentRulerValue.scaleValue !== undefined ) {

        initializeRulerWithParam($);

        $('.myruler').ruler({
            unit: currentRulerValue.unit,
            tickMajor: 10,
            tickMinor: 5,
            tickMicro: 1
        });
        
        $('.myruler').css( 'display', 'initial');
    
    } else {

        $('.myruler').css( 'display', 'none');

    }

    setTimeout(convertToPercentageForWidthScaling(), 3000);

    function convertToPercentageForWidthScaling() {
        
        $('.ruler.left').detach();

        $('.ef-ruler .corner').text( '0' ).css('font-size', '8px');

        $('.tick').each( function(idx){

            $(this).html('&nbsp;' + ( idx + 1 ) + '');

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

    

}) (); // Javascript to manipulate ruler and ruler related actions



(function () {

    if( useDOMElement( '#textile-image-uploader' ) === null ) return;

    var checkedState = false;
    
    $("#show-custom-props").click(function() {

        checkedState = !checkedState; 

        $('#custom-scale-props').css('visibility', checkedState ? 'visible' : 'collapse');

    });// Display or show custom props fields

    $('#custom-value').keyup( function() {

        $('#scale-value').val( $(this).val() );

        console.log( $('#scale-value').val() );

    });// Sets the new scale value for the textile image ruler
    
    $('#switch-checked').click(function() {

        var selectedUnit = $('input:checked').length ? 'in' : 'cm';
        
        $('#scale-unit').val( selectedUnit );

        // If 1, is inches
        // If 0, is cm

    }); // Add listener for click event


    useDOMElement('.upload-input').addEventListener('click', function( e ){

        useDOMElement('#textile_image').click();

    });// Triggers the form upload input field to click


    useDOMElement('#apply-settings').addEventListener('click', function( e ) {
        
        if( useDOMElement('#textile_image').value === '' ) {
             
            displayAlert();
            
            return;
        }

        // If user does not want to add ruler scaling value and unit
        if( !checkedState ) {  
            
            useDOMElement( '#scale-unit' ).value = '';

            submitForm(); 
            
            return; 
        }

        if( checkedState && useDOMElement( '#scale-value' ).value === '' ) {

            displayAlert();

            return;

        }

        submitForm();
    
    });

    function removeAlert(){

        useDOMElement( '#my-alert' ).style.display = none;

    }

    function displayAlert() {

        useDOMElement( '#my-alert' ).innerHTML = 'Missing form fields';

        useDOMElement( '#my-alert' ).style.display = 'initial';

    }

    function submitForm() {

        useDOMElement('.uploader').submit();

    }

    function useDOMElement( selector ) {
        return document.querySelector( selector );
    }

})();

