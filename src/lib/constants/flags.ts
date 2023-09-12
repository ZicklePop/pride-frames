export const transgender = ['#5bcefa', '#f5a9b8', '#ffffff', '#f5a9b8', '#5bcefa'];
export const pansexual = ['#ff218c', '#ffd800', '#21b1ff'];
export const lesbian = ['#d52d00', '#ff9a56', '#ffffff', '#d362a4', '#a30262'];
export const nonbinary = ['#fff430', '#ffffff', '#9c59d1', '#000000'];
export const lgbtqia = [
	'#000000',
	'#784f17',
	'#e40303',
	'#ff8c00',
	'#ffed00',
	'#008026',
	'#004dff',
	'#750787'
];
export const agender = [
	'#000000',
	'#b9b9b9',
	'#ffffff',
	'#b8f483',
	'#ffffff',
	'#b9b9b9',
	'#000000'
];
export const aromantic = ['#3da542', '#a7d379', '#ffffff', '#a9a9a9', '#000000'];
export const asexual = ['#000000', '#a3a3a3', '#ffffff', '#800080'];
export const bisexual = ['#d60270', '#d60270', '#9b4f96', '#0038a8', '#0038a8'];
export const genderfluid = ['#ff75a2', '#ffffff', '#be18d6', '#000000', '#333ebd'];
export const genderqueer = ['#b57edc', '#ffffff', '#4a8123'];
export const hatsunemiku = ['#4ec4c6', '#8be8e0', '#fffbee', '#fac3dd', '#f14f9b'];
export const intersex = ['#ffd800', '#7902aa'];
export const polysexual = ['#f61cb9', '#07d569', '#1c92f6'];
export const abrosexual = ['#65c286', '#b4e4cc', '#ffffff', '#e796b7', '#d9446e'];
export const demisexual = ['#ffffff', '#ffffff', '#810081', '#a4a4a4', '#a4a4a4'];
export const graysexual = ['#740195', '#b2b2b2', '#ffffff', '#b2b2b2', '#740195'];
export const gaymen = ['#078d70', '#26ceaa', '#99e8c2', '#ffffff', '#7bade3', '#5049cb', '#3e1a78'];
export const omnisexual = ['#ff9bcd', '#ff53be', '#250046', '#675fff', '#8ca5ff'];
export const aroace = ['#e28c00', '#eccd00', '#ffffff', '#62aedc', '#203856'];
export const demiromantic = ['#ffffff', '#ffffff', '#349833', '#c8c8c8', '#c8c8c8'];
export const polyamory = ['#009fe3', '#e50051', '#340c46'];
export const bigender = [
	'#c479a2',
	'#eda5cd',
	'#d5c7e8',
	'#ffffff',
	'#d5c7e8',
	'#9ac7e8',
	'#6d82d1'
];
export const demiboy = [
	'#7f7f7f',
	'#c4c4c4',
	'#9ad9eb',
	'#ffffff',
	'#9ad9eb',
	'#c4c4c4',
	'#7f7f7f'
];
export const demigirl = [
	'#7f7f7f',
	'#c4c4c4',
	'#ffaec9',
	'#ffffff',
	'#ffaec9',
	'#c4c4c4',
	'#7f7f7f'
];
export const pangender = [
	'#fff798',
	'#feddcc',
	'#ffebfc',
	'#ffffff',
	'#ffebfc',
	'#feddcc',
	'#fff798'
];
export const queer = [
	'#000000',
	'#8ad1e5',
	'#1290e3',
	'#a9e619',
	'#ffffff',
	'#fec011',
	'#fa4e54',
	'#fd9bbe',
	'#000000'
];

export const flags = {
	abrosexual,
	agender,
	aroace,
	aromantic,
	asexual,
	bigender,
	bisexual,
	demiboy,
	demigirl,
	demiromantic,
	demisexual,
	gaymen,
	genderfluid,
	genderqueer,
	graysexual,
	hatsunemiku,
	intersex,
	lesbian,
	lgbtqia,
	nonbinary,
	omnisexual,
	pangender,
	pansexual,
	polyamory,
	polysexual,
	queer,
	transgender
};

export default flags;

export type Flag = keyof typeof flags;
