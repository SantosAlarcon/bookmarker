const getFavicon = async (url: string) => {
	const domain = new URL(url).hostname
	/*const response = await fetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=32`)
	const blob = await response.blob()
	const objectURL = URL.createObjectURL(blob)*/
	return `${url}/favicon.ico`
}

export default getFavicon
