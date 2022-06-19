export async function handle({ event, resolve }) {
	event.locals.lang = event.request.headers['accept-language'] || 'en';

	const response = await resolve(event);

	return response;
}

export async function getSession({ locals }) {
	return {
		lang: locals.lang,
		user: locals.user
	};
}
