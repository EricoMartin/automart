let upload =()=>{
	const inputUser =document.getElementById("username").value;
	const carMake = document.getElementById("make").value;
	const carModel = document.getElementById("model").value;
	const carPrice = document.getElementById("price").value;
	const carState = document.getElementById("select").value;
	const carImage = document.getElementById("carimage").value;
    

	document.getElementById("displayCarItem").innerHTML = inputUser +
	", You Have Successfully Uploaded Your Car Details" + "," + "Manufacturer : " +
	  carMake + "," + "Model : " + carModel +"," + " Price : " + carPrice + "," + 
	  " State of Car : " + carState + "," + carImage;
	  alert("Uploaded Successfully: " +inputUser+", "+carMake+", "+carModel+", "+carPrice+", "+carState);

var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query;

var preloaded_file = new cloudinary.PreloadedFile(query.image_id);
if (preloaded_file.is_valid()) {
  photo.image_id = preloaded_file.identifier();
} else {
  throw("Invalid upload signature");
}
}
 



