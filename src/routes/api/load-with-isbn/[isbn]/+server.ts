import type { RequestHandler } from "./$types";
import { type Book } from "$lib/data.svelte";
import * as cheerio from "cheerio";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
	const isbn = params.isbn;

	return json(await getBookData(isbn));
};

async function getBookPage(isbn: string): Promise<string> {
	const response = await fetch(
		`https://www.goodreads.com/search?query=${isbn}`
	);

	if (!response.ok) {
		console.error(`Failed to fetch : ${response.status}`);
	}

	return await response.text();
}

async function getBookData(isbn: string): Promise<Book> {
	const $ = cheerio.load(await getBookPage(isbn));

	const title = $(".BookPageTitleSection__title h1")?.text();

	const author = $(".BookPageMetadataSection__contributor")
		?.text()
		?.split(",")[0]
		?.trim();

	const coverImg = $(".BookCover img")?.attr("src")!;

	const pageNumber = $(".FeaturedDetails")?.text()?.split("pages")[0]?.trim();

	return {
		isbn: Number(isbn),
		title,
		author,
		coverImg,
		pageNumber: Number(pageNumber),
	};
}
