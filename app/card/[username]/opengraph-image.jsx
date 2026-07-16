import { ImageResponse } from 'next/og';
import { getDeveloper } from '@/lib/github';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }) {
    const { username } = await params;
    const developer = await getDeveloper(username);
    const name = developer?.name ?? username;
    const rating = developer?.rating ?? '—';
    const language = developer?.languages?.[0]?.name ?? 'GitHub';
    const avatar = developer?.avatar;
    return new ImageResponse(<div tw="flex h-full w-full flex-col bg-[#13070a] p-14 text-[#fff7ee]" style={{ backgroundImage: 'radial-gradient(circle at 82% 14%, rgba(226, 179, 78, 0.25), transparent 25%), linear-gradient(145deg, #35141b, #13070a 62%)' }}><div tw="flex items-center justify-between text-[20px] uppercase" style={{ letterSpacing: 7, color: '#e1ad4b' }}><span>GitScout</span><span>Public GitHub profile</span></div><div tw="flex flex-1 items-center justify-between"><div tw="flex flex-col"><span tw="text-[20px] uppercase" style={{ letterSpacing: 6, color: '#e1ad4b' }}>Rated out of 99</span><span tw="mt-3 text-[180px] font-bold leading-none" style={{ color: '#f1ce7f' }}>{rating}</span><span tw="text-[34px] font-bold">{name}</span><span tw="mt-3 text-[24px]" style={{ color: '#e1ad4b' }}>@{developer?.login ?? username} · {language}</span></div>{avatar ? <img src={avatar} width="190" height="190" tw="rounded-full border-4" style={{ borderColor: '#e1ad4b' }} /> : <div tw="flex h-[190px] w-[190px] items-center justify-center rounded-full text-[72px] font-bold" style={{ background: '#4c1e24', color: '#f1ce7f' }}>{name.slice(0, 1).toUpperCase()}</div>}</div><div tw="flex justify-between border-t pt-7 text-[22px]" style={{ borderColor: '#7a3b2a', color: '#d7beb7' }}><span>GitScout developer card</span><span>gitscout.me</span></div></div>, size);
}
