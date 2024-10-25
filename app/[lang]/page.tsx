import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";

async function Home(props: {params: Promise<{lang: string}>}) {
    const params = await props.params;

    const {
        lang
    } = params;

    return (
        <div className={styles.main}>
            { /* @ts-ignore */ }
            <Header lang={lang} />
            <BookmarksView />
        </div>
    );
}

export default Home;

