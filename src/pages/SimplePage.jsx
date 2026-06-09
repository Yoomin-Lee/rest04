import { Link } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'

export default function SimplePage({ title }) {
  return (
    <SubPageLayout
      breadcrumb={[{ label: title }]}
      title={title}
    >
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="mb-6 text-6xl opacity-40">🐾</span>
        <h2 className="mb-3 text-2xl font-bold text-deep dark:text-white">{title}</h2>
        <p className="mb-2 text-neutral-500 dark:text-primary-300">이 페이지는 현재 준비 중입니다.</p>
        <p className="text-sm text-neutral-400 dark:text-primary-400/60">
          콘텐츠를 곧 만나보실 수 있습니다!
        </p>
        <Link to="/" className="btn-primary mt-8">
          홈으로 돌아가기 →
        </Link>
      </div>
    </SubPageLayout>
  )
}
