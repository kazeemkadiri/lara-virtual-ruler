var currentRulerValue = {
    unit: '',
    scaleValue: '',
    tickBy: '',
    isGreaterThanOrEqual11cm: false,
};

// Intializes the ruler and hides it
(function() {

    initializeRulerWithParam($);

    if( document.querySelector( '.myruler' ) === null ) return;

    var textileThumbnail = document.querySelectorAll( '.textile-thumbnail' )[0];
    
    // Runs as the first image loaded on to the main display section
    setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

    renderRuler();

    
}) (); // Javascript to manipulate ruler and ruler related actions

function renderRuler() {

    $('.myruler').ruler({
        unit: 'cm',
        tickMajor: 4,
        tickMinor: 2
    }); // Creates a cm based ruler 

    setTimeout( function() {

        addRulerScalingInfoInsideRuler( '.myruler', 'cm');

        addListenerForRulerTicksClick('.myruler');
        
        $('.myruler .ef-ruler .ruler.top').css('width', '520px !important');

        //All above applies only to cm ruler

        renderRulerTicksByInches(); // clones the cm ruler "ef-ruler" and appends to inches ruler "secondruler"

        setTimeout( function() {
            
            addListenerForRulerTicksClick( '.secondruler' );

            translateTicksDown( '.secondruler' );

            renderRulerForFirstImage();

            addRulerScalingInfoInsideRuler( '.secondruler', 'in' );

        }, 3000);

    }, 3000);

}

function addRulerScalingInfoInsideRuler( rulerInstance, scaleUnit ) {

    $( rulerInstance + ' .ef-ruler .corner').text( scaleUnit );

}

function renderRulerForFirstImage() {

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

}

function renderTicksByCm() {

    getInchesRuler( 'hide' );

    getCmRuler( 'show' );
    
    var _cmRulerTickSpacing = currentRulerValue.isGreaterThanOrEqual11cm ? 
                                getNewCmTickSpacing()
                                : getNewCmTickSpacingForLessThan11cm();

    appendTickNumbersForCmRuler();

    $('.myruler .tick').each( function(idx){

        $(this).attr('index', idx );

        $(this).css( 'left', (( idx * _cmRulerTickSpacing ) + 20 ) + 'px' );

        if( currentRulerValue.isGreaterThanOrEqual11cm ){

            $( this ).removeClass( 'minor' ).addClass( 'major' );

        }
        

    });

    translateTicksDown( '.myruler' );

}

function getNewCmTickSpacing() {

    return ( 520 / currentRulerValue.scaleValue );

}

function appendTickNumbersForCmRuler() {

    $('.myruler .ef-ruler').append('<div class="tick-numbering" style="width:100%;"></div>');

    var _tickBy = currentRulerValue.tickBy.toFixed(3);
   // var _isGreaterThan11cm = currentRulerValue.isGreaterThanOrEqual11cm;

    for(var i = 0; i <= Math.ceil(currentRulerValue.scaleValue * 2); i++ ) {

        //if(_isGreaterThan11cm && (i % 2 === 1)) continue;

        $('.myruler .ef-ruler .tick-numbering')
        .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;">' + i + '</span>');

    }
    

}

function addListenerForRulerTicksClick(rulerInstance) {

    
        $( rulerInstance + ' .tick').each( function( idx ){

            //$(this).css( 'left',  idx === 0 ? '0%' : ( (idx) + '%') );

            var that = this;

            $(that).click( function(){

                setNewWidthForImageContainer( that );

            });

        });

}

function renderTicksByInches() {

    // console.log('Rendering by inches');

    getInchesRuler( 'show' );

    getCmRuler( 'hide' );

    var tempInchValue = currentRulerValue.scaleValue;
    
    if( tempInchValue.indexOf('.') > -1 ) {

        tempInchValue = tempInchValue.split('.');

        tempInchValue = ( tempInchValue[0] * 16 ) + Math.floor(tempInchValue[1]);

    }

    textileImageWidth = getNewInchesWidth( tempInchValue * 16 );

    var imageContainer = $( '.image-container' );

    imageContainer.css( 'width', textileImageWidth );

    $( '.main-textile-image').css( 'width', textileImageWidth + '!important' );

    imageContainer.css( 'transform', 'translateX(' + (( stripPxFromValue(textileImageWidth) - 520 ) / 2 ) + 'px)') ;
}

function getCmRuler( state ) {

    $('.myruler .ef-ruler').css('display', state == 'show' ? 'inherit' : 'none');
    $('.myruler').css('display', state == 'show' ? 'inherit' : 'none');
    $('.myruler .cm').css('display', state == 'show' ? 'block' : 'none');

}

function getInchesRuler( state ) {

    $('.secondruler .ef-ruler').css('display', state == 'show' ? 'inherit' : 'none');

    $('.secondruler').css('display', state == 'show' ? 'inherit' : 'none');

    $('.secondruler .in').css('display', state == 'show' ? 'block' : 'none');

}

function renderRulerTicksByInches () {

    document.querySelector('.secondruler').append(document.querySelector('.ef-ruler').cloneNode( true ));
 
    var rulerTop = document.querySelector('.secondruler .ruler');

    var tickElement = '';

    for( var j = 0; j < 150; j++) {

        tickElement = document.createElement( 'div' );
        
        tickElement.classList.add( 'tick' );
        
        rulerTop.append( tickElement );

    } // Adds additional elements to use as ticks. Insufficient generated by default

    rulerTop.querySelectorAll( '.tick' ).forEach( function(tickElem, idx) {

        tickElem.innerHTML = '';

        if( idx % 16 === 0 ) {

            modifyTickAttributes( idx, 3.80, 'major', tickElem );

            return;

        }

        if( idx % 8 === 0 ) {

            modifyTickAttributes( idx, 3.80, 'minor', tickElem );

            return;
        }

        modifyTickAttributes( idx, 3.80, 'micro', tickElem );

    });

   
}

function modifyTickAttributes( index, tickConstraint, tickType, tickElem ) {

    tickElem.className = '';
    tickElem.classList.add('tick', tickType );

    tickElem.style.left = (index * tickConstraint) + 'px' ;
    
    if(tickType === 'major') {
        
        tickElem.innerHTML = (index % 16 === 0) && ( index >= 16) ? ( index / 16 ) : '' ;

    }

    tickElem.setAttribute( 'dataTickValue', index);

    return tickElem;
    
}

function createElement( elementTitle ) {

    return document.createElement( elementTitle );

}

(function() {

    document.querySelectorAll( '.textile-thumbnail' ).forEach( function( textileThumbnail ) {

        var mainTextileImageDisplay = document.querySelector( '#main-textile-image' );

        textileThumbnail.addEventListener( 'click', function( ) {

            // Renders image into main image view by getting src from image tag in list thumbnail
            mainTextileImageDisplay.src =  (this.children[0]).children[0].src;

            setImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

            //Passes the corresponding cm or in value to ruler
            if( currentRulerValue.scaleValue !== undefined ) {

                if( currentRulerValue.unit === 'cm' ) {

                    renderTicksByCm();

                    // console.log('rendering cm ruler')
    
                } else {  
                    
                    renderTicksByInches(); 
                    
                    // console.log('rendering inches ruler');
                }

                return;
            }

            $('.myruler').css( 'display', 'none');
        })

    });

})();// Handles all thumbnail actions

function setImageRulerAttributes( liImageItem ) {

    var _unit = currentRulerValue.unit = liImageItem[1].nodeValue;
    var _scaleValue = currentRulerValue.scaleValue = liImageItem[2].nodeValue;

    var tempScaleValueGreaterBoolean = currentRulerValue.isGreaterThanOrEqual11cm = ( _scaleValue >= 11 );

    switch( _unit.trim() ){

        case 'cm':
            currentRulerValue.tickBy = tempScaleValueGreaterBoolean ? getNewCmTickSpacing(): getNewCmTickSpacingForLessThan11cm();
        break;

        case 'in':
            currentRulerValue.tickBy = getNewInchesTickSpacing();
        break;

        default:
        break;

    }
    
}

function detachLeftRuler() {

    $('.ruler.left').each( function(){ $(this).detach(); });

    $('.ef-ruler .corner').each( function(){ $(this).text( '0' ).css('font-size', '8px'); });

}

function translateTicksDown( rulerInstance ){

    //Sets the new tick values and brings them down by their height values
    $( rulerInstance + ' .tick' ).each( function(idx){

        $(this).text(''); 

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

        selectedRulerValue = $(tickSelected).attr('datatickvalue');
        
        newWidth = getNewInchesWidth( selectedRulerValue  );

    }

    imageContainer.css( 'width', newWidth);     
    
    // console.log('changing width of container', newWidth, (( stripPxFromValue(newWidth) - 520 ) / 2 ))
    
    imageContainer.css( 'transform', 'translateX(' + (( stripPxFromValue(newWidth) - 520 ) / 2 ) + 'px)') ;

    return;

}

function getNewCmWidth( selectedRulerValue ) {

    if(selectedRulerValue === 0) return;

    return ( 17.333 * selectedRulerValue ) + 'px';

}

function getNewCmTickSpacingForLessThan11cm () {

    return ( 520 / ( currentRulerValue.scaleValue * 2 ) );

}

function getNewInchesWidth( selectedRulerValue ) {

    if(selectedRulerValue === 0) return;

    return ( 2.82 * selectedRulerValue ) + 'px';

}

function stripPxFromValue( val ) {

    return val.replace( 'px', '' );

}

function convertToPercentageForWidthScaling() {
        
 
    function getZoomValue( selectedRulerValue ) {

        if(selectedRulerValue === 30 
            || selectedRulerValue === 0 ) return initial;

        return ( ( ( 520 - ( selectedRulerValue * 23.333 ) ) / 520 ) );

    }

    // function getZoomValue( selectedRulerValue ) {

    //     if(selectedRulerValue === 30 
    //         || selectedRulerValue === 0 ) return initial;

    //     return ( ( ( 520 - ( selectedRulerValue * 23.333 ) ) / 520 ) * 100 );

    //     // return ( (percentageDifference * 520) / 100) + ((selectedRulerValue * 77) / 29 ) + '%';

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

        if( ($(this).val() > 30) && $('#scale-unit').val() == 'cm' ) {
            
            alertCmLimitExceeded();

        }

        if( ($(this).val() > 11.8) && $('#scale-unit').val() == 'in' ) {
            
            alertInchesLimitExceeded();

        }

    });// Sets the new scale value for the textile image ruler
    
    $('#switch-checked').click(function() {

        var selectedUnit = $('input:checked').length ? 'in' : 'cm';
        
        $('#scale-unit').val( selectedUnit );

        if( (selectedUnit === 'cm') && $('#custom-value').val() > 30 ) {

            alertCmLimitExceeded();

        }

        if( (selectedUnit === 'in') && $('#custom-value').val() > 11.8 ) {

            alertInchesLimitExceeded();

        }

    }); // Add listener for click event

    function alertCmLimitExceeded() {
        alert("Max value is 30");

        $('#scale-value').val();
    }

    function alertInchesLimitExceeded() {
        alert("Max value is 11.8");

        $('#scale-value').val();
    }

    function changeFaIcon( iconClassToRemove, iconClassToAdd  ) {

        console.log('called');

        var faIcon = useDOMElement('i.fa' + iconClassToRemove);
        
        faIcon.classList.remove( iconClassToRemove.replace('.', '') );

        faIcon.classList.add( iconClassToAdd );

    }

    function validateImageSelectedCountLessThanOrEquals5( uploaderElement ) {

        if( uploaderElement.files.length > 5 ) {

            alert( 'You can upload only a maximum of (5) files' );

            uploaderElement.value = '';

            useDOMElement('#textile_image').click();

        }

    }

    var iconCheckInUse = false;

    useDOMElement('#textile_image').addEventListener('change', function(){

        if( ! iconCheckInUse ) {
            
            changeFaIcon( '.fa-camera', 'fa-check'  );

            iconCheckInUse = true;
        }

        validateImageSelectedCountLessThanOrEquals5( this );

    });

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

        useDOMElement('.progress-bar').style.height = 'inherit';

    }

    function useDOMElement( selector ) {
        return document.querySelector( selector );
    }

})(); //Form upload handler for textile image upload

