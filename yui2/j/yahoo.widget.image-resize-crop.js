/**
 *
 * ImageResizeCrop
 * <p>Usage: YAHOO.util.ImageResizeCrop.init(YAHOO.util.Dom.getElementsByClassName('yibs-thumb-cont', 'span', this.oPanel), 1, 'trueCentre', 'yibs-thumb-cont-complete');</p>
 * @class ImageResizeCrop
 * @namespace YAHOO.util.ImageResizeCrop
 * @param {HTMLCollection} aImageConts (required) array or HTMLCollection of dom nodes to act upon
 * @param {Boolean} bResize (required) should the images be resized to best fit into container
 * @param {String/Funtion} posMethod (required) which method should be used for positioning the image inside its container ('trueCentre', 'horizontalCentre', 'verticalCentre' or a custom method)
 * @param {String} completeClass (required) className to apply to container once sizing is applied (useful for hiding images until resized)
 */
YAHOO.util.ImageResizeCrop = {
    
    init : function(aImageConts, bResize, posMethod, completeClass){
        for(var i=0, j=aImageConts.length; i<j; i++){ 
            this.imageReady(aImageConts[i], bResize, posMethod, completeClass);
        }
    },
    
    imageReady : function(imgCont, bResize, posMethod, completeClass){
        var img = imgCont.getElementsByTagName('img')[0];
        var width, height;
        if(img.complete){
            // get dimensions of parent (may be an anchor between container and img)
            width       = parseInt(YAHOO.util.Dom.getStyle(img.parentNode, 'width'), 10);
            height      = parseInt(YAHOO.util.Dom.getStyle(img.parentNode, 'height'), 10);
            var size    = [img.getAttribute("width"), img.getAttribute("height")];
            if(bResize){
                size    = this.getMaxSize(size[0], size[1], width, height);
                img.width   = size[0];
                img.height  = size[1];
            }
            var pos = (this[posMethod] || posMethod).apply(this, [size[0], size[1], width, height]);
            YAHOO.util.Dom.setStyle(img, 'marginLeft', pos[0]);
            YAHOO.util.Dom.setStyle(img, 'marginTop', pos[1]);
            YAHOO.util.Dom.addClass(imgCont, completeClass);
            
        }else{
            YAHOO.lang.later(50, this, arguments.callee, [].slice.call(arguments,0));
        }
    },
    
    trueCentre : function(w, h, maxW, maxH){
        return [-parseInt((w - maxW)/2, 10) + 'px', -parseInt((h - maxH)/2, 10) + 'px'];        
    },
    
    horizontalCentre : function(w, h, maxW, maxH){
        return [-parseInt((w - maxW)/2, 10) + 'px', 0 + 'px'];     
    },
    
    verticalCentre : function(w, h, maxW, maxH){
        return [0, -parseInt((h - maxH)/2, 10) + 'px'];
    },
    
    getMaxSize : function(imgW, imgH, maxW, maxH){
        var height, width;
        if(imgW > imgH){
            height = parseInt(imgH/imgW*maxW, 10);
            width = maxW;
            if(height < maxH){
                height = maxH;
                width = imgW/imgH * maxH;
            }
        }else{
            height = maxW;
            width = parseInt(imgW/imgH*maxH, 10);
            if(width < maxW){
                width = maxW;
                height = imgH/imgW * maxW;
            }
        }
        return [width, height];
        
    }
};
