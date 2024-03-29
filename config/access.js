const ROLE_PERMISSIONS = {
	USER: 'USER',
	ADMIN: 'ADMIN',
	PREMIUM: 'PREMIUM',
	PUBLIC: 'PUBLIC',
};
  
const PUBLIC_ACCESS = [ROLE_PERMISSIONS.PUBLIC];
const PRIVATE_ACCESS = [
	ROLE_PERMISSIONS.USER,
	ROLE_PERMISSIONS.ADMIN,
	ROLE_PERMISSIONS.PREMIUM,
];

const ADMIN_ACCESS = [ROLE_PERMISSIONS.ADMIN];
const CARTS_ACCESS = [ROLE_PERMISSIONS.USER, ROLE_PERMISSIONS.PREMIUM, ROLE_PERMISSIONS.ADMIN ];
const PREMIUM_ACCESS = [ROLE_PERMISSIONS.PREMIUM, ROLE_PERMISSIONS.ADMIN];
const PRODUCT_PREMIUM = [ROLE_PERMISSIONS.PREMIUM];

export {
	ROLE_PERMISSIONS,
	PUBLIC_ACCESS,
	PRIVATE_ACCESS,
	ADMIN_ACCESS,
	PREMIUM_ACCESS,
	CARTS_ACCESS,
	PRODUCT_PREMIUM,
};