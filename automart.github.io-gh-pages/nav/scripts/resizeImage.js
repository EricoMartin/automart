let resizeImage = ()=> ({
    const fileImage = document.getElementById("img_div1").value;
    
    if(fileImage.type.match(/image.*/)){
        
        let read = new FileReader();
        read.onload =(readerEvent)=>{
            let image = new Image();
            image.onload =(imageEvent)=>{
            let canvas = document.createElement('canvas');
                const MAX_SIZE = [140, 180];
                let height = MAX_SIZE[0];
                let width = MAX_SIZE[1];
                if(image.height > height){
                    image.height = height;
                }
                if(image.width > width){
                    image.width = width;
                }
                canvas.height = height;
                canvas.weight = weight;
                document.getElementById("img_div1").getContext('2d').drawImage(image,0,0,width,height);
                let dataUrl = canvas.toDataURL('image/jpeg');
                return dataURItoBlob(dataUrl);
            }
            
        image.src = readerEvent.target.result;
      
      reader.readAsDataURL(file);
        }
    }
});

resizeImage(src);

   const obj = {inputUser, carMake, carModel, carPrice, carState};
    let blob = new Blob(obj), (type:"text/plain", charset=utf-8*));
    saveAs(Blob, obj);
    
    window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, SaveDataFile);
    function SaveDataFile(localstorage) {
  localstorage.root.getFile("info.txt", {create: true});
        function(DatFile) {
    DatFile.createWriter(function(DatContent) {
      DatContent.write(blob);
    });
    }