const dateFormatter = new Intl.RelativeTimeFormat("fr");

export function relativeDateFormatter(date: number): string {
	const today = new Date();
	const diff =
		Date.parse(
			`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
		) - date;
	let formatted = "";

	if (diff / (1000 * 60 * 60 * 24 * 31 * 12) > 1) {
		formatted = dateFormatter.format(
			Math.floor(-diff / (1000 * 60 * 60 * 24 * 31 * 12)),
			"year"
		);
	} else if (diff / (1000 * 60 * 60 * 24 * 31) > 1) {
		formatted = dateFormatter.format(
			Math.floor(-diff / (1000 * 60 * 60 * 24 * 31)),
			"month"
		);
	} else if (diff / (1000 * 60 * 60 * 24) > 1) {
		formatted = dateFormatter.format(
			Math.floor(-diff / (1000 * 60 * 60 * 24)),
			"day"
		);
	} else {
		formatted = "aujourd'hui";
	}

	return formatted;
}
