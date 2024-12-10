export default function encodeSVG(svg) {
	const encoded = encodeURIComponent(svg)
		.replace(/'/g, '%27')
		.replace(/"/g, '%22')

	return `url("data:image/svg+xml,${encoded}")`
}
