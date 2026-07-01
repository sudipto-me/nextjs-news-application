import Link from 'next/link';

import { getAvailableNewsYears, getAvailableNewsMonths, getNewsForYear, getNewsForYearAndMonth, getAllNews } from '@/lib/news';
import NewsList from '@/lib/news-list';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';


async function FilteredNewsHeader({ year, month }) {
    let links = await getAvailableNewsYears();

    if (year && !month) {

        links = getAvailableNewsMonths(year);
    }

    if (year && month) {
        links = [];
    }

    const availableNewsYears = await getAvailableNewsYears();

    if (
        (year && !availableNewsYears.includes(year))
        ||
        (month
            &&
            !getAvailableNewsMonths(year).includes(month))
    ) {
        throw new Error('Wrong filter selected');
    }

    return (
        <header id="archive-header">
            <nav>
                <ul>
                    {links.map((link) => {
                        const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                        return (
                            <li key={link}>
                                <Link href={href}>{link}</Link>
                            </li>);
                    })}
                </ul>
            </nav>
        </header>
    );
}

async function FilteredNewsContent({ year, month }) {
    let news = [];

    if (year && !month) {
        news = await getNewsForYear(year);
    }

    if (year && month) {
        news = await getNewsForYearAndMonth(year, month)
    }

    let newsContent = <p>No news available for this selected options</p>;

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />;
    }

    return newsContent;

}



export default async function FilteredNewsPage({ params }) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];
    return (
        <>
            <Suspense fallback={<p>Loading news....</p>} >
                <FilteredNewsHeader year={selectedYear} month={selectedMonth} />
                <FilteredNewsContent year={selectedYear} month={selectedMonth} />
            </Suspense>
        </>
    );
}