import flags from '$lib/constants/flags';
import type { Flag } from '$lib/constants/flags';

export function cssGradient(type: string, angle = 45) {
	const colors = flags[type as Flag];
	const stripes = colors.length || 0;
	const increment = 100 / stripes;
	const css = colors
		.map(
			(color, i) =>
				`${color} ${Math.ceil(increment * i)}%, ${color} ${Math.ceil(increment * (i + 1))}%${
					stripes === i + 1 ? '' : ', '
				}`
		)
		.join('');
	return `linear-gradient(${angle}deg, ${css})`;
}
