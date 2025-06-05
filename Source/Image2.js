
class Image2
{
	constructor(file)
	{
		this.name = file.name;
		this.file = file;
	}

	userInterfaceUpdate(userInterface, callback)
	{
		var image = this;

		var fileReader = new FileReader();
		fileReader.onload = (event) =>
		{
			var d = document;
			var domElement = d.createElement("img");
			domElement.style.border = "1px solid";
			domElement.src = event.target.result;
			image.domElement = domElement;
			callback.call(userInterface, image);
		}
		fileReader.readAsDataURL(this.file);
	}
}
