// snowfall stop
 $(document).snowfall("clear");
        
// jQueryのsnowfall
 $(document).ready(function(){
        $(document).snowfall({
            maxSpeed :  5,  // 最大速度
            minSpeed : 1,   // 最小速度
            maxSize : 20,   // 最大サイズ
            minSize : 1,    // 最小サイズ
            image : "img/snowflake.png"
        });
 });

 