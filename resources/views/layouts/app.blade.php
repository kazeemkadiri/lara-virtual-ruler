<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/file-upload.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery.ui.ruler.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/qosim-styles.css') }}" rel="stylesheet"> 
</head>
<body>
    

    @yield('content')

    
    <script src="{{ asset('js/jquery-3.3.1.slim.min.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/file-upload.js') }}"></script>
    
    <script src="{{ asset('js/jquery-ui.min.js') }}"></script>

    <script src="{{ asset('js/jquery.ui.ruler.js') }}"></script>
    <script src="{{ asset('js/jquery-initialize.min.js') }}"></script>
    <script src="{{ asset('js/qosim-script.js') }}"></script>
    
   

</body>
</html>
