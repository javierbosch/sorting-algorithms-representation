var c   = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.height=600;
c.width=1000;

const sample_size = 500;

var sample = [];

function randomSample(){
    sample = [];
    for (i=0;i<sample_size;i++){
        sample.push(Math.floor(Math.random() * c.height));
    }
    return sample;
}

function delay(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function clear(){
    ctx.clearRect(0, 0, c.width, c.height);
}

function draw_sample(target){
    clear();
    var bar_width = c.width/sample_size;
    for (i=0;i<sample_size;i++){
        draw_bar(sample[i],bar_width,i,target);
    }
}



function draw_bar(height,bar_width,index,target){
    if(index==target){
        ctx.fillStyle = "#4CAF50";
    }
    else{
        ctx.fillStyle = "#000";
    }
    ctx.fillRect(index*bar_width, c.height-height, bar_width, height);
}

function generate_sample(){
    sample=randomSample();
    draw_sample(sample,-1);
}

function selection_sort(){ 
    var n = sample.length; 
    for (i = 0; i < n-1; i++) { 
        var min_idx = i; 

        for (j = i+1; j < n; j++){
            if (sample[j] < sample[min_idx]){ 
                min_idx = j; 
            }
        }
  
        var temp = sample[min_idx]; 
        sample[min_idx] = sample[i]; 
        sample[i] = temp; 
    } 
} 
sample=randomSample();


function base(){
    var counter = 0;
    var i = setInterval(function(){
        // do your thing
    
        counter++;
        if(counter === 10) {
            clearInterval(i);
        }
    }, 200);
}

function swaps(i,j){
    var temp = sample[j]; 
    sample[j] = sample[i]; 
    sample[i] = temp;
}

function dis(){
    var n = sample_size;
    var i = 0;
    var outter_loop = setInterval(function(){
        var min_idx = i; 
        draw_sample(i);
        var j = i+1;
        var inner_loop = setInterval(function(){
            if (sample[j] < sample[min_idx]){ 
                min_idx = j; 
                console.log(min_idx);
            }        
            j++;
            if(j === n) {
                clearInterval(j);
            }
        }, 20);

        swaps(i,min_idx);   

        i++;
        if(i==n-1){
            clearInterval(outter_loop);
        }
    },10);
}

