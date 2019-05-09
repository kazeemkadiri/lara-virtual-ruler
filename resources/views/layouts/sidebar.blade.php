
    <div class="row">
        <div class="col-12">
            <h2> <i class="fa fa-store" aria-hidden='true'></i>  STORE </div>
        </div>
        <div class="col-12">
            <!-- Search box -->
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-search"></i>
                    </div>
                </div>
                <input type="text" class="form-control" placeholder="Search" aria-label="Text input with checkbox">
            </div>
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
