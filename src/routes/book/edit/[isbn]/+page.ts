import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	return {
		isbn: Number(params.isbn),
	};
};
