class Share {
	subject: string
	text: string
	href: string
	image: string
	twitter: string
	html: string
	avatar?: string
	snapchat: string
	constructor(
		subject: string,
		text: string,
		href: string,
		image: string,
		twitter: string,
		html: string,
		snapchat: string,
		avatar?: string
	) {
		this.subject = subject
		this.text = text
		this.href = href
		this.image = image
		this.twitter = twitter
		this.html = html
		this.snapchat = snapchat
		this.avatar = avatar
	}
}

export default Share
