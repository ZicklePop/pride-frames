import { writable } from 'svelte/store';
import type { Flag } from '$lib/constants/flags';

export const initialFlags: Flag[] = ['lgbtqia'];

export const flagsStore = writable(initialFlags);
export const flagProps = writable({
	blur: false,
	round: false,
	vertical: false
});
