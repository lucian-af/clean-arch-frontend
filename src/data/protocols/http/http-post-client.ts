import { HttpResponse } from '.';

export type HttpPostParams<T> = {
	url: string;
	body: T;
}

export interface IHttpPostClient<T,R> {
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>
}