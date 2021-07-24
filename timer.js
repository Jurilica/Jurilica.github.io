export let Timer = function(){        
    this.Interval = 1000;
    this.Enable = false;
    this.Tick;
    let thisObject;
    this.startTime;
    this.Start = () => {
        this.startTime = new Date();
        this.Enable =true;
 
        thisObject = this;
        if (thisObject.Enable)
        {
            thisObject.timerId = setInterval(() =>{
                thisObject.Tick(); 
            }, thisObject.Interval);
        }
    };
    this.Stop = () => {            
        thisObject.Enable = false;
        clearInterval(thisObject.timerId);
    };
 
};