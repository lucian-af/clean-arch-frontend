import { IHttpPostClient } from 'data/protocols/http/http-post-client';

export class RemoteAuthentication {
	constructor(private readonly url: string, private readonly httpClient: IHttpPostClient){}

	async auth(): Promise<void>{
		await this.httpClient.post(this.url);		
	}
}