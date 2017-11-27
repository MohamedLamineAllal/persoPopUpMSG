// properties is an object ==> {centred: true,popUp_styleClass:["class1","class2"],popUpContainer_styleClass: ["class1","class2"],DomElementToAppendTo: DOMobj,DomElementToGetOnTopOfIt:DOMobj,id:"",animationClass:{show : "", hide : ""},buttonClass : ""}, blackBackground : true, position: {top: "20px",left: "css values"}

var popUp_msg_onclickHandler = null;

function popUp_msg(message,properties){

    var body = $("body");

    var popUpObject = $(document.createElement("div"));
    popUpObject.addClass("popUpObject");

    var popupContainer = $(document.createElement("div"));
    popupContainer.addClass("popUpMsg_Container");

    var popUp = $(document.createElement("div"));
    popUp.addClass("popUp_msg");
    popUp.addClass("popupsMsg_closeButton1"); // !!!!!!
    popUp.html(message);
    popupContainer.append(popUp);

    var closeButton = $(document.createElement("div"));
    closeButton.addClass("closeButton__");
    popUp.append(closeButton);
    popUpObject.append(popupContainer);

    popupContainer.addClass("ppuo_horizentalAlignCentering");

    popUp.addClass("__top5vh");

    if(properties.blackBackground){
       /* var black_background =  $(document.createElement("div"));
        black_background.addClass("popupMsg_blackBackground");
        popUpObject.append(black_background);
        popUpObject.append(popupContainer);*/
       popUpObject.addClass("popUpObject_blackBackground");
    }
    else{
        popUpObject.addClass("ppuo_noPointerEvent");
    }
    /*else{ // the order of appending is important, to allow popUp to be above blackBackrground
         popUpObject.append(popupContainer);
    }*/

    if(properties.popUp_styleClass){
        properties.popUp_styleClass.forEach(function (className) {
            if(!(popUp.hasClass(className))){
                popUp.addClass(className);
            }
        });
    }

    if(properties.popUpContainer_styleClass){
        properties.popUpContainer_styleClass.forEach(function (className) {
            if(!(popupContainer.hasClass(className))){
                popupContainer.addClass(className);
            }
        });
    }

    if(properties.id){
       popUp.attr("id",properties.id) ;
    }

    if(properties.centred){
        popupContainer.addClass("popupsMsgContainer_centered");
        popupContainer.addClass("ppuo_horizentalAlignCentering");
        popupContainer.addClass("ppuo_verticalAlignCentering");
        popupContainer.addClass("__relativePosition");

        popUp.removeClass("__top5vh");

        body.append(popUpObject);
    }
    else{
        if(properties.DomElementToGetOnTopOfIt){
            alert("DomElementToGetOnTopOfIt");
            popupContainer.addClass("__absolutePosition");
            var ElementToGetOnTopOfIt = $(properties.DomElementToGetOnTopOfIt);
            positione_absoluteToParrentCOntainer_toElement_doc(popupContainer,ElementToGetOnTopOfIt,0,0);
            popUp.addClass("__leftAuto"); // we can change that with a css class if it pose problem with css class we add
            popupContainer.removeClass("ppuo_horizentalAlignCentering");
            popUp.removeClass("__top5vh");
            body.append(popUpObject);
        }
        else{
            if(properties.DomElementToAppendTo){
                alert("DomElementToAppendTo");
                var  elementToAppendTo = $(properties.DomElementToAppendTo);

                if(properties.position){
                    popupContainer.addClass("__absolutePosition");
                    popUp.removeClass("__top5vh");
                    for( var positionSide in properties.position){
                        popupContainer.css(positionSide,properties.position[positionSide]); // top left ...  the set one
                    }

                    if(!propertyExistInObject(properties.position,"top")){
                        popupContainer.css("top","auto");
                    }
                    if(!propertyExistInObject(properties.position,"bottom")){
                        popupContainer.css("bottom","auto");
                    }
                    if(!propertyExistInObject(properties.position,"left")){
                        popupContainer.css("left","auto");
                    }
                    if(!propertyExistInObject(properties.position,"right")){
                        popupContainer.css("right","auto");
                    }

                    //popUp.css("left","auto");
                    popupContainer.removeClass("ppuo_horizentalAlignCentering");
                }
                else{
                    popupContainer.addClass("__relativePosition");
                    popUp.removeClass("__top5vh");
                    popUp.addClass("__top20px");
                }

                elementToAppendTo.append(popupContainer);
            }
            else{
                if(properties.position){
                    popupContainer.addClass("__absolutePosition");
                    popUp.removeClass("__top5vh");
                    for( var positionSide in properties.position){
                       popupContainer.css(positionSide,properties.position[positionSide]); // top left ...  the set one
                    }

                    if(!propertyExistInObject(properties.position,"top")){
                        popupContainer.css("top","auto");
                    }
                    if(!propertyExistInObject(properties.position,"bottom")){
                        popupContainer.css("bottom","auto");
                    }
                    if(!propertyExistInObject(properties.position,"left")){
                        popupContainer.css("left","auto");
                    }
                    if(!propertyExistInObject(properties.position,"right")){
                        popupContainer.css("right","auto");
                    }

                    //popUp.css("left","auto");
                    popupContainer.removeClass("ppuo_horizentalAlignCentering");
                }
                body.append(popUpObject);
            }
        }
    }


    if(properties.buttonClass){
      popUp.addClass(properties.buttonClass);
    }

    if(properties.animationClass.show){
        popUp.addClass("popupMsg_hide");
        setTimeout(function () {
            popUp.addClass(properties.animationClass.show);
        },20);


       setTimeout(function () {
            if(properties.animationClass.hide){
                popUp.removeClass("popupMsg_hide");
                popUp.addClass(properties.animationClass.hide);
            }
        },500);
    }

    body.off("click",".popUp_msg>.closeButton__",closeMsgWindow);
    body.on("click",".popUp_msg>.closeButton__",{properties : properties},closeMsgWindow);
}


function closeMsgWindow(event) {
    //alert("hi close");
    var closeButtons = $(".popUp_msg>.closeButton__");
    var target = getEventTarget(event);

    var showClass = event.data.properties.animationClass.show;
    var hideClass = event.data.properties.animationClass.hide;

    for(var i =0; i < closeButtons.length; i++){
        if(is_containedIn_OrEqual(target,closeButtons.get(i))){
            var popUp =  closeButtons.eq(i).parent().eq(0);
            var popUpObject = popUp.parent().eq(0).parent().eq(0);
           /* var blackBackground = popUpContainer.find(".popupMsg_blackBackground").eq(0);*/

            /*blackBackground.remove();*/
            popUpObject.removeClass("popUpObject_blackBackground");
            setTimeout(function(){
                popUp.removeClass(showClass);

                popUp.addClass(hideClass);

                 setTimeout(function () {
                     popUpObject.remove();
                 },500);
            },20);


            break;
        }
    }
}








/*Positioning functions */

function positione_absolute_toElement_doc(element,ElementToPoseTo,add_topOffset,add_leftOffset){
    element = $(element);
    ElementToPoseTo = $(ElementToPoseTo);
    var ElementToPoseTo_offset = ElementToPoseTo.offset();

    element = element.detach();
    $("body").append(element);

    element.css("position","absolute");
    element.css("top",(ElementToPoseTo_offset.top+add_topOffset).toString()+"px");
    element.css("left",(ElementToPoseTo_offset.left+add_leftOffset).toString()+"px");
}


function positione_absoluteToParrentCOntainer_toElement_doc(element,ElementToPoseTo,add_topOffset,add_leftOffset){
    element = $(element);
    ElementToPoseTo = $(ElementToPoseTo);
    var ElementToPoseTo_offset = ElementToPoseTo.offset();

    element.css("position","absolute");
    element.css("top",(ElementToPoseTo_offset.top+add_topOffset).toString()+"px");
    element.css("left",(ElementToPoseTo_offset.left+add_leftOffset).toString()+"px");
}




function multiPopUpsFromArrayList(theArray,properties){
    for(var i = 0; i < theArray.length; i++){
        popUp_msg(theArray[i],properties);
    }
}





function propertyExistInObject(object,property){
    for(var propertyName in object){
        if(propertyName === property){
            return true;
        }
    }
    return false;
}





/***********Object length calculation function***********/
function objectLength(object){
    var counter = 0;
    if(Object.keys){
        counter = Object.keys(object).length;
    }
    else {
        for (var propertyName in object) {
            if (object.hasOwnProperty(propertyName)) {
                counter++;
            }
        }
    }

    return counter;
}