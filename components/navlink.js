'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
    const pathName = usePathname();
    return (
        <li>
            <Link href={href} className={href == pathName ? 'active' : undefined}>{children}</Link>
        </li>
    );
}