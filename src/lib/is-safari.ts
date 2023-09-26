export const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
	typeof navigator !== 'undefined' ? navigator.userAgent : ''
);
