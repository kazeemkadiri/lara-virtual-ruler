
    <div class="row align-content-start"  style="box-shadow: 1px 0px 0px grey; height:100vh;">
        <div class="col-12 pt-2">
            <h4> <span class="fa fa-home mr-3" aria-hidden='true'></span>  STORE </h4>
        </div>
        <div class="col-12">
            <!-- Search box -->
            <!-- <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-search"></i>
                    </div>
                </div>
                <input type="text" class="form-control" placeholder="Search" aria-label="Text input with checkbox">
            </div> -->
        </div>
        <div class="col-12">
            <!-- List of links -->
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="{{ route('product-catalog') }}">Catalog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('products') }}">Products</a>
                </li>
              
            </ul>
        </div>
    </div>
