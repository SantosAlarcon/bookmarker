import styles from "./page.module.css"
import Header from "@/components/Header/Header"
import BookmarksView from "@/components/BookmarksView/BookmarksView"

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <BookmarksView />
    </div>
  )
}
