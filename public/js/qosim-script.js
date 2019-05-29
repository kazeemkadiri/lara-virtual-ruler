var currentRulerValue = {
    unit: '',
    scaleValue: '',
    tickBy: '',
    isGreaterThanOrEqual11cm: false,
    isGreaterThanOrEqual5Inches: false
};

// Intializes the ruler and hides it
(function() {

    initializeRulerWithParam($);

    if( document.querySelector( '.myruler' ) === null ) return;

    var textileThumbnail = document.querySelectorAll( '.textile-thumbnail' )[0];
    
    // Runs as the first image loaded on to the main display section
    setTextileImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

    createRuler();

    renderRuler();
    
}) (); // Javascript to manipulate ruler and ruler related actions

function setTextileImageRulerAttributes( liTextileImageItem ) {

    var _unit = currentRulerValue.unit = liTextileImageItem[1].nodeValue;
    var _scaleValue = currentRulerValue.scaleValue = liTextileImageItem[2].nodeValue;

    var tempScaleValueGreaterBoolean = null;    

    switch( _unit.trim().toLowerCase() ){

        case 'cm':
            
            tempScaleValueGreaterBoolean = currentRulerValue.isGreaterThanOrEqual11cm = ( _scaleValue >= 11 );
            
            currentRulerValue.tickBy = tempScaleValueGreaterBoolean ? getNewCmTickSpacing(): getNewCmTickSpacingForLessThan11cm();
        
            break;

        case 'in':
            
            tempScaleValueGreaterBoolean = currentRulerValue.isGreaterThanOrEqual5Inches = ( _scaleValue >= 5 );
            
            if( _scaleValue.indexOf('.') > -1 ) {

                _scaleValue = _scaleValue.split('.');

                currentRulerValue.scaleValue = ( _scaleValue[0] * 16 ) + Math.floor(_scaleValue[1]);

            }

            currentRulerValue.tickBy = tempScaleValueGreaterBoolean ? getNewInchesTickSpacing(): getNewInchesTickSpacingForLessThan5inches();
            
            break;

        default:
        break;

    }
    
}

function createRuler () {

    $('.myruler').ruler({
        unit: 'cm',
        tickMajor: 4,
        tickMinor: 2
    }); // Creates a cm based ruler 

}

function renderRuler() {

    setTimeout( function() {

        addRulerScalingInfoInsideRuler( '.myruler', 'cm');

        addListenerForRulerTicksClick('.myruler');
        
        setRulerWidth( '520px' );

        //All above applies only to cm ruler

        renderRulerTicksByInches(); // clones the cm ruler "ef-ruler" and appends to inches ruler "second-ruler"

        setTimeout( function() {
            
            addListenerForRulerTicksClick( '.second-ruler' );

            translateTicksDown( '.second-ruler' );

            renderRulerForFirstImage();

            addRulerScalingInfoInsideRuler( '.second-ruler', 'in' );

        }, 3000);

    }, 3000);

}

function setRulerWidth ( numberOfPixels ) {

    $( '.myruler .ef-ruler .ruler.top' ).css( 'width', numberOfPixels + ' !important' );

}

function addRulerScalingInfoInsideRuler( rulerInstance, scaleUnit ) {

   // $( rulerInstance + ' .ef-ruler .corner').text( scaleUnit );

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

function renderTicksByCm( newRender = false ) {

    getInchesRuler( 'hide' );

    getCmRuler( 'show' );
    
    var _cmRulerTickSpacing = currentRulerValue.tickBy;

    appendTickNumbersForCmRuler( newRender );

    $('.myruler .tick').each( function(idx){

        $(this).attr('index', idx );

        $(this).css( 'left', (( idx * _cmRulerTickSpacing ) + 20 ) + 'px' );

        if( currentRulerValue.isGreaterThanOrEqual11cm ){

            $( this ).removeClass( 'minor' ).addClass( 'major' );

        }
        

    });

    if( newRender ) return;

    translateTicksDown( '.myruler' );

}

function getNewCmTickSpacing() {

    return ( 520 / currentRulerValue.scaleValue );

}

function getNewCmTickSpacingForLessThan11cm () {

    return ( 520 / ( currentRulerValue.scaleValue * 2 ) );

}

function removeTickNumberingsFromRuler ( rulerSelector ) {

    $( rulerSelector + ' .ef-ruler .tick-numbering' ).detach();

}

function appendTickNumbersForCmRuler( newRender = false ) {

    if( newRender ) removeTickNumberingsFromRuler( '.myruler' ); 

    $('.myruler .ef-ruler').append('<div class="tick-numbering" style="width:100%;"></div>');

    var _tickBy = currentRulerValue.tickBy.toFixed(3);
    var _scaleValueLessThan11cm =  ! currentRulerValue.isGreaterThanOrEqual11cm;


    for(var i = 0; i <= Math.ceil(currentRulerValue.scaleValue * 2); i++ ) {

        if( _scaleValueLessThan11cm && (i % 2 === 0) ) {

            $('.myruler .ef-ruler .tick-numbering')
            .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;">' + ( i / 2 ) + '</span>');    

            continue;

        } 

        if( ! _scaleValueLessThan11cm ) {

            $('.myruler .ef-ruler .tick-numbering')
            .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;">' + i + '</span>');

        }
        
    }
    

}

function addListenerForRulerTicksClick(rulerInstance) {

    
        // $( rulerInstance + ' .tick').each( function( idx ){

        //     //$(this).css( 'left',  idx === 0 ? '0%' : ( (idx) + '%') );

        //     var that = this;

        //     $(that).click( function(){

        //         setNewWidthForImageContainer( that );

        //     });

        // });

}

function renderTicksByInches( newRender = false ) {

    getInchesRuler( 'show' );

    getCmRuler( 'hide' );

    var _inchesRulerTickSpacing = currentRulerValue.tickBy;
    
    appendTickNumbersForInchesRuler( newRender );

    $('.second-ruler .tick').each( function(idx){

        $(this).attr('index', idx );

        $(this).css( 'left', (( idx * _inchesRulerTickSpacing * 16 ) + 20 ) + 'px' );

        if( currentRulerValue.isGreaterThanOrEqual5inches ){

            $( this ).removeClass( 'micro' ).addClass( 'major' );

        } else {

            $( this ).removeClass( 'minor' ).addClass( 'major' );

        }
    
    });

    translateTicksDown( '.second-ruler' );

}

function getNewInchesTickSpacing() {

    return  520 / ( currentRulerValue.scaleValue * 16 );

}

function getNewInchesTickSpacingForLessThan5inches () {

    return ( 520 / ( currentRulerValue.scaleValue * 2 ) );

}

function appendTickNumbersForInchesRuler( newRender = false ) {

    if( newRender ) removeTickNumberingsFromRuler( '.second-ruler' ); 

    $('.second-ruler .ef-ruler').append('<div class="tick-numbering" style="width:100%;"></div>');

    var _tickBy = currentRulerValue.tickBy.toFixed(3);
    
    var _scaleValueGreaterThanOrEqual5Inches =  currentRulerValue.isGreaterThanOrEqual5Inches;


    for(var i = 0; i <= Math.ceil( currentRulerValue.scaleValue ) * 16; i++ ) {

        if(  _scaleValueGreaterThanOrEqual5Inches  && (i % 16 === 0)  ) {

            $('.second-ruler .ef-ruler .tick-numbering')
            .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;">' + (i === 0) ? '0' : ( i / 16 ) + '</span>');    

        } 

        if( _scaleValueGreaterThanOrEqual5Inches ) {

            if( i % 8 === 0 ){

                $('.second-ruler .ef-ruler .tick-numbering')
                .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;"> <sup>1/2</sup> </span>');

            } else if ( i % 16 === 0 ) {

                $('.second-ruler .ef-ruler .tick-numbering')
                .append('<span class="tick-number" style="left:'+ ((i * _tickBy) + 20) +'px;">' + ( i / 16 )  + '</span>');

            }

        }
        
    }
    

}

function getCmRuler( state ) {

    $('.myruler .ef-ruler').css('display', state === 'show' ? 'inherit' : 'none');
    $('.myruler').css('display', state === 'show' ? 'inherit' : 'none');
    $('.myruler .cm').css('display', state === 'show' ? 'block' : 'none');

}

function getInchesRuler( state ) {

    $('.second-ruler .ef-ruler').css('display', state == 'show' ? 'inherit' : 'none');

    $('.second-ruler').css('display', state == 'show' ? 'inherit' : 'none');

    $('.second-ruler .in').css('display', state == 'show' ? 'block' : 'none');

}

function renderRulerTicksByInches () {

    document.querySelector('.second-ruler').append(document.querySelector('.ef-ruler').cloneNode( true ));
 
    var rulerTop = document.querySelector('.second-ruler .ruler');

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

            setTextileImageRulerAttributes( Array.from( textileThumbnail.attributes ) );

            //Passes the corresponding cm or in value to ruler
            if( currentRulerValue.scaleValue !== undefined ) {

                if( currentRulerValue.unit === 'cm' ) {

                    renderTicksByCm( true );

                    // console.log('rendering cm ruler')
    
                } else {  
                    
                    renderTicksByInches( true ); 
                    
                    // console.log('rendering inches ruler');
                }

                return;
            }

            $('.myruler').css( 'display', 'none');
        })

    });

})();// Handles all thumbnail actions

function detachLeftRuler() {

    $('.ruler.left').each( function(){ $(this).detach(); });

    // $('.ef-ruler .corner').each( function(){ $(this).text( '0' ).css('font-size', '8px'); });

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

