import { useState } from 'react'
import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Icon from '../components/Icon'
import { company } from '../data/site'

const types = [
  { key: 'general',     label: '고객 문의',  icon: 'chat' },
  { key: 'partnership', label: '제휴 문의',  icon: 'link' },
]

function ContactInfo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { icon: 'pin',   title: '주소', desc: company.offices[0].address },
        { icon: 'phone', title: '전화',  desc: company.offices[0].tel },
        { icon: 'mail',  title: '이메일', desc: company.offices[0].email },
      ].map(info => (
        <div key={info.title} className="card-base flex items-start gap-4 p-5">
          <Icon name={info.icon} size={20} className="mt-0.5 shrink-0 text-primary-500 dark:text-primary-400" />
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">{info.title}</p>
            <p className="text-sm text-neutral-700 dark:text-primary-200">{info.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactForm({ type }) {
  const [form, setForm] = useState({ name: '', email: '', pet: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="checkCircle" size={56} className="mb-4 text-support-500 dark:text-support-400" />
        <h3 className="mb-2 text-xl font-bold text-deep dark:text-white">문의가 접수되었습니다!</h3>
        <p className="text-neutral-500 dark:text-primary-300">
          영업일 기준 1~2일 내에 이메일로 답변드리겠습니다.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 btn-outline"
        >
          새 문의 작성
        </button>
      </div>
    )
  }

  const inputCls = 'w-full rounded-xl border border-neutral-200 dark:border-deep-600 bg-white dark:bg-deep-800 px-4 py-3 text-sm text-neutral-900 dark:text-primary-100 placeholder-neutral-400 dark:placeholder-primary-400/50 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-primary-200">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="홍길동"
            value={form.name}
            onChange={handle}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-primary-200">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="example@email.com"
            value={form.email}
            onChange={handle}
            className={inputCls}
          />
        </div>
      </div>

      {type !== 'partnership' && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-primary-200">
            반려동물 종류
          </label>
          <input
            type="text"
            name="pet"
            placeholder="예: 강아지(포메라니안), 고양이(스코티쉬폴드)"
            value={form.pet}
            onChange={handle}
            className={inputCls}
          />
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-primary-200">
          문의 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={
            type === 'partnership'
              ? '제휴 방향, 회사명, 연락처 등을 포함하여 작성해 주세요.'
              : '궁금하신 점이나 요청사항을 자유롭게 작성해 주세요.'
          }
          value={form.message}
          onChange={handle}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-0.5 h-4 w-4 cursor-pointer accent-primary-600"
        />
        <label htmlFor="privacy" className="cursor-pointer text-sm text-neutral-500 dark:text-primary-300">
          <span className="font-semibold text-primary-600 dark:text-primary-400">개인정보처리방침</span>에 동의합니다.
          수집된 정보는 문의 답변 목적으로만 사용됩니다.
        </label>
      </div>

      <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base gap-2">
        <Icon name="mail" size={16} className="shrink-0" />
        문의 전송하기
      </button>
    </form>
  )
}

export default function Contact() {
  const { type = 'general' } = useParams()
  const [activeType, setActiveType] = useState(type)
  const current = types.find(t => t.key === activeType) || types[0]

  return (
    <SubPageLayout
      breadcrumb={[{ label: '문의하기' }]}
      title="문의하기"
      icon="mail"
    >
      <div className="mb-10">
        <ContactInfo />
      </div>

      <div className="card-base overflow-hidden">
        {/* 문의 유형 탭 */}
        <div className="flex border-b border-neutral-100 dark:border-deep-700 p-2 gap-2">
          {types.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveType(t.key)}
              className={[
                'tab-btn flex-1 justify-center',
                t.key === activeType ? 'tab-btn-active' : 'tab-btn-inactive',
              ].join(' ')}
            >
              <Icon name={t.icon} size={15} className="shrink-0" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10">
          <p className="section-label mb-2">Contact Us</p>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-deep dark:text-white">
            <Icon name={current.icon} size={24} className="text-primary-500 dark:text-primary-400" />
            {current.label}
          </h2>
          <ContactForm type={activeType} />
        </div>
      </div>
    </SubPageLayout>
  )
}
