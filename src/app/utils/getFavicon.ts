"use server"
const getFavicon = async (url: string) => {
	const domain = new URL(url).hostname
	const response = await fetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=32`)
	return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=32`
}

export default getFavicon
