const getFavicon = async (url: string) => {
	const domain = new URL(url).hostname
	console.log(domain);
	const response = await fetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=32`)
	const blob = await response.blob()
	const objectURL = URL.createObjectURL(blob)
	return objectURL
}

export default getFavicon
