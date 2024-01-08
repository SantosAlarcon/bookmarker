import styles from "./page.module.css"
import Header from "@/components/Header/Header"
import BookmarksView from "@/components/BookmarksView/BookmarksView"
import modalVisibilityProvider from "@/providers/modalVisibility"

export default function Home() {	
	return (
		<modalVisibilityProvider>
			<div className={styles.main}>
				<Header />
				<BookmarksView />
			</div>
		</modalVisibilityProvider>
	)
}
