/**
 * Reservation model
 */
export default class Container {

	constructor(name, volume, virtualhost, httpPort, httpsPort, imageName ) {
		this.name = name;
		this.volume = volume;
		this.virtualhost = virtualhost;
		this.httpPort = httpPort;
		this.httpsPort = httpsPort;
		this.imageName = imageName;
	}

	/**
	 *
	 * @param container
   */
	static fromObject(container){
		return new Container(
			container.name,
			container.volume,
			container.virtualhost,
			container.httpPort,
			container.httpsPort,
			container.imageName
		);
	}
}
