@extends('layouts.app')

@section('content')

<div class="container-fluid">

    <div class="row mx-0">

        
       <div class="col-md-2 col-lg-2 mx-0">
            @if(Auth::user())
                
                @include('layouts.sidebar')
                
            @endif
        </div>

        <div class="col-md-10 col-lg-10 m-0">

            <div class="row">
            
                <div class="col-4 mx-0 px-3 pb-0 pt-2 text-left"><h2> Catalog </h2></div>
            
                <div class="col-8 px-4 pt-0 d-flex justify-content-end"> 
                   
                <div class="input-group mb-3 justify-content-end">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" 
                                style=" border-right:none; border-color: #ced4da;"><i class="fa fa-search"></i></button>
                    </div>
                    <div class="input-group-append">
                        <input type="text" 
                                class="form-control" 
                                id="inputGroupFile03"
                                placeholder="Search"
                                style="border-left:none;"
                                aria-describedby="inputGroupFileAddon03">
                   </div>
                </div>
                </div>
            
            </div>

            <!-- Catalog Menus -->
            <div class="row px-4" style="border-top: 0.1px solid lightgray;">
            
                <ul class="nav nav-pills qas-pills-tab mb-3 ml-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Photos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Product info</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Product details</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <!-- Operations forms are displayed here -->

                    <div class="row">
            
                        <div class="col-12 text-left mt-4"><h3>Add a new Product</h3></div>

                        <div class="col-12">

                            <div class="row py-1 px-3">
                            
                            <!-- Jumbotron for photo upload form -->
                            <div class="jumbotron px-5 w-100">
                                <div class="col-12 text-left"><h4>Photos</h4></div>
                                <div class="col-12 text-left"><p>Choose and upload a photo</p></div>

                                <div class="col-12">

                                    <!-- Alert error box -->
                                    <div class="row">
                                        <div class="col-12 my-3 d-flex">
                                            <div id="my-alert" class="alert alert-danger text-center w-100" style="display:none;"></div>
                                        </div>
                                    </div>

                                    <div class="row">

                                        <!-- Tips -->
                                        <div class="col-4 pr-0">
                                            <h5>Tips</h5>
                                            <ul style="color:#5f6982;">
                                                <li>Use high quality images for close up</li>
                                                <li>Use virtual scale for sizing</li>
                                                <li>Use natural light and no flash</li>
                                            </ul>
                                        </div>

                                        <!-- Image upload alert -->
                                        <div class="col-7">

                                            

                                            @php $uploadResponse = session() -> pull( 'textile-image-upload-response' ) @endphp

                                            @if ( isset( $uploadResponse ) )

                                                <div class="alert 
                                                    {{ $uploadResponse === 'success' ? 'alert-success' : 'alert-danger' }}">
                                                
                                                    <strong> Image upload {{ $uploadResponse === 'success' ? 'was successful' : 'failed' }} </strong>

                                                </div>

                                            @endif

                                            <!-- Form for image upload -->
                                            <form  id="textile-image-uploader" 
                                                    method='post' 
                                                    enctype="multipart/form-data"
                                                    class="uploader" 
                                                    action='{{ route("image-upload") }}'>
                                                
                                                {{ csrf_field() }}
                                                
                                                <input type='text' 
                                                        id='scale-unit' 
                                                        name='scale_unit'
                                                        value='cm'
                                                        style='display:none;'>

                                                <input type='text' 
                                                        id='scale-value' 
                                                        name='scale_value'
                                                        style='display:none;'>

                                                <input id="textile_image" 
                                                        type="file" 
                                                        name="textile_image" 
                                                        accept="image/*" 
                                                        style="display:none;">
                                                
                                                <label for="file-upload" 
                                                       id="file-drag" 
                                                       class="upload-input d-flex align-items-center">
                                                    <div id="start" 
                                                         class="d-flex flex-column justify-content-center align-items-center">
                                                        <i class="fa fa-camera" aria-hidden="true"></i>
                                                        <div>Add a photo</div>
                                                        
                                                        <div class="progress" style="height: 0px;">
                                                            <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                                                 role="progressbar" 
                                                                 aria-valuenow="75" 
                                                                 aria-valuemin="0" 
                                                                 aria-valuemax="100" 
                                                                 style="width: 100%; height: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </label>
                                            </form>
                                        </div>

                                        <!-- Checkbox( Display scale of measurement ) -->
                                        <div class="col-12 mb-1">
                                            <div class="row">
                                                <div class="col-6 offset-2 d-flex align-items-center justify-content-end">
                                                    <label for="show-input"><strong>Display scale of measurement</strong></label>
                                                </div>
                                                
                                                <div class="col-3 d-flex justify-content-center align-items-center">
                                                    <input type="checkbox" name="show-input" id="show-custom-props" >
                                                </div>
                                            </div>

                                            <div class="row" id="custom-scale-props" style="display: flex; align-items: center; visibility: hidden;">

                                                <!-- Rounded switch -->
                                                <div class="col-6 offset-2 d-flex align-items-center justify-content-end">
                                                    <span><strong> Choose scale unit </strong></span>
                                                </div>
                                                <div class="col-3 d-flex justify-content-center align-items-center">
                                                    <span><em> (cm) </em></span>
                                                    
                                                    <label class="switch mx-2"> 
                                                        <input type="checkbox" id="switch-checked">
                                                        <span class="slider round"></span>
                                                    </label>
                                                    
                                                    <span><em> (in) </em></span>
                                                </div>

                                                <div class="col-6 offset-2 d-flex align-items-center justify-content-end">
                                                    <span><strong> Specify scale size </strong></span>
                                                </div>


                                                <!-- Custom value input field -->
                                                <div class="col-3 d-flex justify-content-center">
                                                <input type="text" 
                                                        name="" 
                                                        value="" 
                                                        class="form-control" 
                                                        max="30" 
                                                        id="custom-value" 
                                                        style="width: 60px">
                                                </div>

                                                </div>
                                        </div>

                                            
                                                 
                                        </div>

                                        <div class="row">
                                                <div class="col-12 d-flex justify-content-end">
                                                    <button id='apply-settings'
                                                            type='button' 
                                                            class='btn roger-btn-grey w-50'>
                                                            Apply
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                </div>

            </div>

        </div>

    </div>

</div>

@endsection