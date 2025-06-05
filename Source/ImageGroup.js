
class ImageGroup
{
	constructor(images)
	{
		this.images = images || [];
		this._imageSelectedIndex = 0;
	}

	imageSelect(imageToSelect)
	{
		if (imageToSelect != null)
		{
			var indexToSelect =
				this.images.indexOf(imageToSelect);
			this._imageSelectedIndex = indexToSelect
		}
	}

	imageSelectByName(value)
	{
		var imageToSelect =
			this.images.find(x => x.name == value);
		this.imageSelect(imageToSelect);
	}

	imageSelected()
	{
		return this.images[this._imageSelectedIndex];
	}

	userInterfaceUpdate(userInterface)
	{
		var d = document;

		var selectImages = d.getElementById("selectImages");
		selectImages.innerHTML = "";
		for (var i = 0; i < this.images.length; i++)
		{
			var image = this.images[i];
			var imageAsOption = d.createElement("option");
			imageAsOption.innerHTML = image.name;
			selectImages.appendChild(imageAsOption);
		}
		selectImages.selectedIndex = this._imageSelectedIndex;

		var imageSelected = this.imageSelected();
		imageSelected.userInterfaceUpdate
		(
			userInterface,
			(imageLoaded) =>
			{
				var divImageSelected =
					d.getElementById("divImageSelected");
				divImageSelected.innerHTML = "";
				divImageSelected.appendChild(imageLoaded.domElement);
			}
		);
	}
}
