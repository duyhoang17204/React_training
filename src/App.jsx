import { useRef, useState } from 'react'

const initialProfile = {
  firstName: 'David',
  lastName: 'Müller',
  birthDate: '01.01.1980',
  nationality: 'French',
  phone: '+41 78 765 56 66',
  email: 'david.muller@gmail.com',
  address: '6 Avenue du Chalant',
  city: '1110 Morges',
  occupation: 'Product Owner',
  employer: 'Finovate',
  household: 'Married',
  householdSize: '2 people',
}

const tabs = ['Personal', 'Access', 'Leases', 'Documents']

function Icon({ name, className = 'h-4 w-4' }) {
  const paths = {
    person: <><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    contact: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 10h.01M11 10h5M8 14h8" /></>,
    work: <><rect x="3.5" y="7" width="17" height="13" rx="2" /><path d="M8 7V5h8v2M3.5 12h17M10 12v2h4v-2" /></>,
    edit: <><path d="m14 5 5 5M4 20l4.2-.9L19 8.3a2.1 2.1 0 0 0-3-3L5.2 16.1 4 20Z" /></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.4A7.5 7.5 0 1 1 20 11.5Z" /><path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" /></>,
    home: <><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" /></>,
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}

function ProfileField({ label, value, name, editing, onChange, emailError, onEmailInvalid }) {
  return (
    <div className="min-w-0 border-b border-slate-100 py-4 last:border-b-0 sm:py-[18px]">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-slate-800">
        {editing ? (
          <input
            aria-label={label}
            aria-describedby={name === 'email' && emailError ? 'email-error' : undefined}
            aria-invalid={name === 'email' ? Boolean(emailError) : undefined}
            className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            name={name}
            onChange={onChange}
            onInvalid={name === 'email' ? onEmailInvalid : undefined}
            type={name === 'email' ? 'email' : 'text'}
            value={value}
          />
        ) : value || <span className="font-normal text-slate-400">Not provided</span>}
      </dd>
      {editing && name === 'email' && emailError && (
        <p className="mt-1 text-xs font-medium text-rose-700" id="email-error" role="alert">{emailError}</p>
      )}
    </div>
  )
}

function InfoSection({ icon, title, fields, profile, editing, onChange, emailError, onEmailInvalid }) {
  return (
    <section aria-labelledby={`section-${title.toLowerCase()}`} className="mt-8 first:mt-0">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-teal-800">
        <Icon name={icon} className="h-[17px] w-[17px]" />
        <h2 className="text-sm font-semibold" id={`section-${title.toLowerCase()}`}>{title}</h2>
      </div>
      <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {fields.map(([label, name]) => (
          <ProfileField editing={editing} emailError={emailError} key={name} label={label} name={name} onChange={onChange} onEmailInvalid={onEmailInvalid} value={profile[name]} />
        ))}
      </dl>
    </section>
  )
}

function EmptyTab({ tab }) {
  const descriptions = {
    Access: 'Access details will appear here when they are available.',
    Leases: 'Lease information will appear here when it is available.',
    Documents: 'Documents will appear here when they are available.',
  }
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-16 text-center" role="status">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon name={tab === 'Access' ? 'person' : tab === 'Leases' ? 'home' : 'contact'} className="h-5 w-5" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-800">{tab}</h2>
      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{descriptions[tab]}</p>
    </div>
  )
}

export default function App() {
  const [profile, setProfile] = useState(initialProfile)
  const [draft, setDraft] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('Personal')
  const [notice, setNotice] = useState('')
  const [emailError, setEmailError] = useState('')
  const tabListRef = useRef(null)

  function startEditing() {
    setDraft(profile)
    setEditing(true)
    setNotice('')
    setEmailError('')
  }

  function cancelEditing() {
    setDraft(profile)
    setEditing(false)
    setEmailError('')
  }

  function saveEditing(event) {
    event.preventDefault()
    setProfile(draft)
    setEditing(false)
    setEmailError('')
    setNotice('Information saved for this session.')
  }

  function updateField(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    if (name === 'email') {
      setEmailError(event.target.validity.typeMismatch ? 'Enter a valid email address.' : '')
    }
  }

  function handleEmailInvalid(event) {
    if (event.target.validity.typeMismatch) {
      setEmailError('Enter a valid email address.')
    }
  }

  function handleTabKeyDown(event) {
    const currentIndex = tabs.indexOf(activeTab)
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else return

    event.preventDefault()
    setActiveTab(tabs[nextIndex])
    setNotice('')
    const nextTab = document.getElementById(`tab-${tabs[nextIndex].toLowerCase()}`)
    nextTab?.focus({ preventScroll: true })

    const tabList = tabListRef.current
    if (!tabList || !nextTab) return

    const tabListRect = tabList.getBoundingClientRect()
    const nextTabRect = nextTab.getBoundingClientRect()
    const visibleLeft = tabListRect.left + tabList.clientLeft
    const visibleRight = visibleLeft + tabList.clientWidth
    if (nextTabRect.left < visibleLeft) {
      tabList.scrollLeft -= visibleLeft - nextTabRect.left
    } else if (nextTabRect.right > visibleRight) {
      tabList.scrollLeft += nextTabRect.right - visibleRight
    }
  }

  const sections = [
    { icon: 'person', title: 'Personal', fields: [['First name', 'firstName'], ['Last name', 'lastName'], ['Date of birth', 'birthDate'], ['Nationality', 'nationality']] },
    { icon: 'contact', title: 'Contact', fields: [['Phone', 'phone'], ['Email', 'email'], ['Street address', 'address'], ['City / postal code', 'city']] },
    { icon: 'work', title: 'Professional', fields: [['Occupation', 'occupation'], ['Employer', 'employer'], ['Household status', 'household'], ['Household size', 'householdSize']] },
  ]

  return (
    <main className="min-h-screen bg-[#f2f7f8] px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-xl font-bold tracking-tight text-[#17617d] sm:mb-6 sm:text-2xl">Tenant profile</h1>

        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <header className="flex flex-col gap-5 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
            <div className="flex min-w-0 items-center gap-3.5">
              <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Icon name="person" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{profile.firstName} {profile.lastName}</h2>
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-800">Active</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Tenant profile</p>
              </div>
            </div>
            <button className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md bg-[#147698] px-4 text-sm font-semibold text-white transition hover:bg-[#105f7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 sm:self-auto" onClick={() => setNotice('Messaging is not connected in this demo.') } type="button">
              <Icon name="message" className="h-4 w-4" />
              Send a message
            </button>
          </header>

          <nav aria-label="Tenant profile sections" className="overflow-x-auto border-b border-slate-200 px-5 sm:px-8" ref={tabListRef}>
            <div className="flex min-w-max gap-7 sm:gap-9" onKeyDown={handleTabKeyDown} role="tablist" aria-orientation="horizontal">
              {tabs.map((tab) => (
                <button
                  aria-controls={`panel-${tab.toLowerCase()}`}
                  aria-selected={activeTab === tab}
                  className={`min-h-12 border-b-2 px-0.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-700 ${activeTab === tab ? 'border-[#147698] text-[#126b8a]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                  id={`tab-${tab.toLowerCase()}`}
                  key={tab}
                  onClick={() => { setActiveTab(tab); setNotice('') }}
                  role="tab"
                  tabIndex={activeTab === tab ? 0 : -1}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>

          {notice && <p className="mx-5 mt-4 rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-900 sm:mx-8" role="status">{notice}</p>}

          {tabs.map((tab) => (
            <div
              aria-labelledby={`tab-${tab.toLowerCase()}`}
              hidden={activeTab !== tab}
              id={`panel-${tab.toLowerCase()}`}
              key={tab}
              role="tabpanel"
              tabIndex={0}
            >
              {tab === 'Personal' ? (
                <form onSubmit={saveEditing}>
                  <div className="px-5 py-6 sm:px-8 sm:py-8">
                    {sections.map((section) => (
                      <InfoSection editing={editing} emailError={emailError} icon={section.icon} key={section.title} onChange={updateField} onEmailInvalid={handleEmailInvalid} profile={editing ? draft : profile} title={section.title} fields={section.fields} />
                    ))}
                  </div>
                  <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
                    {editing ? (
                      <>
                        <button className="min-h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2" onClick={cancelEditing} type="button">Cancel</button>
                        <button className="min-h-10 rounded-md bg-[#147698] px-4 text-sm font-semibold text-white transition hover:bg-[#105f7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2" type="submit">Save changes</button>
                      </>
                    ) : (
                      <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#147698] bg-white px-4 text-sm font-semibold text-[#126b8a] transition hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2" onClick={startEditing} type="button">
                        <Icon name="edit" className="h-4 w-4" />
                        Edit information
                      </button>
                    )}
                  </footer>
                </form>
              ) : <EmptyTab tab={tab} />}
            </div>
          ))}
        </article>
      </div>
    </main>
  )
}
