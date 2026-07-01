'use client';

export default function FilterSelectionError({ error }) {
    return (
        <div id="error">
            <h1>Wrong Selection</h1>
            <p>{error.message}</p>
        </div>
    );
}