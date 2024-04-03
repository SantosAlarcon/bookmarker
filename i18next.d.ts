import "react-i18next"

// import all namespaces (for the default language, only)
import common from "./public/locales/en/common.json"
import login from "./public/locales/en/login.json"

declare module "react-i18next" {
	interface CustomTypeOptions {
		resources: {
			common: typeof common
			login: typeof login
		}
	}
}
