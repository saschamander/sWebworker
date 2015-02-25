self.addEventListener('message', function(e) {
    var data = e.data;
    var zahl = Math.pow(2, data.potenz);
    var sum = 0;
    var percent = 0;
    var current = 1;
    
    for(var i=0; i < zahl; i++){
        sum += i;
        percent = Math.floor((i+1) / zahl * 100);
        if(percent == current){            
            self.postMessage({'percent': percent, 'msg':''});
            current++;
        } 
    }
     self.postMessage({'msg': 'Finished successfully. \t Sum: '+sum});
}, false);