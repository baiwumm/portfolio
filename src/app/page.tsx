"use client"

import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

import { data } from './data';

import BlurFade from '@/components/BlurFade';
import BlurText from '@/components/BlurText';
import GithubActivity from '@/components/GithubActivity';
import Highlighter from '@/components/Highlighter';
import LogoLoop from '@/components/LogoLoop';
import PostCard, { type PostCardProps } from '@/components/PostCard';
import ProjectCard, { type ProjectCardProps } from '@/components/ProjectCard';
import ResumeCard from '@/components/ResumeCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Spinner } from "@/components/ui/spinner";
import { SECTION } from '@/enums';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const BLUR_FADE_DELAY = 0.04;
  const name = process.env.NEXT_PUBLIC_NAME!;
  // 获取文章
  const { data: posts = [], loading: postLoading } = useRequest(async () => {
    const res = await fetch('/api/halo/posts?page=1&size=5', {
      cache: 'no-store', // 确保获取最新数据
    });
    if (!res.ok) {
      return [];
    }
    const result = await res.json();
    return result?.data?.items || []
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null
  }
  return (
    <main className="flex flex-col min-h-dvh space-y-10 max-w-3xl mx-auto px-4 py-8 pb-18">
      {/* Hero Section */}
      <section id={SECTION.HERO}>
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurText
                className="text-lg font-bold tracking-tighter sm:text-4xl/none"
                text={`Hi, 我是${name} 👋`}
              />
              <BlurText
                className="max-w-150 md:text-lg"
                text={process.env.NEXT_PUBLIC_DESC!}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28">
                <AvatarImage alt={name} src='/me.jpg' />
                <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      {/* 关于 */}
      <section id={SECTION.ABOUT}>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{SECTION.label(SECTION.ABOUT)}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-col justify-center text-sm text-muted-foreground gap-1 mt-1">
            <p>擅长用 React/Vue 构建用户界面，对 工程化 和 性能优化 充满好奇</p>
            <p>正在向 {" "}
              <Highlighter action="highlight" color="#87CEFA">
                <span className="text-white/85">
                  「更优雅的代码」
                </span>
              </Highlighter> {" "}
              和 {" "}
              <Highlighter action="highlight" color="#87CEFA">{" "}
                <span className="text-white/85">
                  「更高效的协作」
                </span>
              </Highlighter>
              方向努力</p>
            “代码是写给人看的，只是顺便让机器能运行”
            <p className="font-bold">
              <Highlighter action="underline" color="#FF9800">
                希望我的代码能像热带气候一样——永远热情，偶尔风暴 🌪️
              </Highlighter>
            </p>
          </div>
        </BlurFade>
      </section>
      {/* Github Activity */}
      <section id={SECTION.ACTIVITY}>
        <div className="flex flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.ACTIVITY)}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <GithubActivity />
          </BlurFade>
        </div>
      </section>
      {/* 工作经历 */}
      <section id={SECTION.WORK}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.WORK)}</h2>
          </BlurFade>
          {data.work.map((work, index) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      {/* 教育经历 */}
      <section id={SECTION.EDUCATION}>
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.EDUCATION)}</h2>
          </BlurFade>
          {data.education.map((education, index) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 9 + index * 0.05}>
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      {/* 专业技能 */}
      <section id={SECTION.SKILLS}>
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.SKILLS)}</h2>
          </BlurFade>
          <BlurFade inView>
            <LogoLoop
              logos={data.skills}
              speed={40}
              direction="left"
              logoHeight={48}
              gap={20}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              ariaLabel="Skill logos"
            />
          </BlurFade>
        </div>
      </section>
      {/* 个人作品 */}
      <section id={SECTION.PROJECTS}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.PROJECTS)}</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-200 mx-auto">
            {data.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={id * 0.05}
                inView
              >
                <ProjectCard key={project.title} {...project as ProjectCardProps} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id={SECTION.POSTS}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SECTION.label(SECTION.POSTS)}</h2>
          </BlurFade>
          <BlurFade inView>
            {postLoading ? (
              <div className="flex justify-center items-center h-60">
                <Spinner />
              </div>
            ) : (
              <div className="relative">
                {(posts || []).map((post: PostCardProps) => (
                  <BlurFade key={post.post.spec.slug} inView>
                    <PostCard {...post} />
                  </BlurFade>
                ))}
              </div>
            )}
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
