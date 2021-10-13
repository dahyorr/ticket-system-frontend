export const generateStatusColor = (status) => {
	if(!status) return ''
	switch (status.toLowerCase()) {
		case "closed":
			return "green";
		case "very low":
			return "#c2bd3e";
		case "open":
			return "#999428";
		case "low":
			return "#F1BC31";
		case "normal":
			return "#E25822";
		case "high":
			return "#7C0A02";
		case "critical":
			return "#B22222";
        default:
            return 'black'
	}
}