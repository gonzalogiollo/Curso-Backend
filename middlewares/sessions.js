export const privateAccess = (req, res, next) => {
	if (!req.session?.user) {
		return res.redirect('/login');
	} else {
		next();
	}
	};
export const publicAccess = (req, res, next) => {
	if (req.session?.user) {
		return res.redirect('/products');
	} else {
		next();
	}
};
