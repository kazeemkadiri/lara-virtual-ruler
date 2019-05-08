var currentRulerValue = {
    unit: '',
    scaleValue: '',
};

// Intializes the ruler and hides it
(function() {

    initializeRulerWithParam($);

    if( document.querySelector( '.myruler' ) === null ) return;

    var textileThumbnail = document.querySelectorAll( '.textile-thumbnail' )[0];
    
    // Runs as the first image loaded on to the main display section
    setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

    renderCmRuler();

    renderRulerTicksByInches();

    //Passes the corresponding cm or in value to ruler
    if( currentRulerValue.scaleValue !== undefined ) {    
        
        var  newUnit = currentRulerValue.unit;

        switch( newUnit.trim() ) {
            case 'in':
                renderTicksByInches();
                break;
            case 'cm':
                renderTicksByCm();
                break;
            default:
                break;
        }
       
    
    } else {

        getCmRuler( 'hide' );

        getInchesRuler( 'hide' );

    }

    
}) (); // Javascript to manipulate ruler and ruler related actions

function renderCmRuler() {

    $('.myruler').ruler({
        unit: 'cm',
        tickMajor: 10,
        tickMinor: 5,
        tickMicro: 1
    });

    $('.second-ruler').ruler({
        unit: 'cm',
        tickMajor: 10,
        tickMinor: 5,
        tickMicro: 1
    });
}

function renderTicksByCm() {

    getInchesRuler( 'hide' );

    getCmRuler( 'show' );

    textileImageWidth = getNewCmWidth( currentRulerValue.scaleValue );

    var imageContainer = $( '.image-container' );

    imageContainer.css( 'width', textileImageWidth );

    $( '.main-textile-image').css( 'width', textileImageWidth + '!important' );

    imageContainer.css('transform', 'translateX(' + (( stripPxFromValue(textileImageWidth) - 700 ) / 2 ) + 'px)' );

    setTimeout( function() {
        translateTicksDown();

        addListenerForRulerTicksClick();
        
        $('.myruler .ef-ruler .ruler.top').css('width', '700px !important');

        $('.tick').each( function(idx){

            $(this).html( idx );

            $(this).data('index', idx );

            $(this).css( 'left',  idx === 0 ? '0px' : ( (idx * 23.33) + 'px') );

        });

    }, 3000);
}

function addListenerForRulerTicksClick() {

    $('.tick').each( function( idx ){

        //$(this).css( 'left',  idx === 0 ? '0%' : ( (idx) + '%') );

        var that = this;

        $(that).click( function(){

            setNewWidthForImageContainer( that );

        });

    });

}

function renderTicksByInches() {

    getInchesRuler( 'show' );

    getCmRuler( 'hide' );

    $('.inches-ruler').addClass('show');

    var tempInchValue = currentRulerValue.scaleValue;
    
    if( tempInchValue.indexOf('.') > -1 ) {

        tempInchValue = tempInchValue.split('.');

        tempInchValue = ( tempInchValue[0] * 16 ) + Math.floor(tempInchValue[1]);

    }

    textileImageWidth = getNewInchesWidth( tempInchValue * 16 );

    var imageContainer = $( '.image-container' );

    imageContainer.css( 'width', textileImageWidth );

    $( '.main-textile-image').css( 'width', textileImageWidth + '!important' );

    addListenerForRulerTicksClick();

    detachLeftRuler();

}

function getCmRuler( state ) {

    $('.myruler .ef-ruler').css('display', state == 'show' ? 'initial' : 'none');

}

function getInchesRuler( state ) {

    $('.second-ruler .ef-ruler').css('display', state == 'show' ? 'initial' : 'none');

}

function renderRulerTicksByInches () {

    var rulerTop = document.querySelector('.second-ruler .ruler.top');
 

    for( var i = 0; i < 184; i++ ) {
        
        if( i % 16 === 0 ) {

            rulerTop.append( renderTick( i, 3.80, 'major' ) );

            continue;

        }

        if( i % 8 === 0 ) {

            rulerTop.append( renderTick( i, 3.80, 'minor' ) );

            continue;

        }

        rulerTop.append( renderTick( i, 3.80, 'micro' ) );
        
    }

    console.log(rulerTop);

    $('.second-ruler .ef-ruler .ruler').css('width', '700px !important');

    var count = 0;
    
    $('.second-ruler .tick').each( function(){

        console.log($(this), count++);

    });


    $('.second-ruler .tick').each( function(idx){

        $(this).data('index', idx );

        $(this).css( 'left',  idx === 0 ? '0px' : ( (idx * 3.80) + 'px') );

    });

}

function renderTick( index, tickConstraint, tickType ) {

    var element = createElement('div');

    element.classList.add('tick', tickType );

    element.style.left = (index * tickConstraint) + 'px' ;
    

    if(tickType === 'major')
    element.innerHTML = (index % 16 === 0) && ( index >= 16) ? ( index / 16 ) : '' ;

    return element;
    
}

function createElement( elementTitle ) {

    return document.createElement( elementTitle );

}

(function() {

    document.querySelectorAll( '.textile-thumbnail' ).forEach( function( textileThumbnail ) {

        var mainTextileImageDisplay = document.querySelector( '#main-textile-image' );

        textileThumbnail.addEventListener( 'click', function( ) {

            // Renders image into main image view
            mainTextileImageDisplay.src =  (this.children[0]).children[0].src;

            setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

            //Passes the corresponding cm or in value to ruler
            if( currentRulerValue.scaleValue !== undefined ) {

                if( currentRulerValue.unit === 'cm' ) {

                    renderTicksByCm();
    
                } else {  renderTicksByInches();  }

                return;
            }

            $('.myruler').css( 'display', 'none');
        })

    });

})();// Handles all thumbnail actions

function setImageRulerAttributes( liImageItem ) {

    currentRulerValue.unit = liImageItem[1].nodeValue;
    currentRulerValue.scaleValue = liImageItem[2].nodeValue;

}

function detachLeftRuler() {

    $('.ruler.left').detach();

    $('.ef-ruler .corner').text( '0' ).css('font-size', '8px');

}

function translateTicksDown(){
    console.log('celled')
    //Sets the new tick values and brings them down by their height values
    $('.tick').each( function(idx){

        $(this).css('transform', 'translateY('+ $(this).css('height') +')');

    });

}

function setNewWidthForImageContainer( tickSelected ) {

    var imageContainer = $( '.image-container' );

    var selectedRulerValue = stripPxFromValue( $(tickSelected).text() );

    var newWidth = '';

    if( currentRulerValue.unit === 'cm' ) {
        
        newWidth = getNewCmWidth( selectedRulerValue );

    } else if( currentRulerValue.unit === 'in' ) {
        
        newWidth = getNewInchesWidth( selectedRulerValue );

    }

    imageContainer.css( 'width', newWidth);     
    
    console.log('changing width of container', newWidth, (( stripPxFromValue(newWidth) - 700 ) / 2 ))
    
    imageContainer.css( 'transform', 'translateX(' + (( stripPxFromValue(newWidth) - 700 ) / 2 ) + 'px)') ;

    return;

}

function getNewCmWidth( selectedRulerValue ) {

    if(selectedRulerValue === 0) return;

    return ( 23.333 * selectedRulerValue ) + 'px';

}

function getNewInchesWidth( selectedRulerValue ) {

    if(selectedRulerValue === 0) return;

    return ( 2.57 * selectedRulerValue ) + 'px';

}

function stripPxFromValue( val ) {

    return val.replace( 'px', '' );

}

function convertToPercentageForWidthScaling() {
        
 
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

    

}



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

})(); //Form upload handler for textile image upload

