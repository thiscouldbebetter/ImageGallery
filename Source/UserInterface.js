
class UserInterface
{
	static Instance()
	{
		if (UserInterface._instance == null)
		{
			UserInterface._instance = new UserInterface();
		}
		return UserInterface._instance;
	}

	buttonPlayAsAnimation_Clicked()
	{
		var imageGroup = Globals.Instance().imageGroup;
		var images = imageGroup.images;
		
		if (images.length == 0)
		{
			return;
		}

		var animationIsAlreadyInProgress =
			(this.timer != null);

		if (animationIsAlreadyInProgress)
		{
			clearInterval(this.timer);
			this.timer = null;
		}
		else
		{
			var d = document;
			var inputSecondsPerImage =
				d.getElementById("inputSecondsPerImage");
			var secondsPerImage =
				parseFloat(inputSecondsPerImage.value);
			var millisecondsPerImage =
				1000 * secondsPerImage;
			var selectImages = d.getElementById("selectImages");

			var imageToSelectIndex = 0;
			var userInterface = this;

			this.timer = setInterval
			(
				() =>
				{
					imageToSelectIndex++;
					if (imageToSelectIndex >= images.length)
					{
						imageToSelectIndex = 0;
					}
					var imageToSelect = images[imageToSelectIndex];

					selectImages.value = imageToSelect;
					imageGroup.imageSelect(imageToSelect);
					imageGroup.userInterfaceUpdate(userInterface);
				},
				millisecondsPerImage
			);
		}
	}

	inputFile_Changed(inputFile)
	{
		var files = inputFile.files;
		var imageGroup = Globals.Instance().imageGroup;
		var images = imageGroup.images;
		for (var i = 0; i < files.length; i++)
		{
			var file = files[i];
			var image = new Image2(file);
			var doAnyImagesWithNameAlreadyExist =
				images.some(x => x.name == image.name);
			if (doAnyImagesWithNameAlreadyExist == false)
			{
				images.push(image);
			}
			imageGroup.imageSelectByName(image.name);
			imageGroup.userInterfaceUpdate(this);
		}

		imageGroup.userInterfaceUpdate(this);
	}

	selectImages_Changed(selectImages)
	{
		var imageGroup = Globals.Instance().imageGroup;
		var imageToSelectName = selectImages.value;
		imageGroup.imageSelectByName(imageToSelectName);
		imageGroup.userInterfaceUpdate(this);
	}
}
