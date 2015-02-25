self.addEventListener('message', function(e) {
    var data = e.data;
    var workerId = data.id;
    var start = data.start;
    var end = data.end;
    var sum = 0;
    var percent = 0;
    var current = 1;
    
    //console.log(workerId+":"+current)
    
    
    // Optimizing the algorithm
    
    for(var i=start; i < end; i++){
        sum += i;
        percent = Math.floor((i+1-start) / (end-start) * 100);
		
        if(percent == current){            
            self.postMessage({"id":workerId,'percent': percent, 'msg':''});
            current++;
        } 
    }
    self.postMessage({"id":workerId ,'sum': sum});
}, false);