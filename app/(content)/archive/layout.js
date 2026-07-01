export default function ArchiveLayoutPage({ archive, latest }) {
    return (
        <>
            <h1>News Archive</h1>
            <div id="archive-filter">
                {archive}
            </div>
            <div id="archive-latest">
                {latest}
            </div>
        </>
    );
}