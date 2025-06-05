
class Globals
{
	constructor()
	{
		this.imageGroup = new ImageGroup();
	}

	static Instance()
	{
		if (Globals._instance == null)
		{
			Globals._instance = new Globals();
		}

		return Globals._instance;
	}
}
