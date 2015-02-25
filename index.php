<!DOCTYPE html>
<html>
<head>
    <title>Subdirectories</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <!-- Latest compiled and minified JavaScript -->
    <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <style>
            .wrapper{
                    margin: 50px;
            }

            .list-group-item:before{
                content:"\f09c";
                display: inline-block;
                font-family: "FontAwesome";
                margin: 0px 10px 0px 20px;
            }

            .list-group-item.private:before{
                content:"\f023";
                display: inline-block;
                font-family: "FontAwesome";
                margin: 0px 10px 0px 20px;
            }

            .list-group-item.active a{
                color: #ffffff;
            }
            
            .list-group-item.active:before{
                content:"\e250";
                display: inline-block;
                font-family: "Glyphicons Halflings";
                font-size: 10px;
                margin: 0 5px 0 0;
            }
    </style>
<head>
<body>
	<div class="wrapper well well-lg">
            <?php 
            printSubdirectories(); 
            ?>
	</div>
</body>
</html>

<?php
	function printSubdirectories(){
            $dirs = array_filter(glob('*'), 'is_dir');
            echo '<ul class="list-group">';
            printBreadcrumb(); 
            foreach ($dirs as $dir) {                                        
                $private = isFolderPrivate($dir);                    
                $out = '<li class="list-group-item';                    
                if($private){$out .= ' private';}
                $out .= '"><a href="' . $dir . '">' . ucfirst ( $dir ) . ' </a>';
                $out .= '</li>';
                echo $out;
            }
            echo "</ul>";
	}
	
	function getCurrentDirectory(){
            $curDirPath = getcwd();
            $curDirPath = substr($curDirPath, strrpos($curDirPath, '/'));
            return $curDirPath;
	}
        
        function printBreadcrumb(){
            $crumbs = array_filter(explode("/", $_SERVER["REQUEST_URI"]));            
            $link = "http://" . $_SERVER["SERVER_NAME"];           
            echo '<ol class="list-group-item breadcrumb active">';
            echo '<li><a href="' . $link . '">'. $link .'</a></li>';            
            foreach($crumbs as $crumb){
                if(!empty($crumb)){
                    $link .= "/" . $crumb;
                    echo '<li>';
                    echo '<a href="' . $link .'">';
                    echo ucfirst(str_replace(array(".php","_"),array(""," "), $crumb) . ' ');
                    echo '</a>';
                    echo '</li>';
                }
            }
            echo '</ol>';
	}
        
        function isFolderPrivate($dir){
            $private = false;
           
            if($dir = opendir($dir)) {
                while(!$private && ($file = readdir($dir)) !== false) {
                    $private = $file === ".htaccess" && $file !== "..";
                }    
            }
            closedir($dir);
            return $private;
        }
    ?>