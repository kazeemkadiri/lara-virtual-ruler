@extends('layouts.app')

@section('content')

<div class="container">

    <div class="row">

        <div class="col-md-3 col-lg-3">

         @include('layouts.sidebar')
        
        </div>

        <div class="col-md-9 col-lg-9 m-0">

            <div class="row">
            
                <div class="col-4 px-0 ml-4 mt-2 text-left"><h2> Product </h2></div>
            
            </div>

            <!-- Catalog Menus -->
            <div class="row">
              <div class="col-12">
                <ul class="nav nav-pills qas-pills-tab mb-3 ml-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Overview</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Shipping and returns</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Payment Options</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <!-- Operations forms are displayed here -->

                    <div class="row">
            
                       <div class="col-12 ml-4 mt-2 text-left"><h3>Qosim's pattern design</h3></div>

                        <div class="col-12">

                            <div class="row ml-4 mt-2">
                                
                                <div class="col-12 px-0 d-flex align-items-start justify-content-center" 
                                     style="max-width: 520px !important;
                                            min-width: 519px !important;
                                            min-height: 329px !important;
                                            max-height: 330px !important; 
                                            box-shadow: 2px 1px 9px 2px rgba(0,0,1,0.2);
                                            overflow:hidden;">

                                    <div class="image-container d-flex justify-content-start" 
                                         style="max-width:520px !important;
                                                max-height: 330px !important;
                                                width: 519px;
                                                height: 329px;
                                                overflow-x: scroll;
                                                overflow-y: auto;
                                                position:relative">

                                        <img src="{{ count($textileImages) > 0 ? $textileImages[0] -> name : '' }}" 
                                            id="main-textile-image" 
                                            style="width: 520px;
                                                   height: auto; 
                                                   position: relative;" 
                                            alt="Textile image" />

                                    </div>

                                </div>

                                <div class="ruler-col-container"
                                     style="overflow:hidden;">
                                    <div class="myruler mt-1" style="display:none;"></div>
                                    <div class="second-ruler mt-1" style="display:none;"></div>
                                </div>

                            </div>

                            <div class="row">

                                <!-- All textile images thumbnail are presented here -->
                                <div class="col-12 mt-3 ml-4" 
                                     style="width:520px !important; flex-basis:initial;">  

                                    <nav aria-label="Page navigation example" 
                                         class="d-flex justify-content-center" 
                                          style="width:99.99%; max-width: 100%;">

                                        <ul class="pagination" style="overflow: scroll; overflow-y: hidden; width: 100%;">

                                            @forelse ( $textileImages as $textileImage )

                                                <li class="page-item textile-thumbnail"
                                                    data-scale-unit="{{ $textileImage -> scale_unit }}"
                                                    data-scale-value="{{ $textileImage -> scale_value }}" 
                                                    style="overflow:hidden; position:relative; min-width:6em; max-width:6em; max-height: 6em;">
                                                    <a class="page-link d-flex align-items-center" 
                                                        href="#"
                                                        style="width:99%; max-width:100%; height:99%; max-height:100%; position:relative;">
                                                    
                                                    <img src="{{ $textileImage -> name }}" 
                                                        alt="textile-image-{{ $loop->count }}" 
                                                        class="img-thumbnail"
                                                        style="width: 100%; position:relative;">

                                                    </a>
                                                </li>
                                                

                                            @empty

                                                <div class="alert alert-info"> You haven't uploaded any image yet. </div>

                                            @endforelse

                                        </ul>
                                    </nav>
                                
                                </div>

                            </div>
                        </div>

                    </div>
                  </div>

                  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"></div>
                  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"></div>
                </div>

              </div>

            </div>

        </div>

    </div>

</div>

@endsection