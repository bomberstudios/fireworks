SymbolController = function() {
  this.init();
};
SymbolController.prototype.init = function(){
  this.listeners = new Array();
};
SymbolController.prototype.broadcastMessage = function(eventName,params){
  alert("SymbolController.broadcastMessage");
  alert(params);
};
SymbolController.prototype.addListener = function(obj){
  alert("SymbolController.addListener");
  this.listeners.push(obj);
  alert(this.listeners);
};
