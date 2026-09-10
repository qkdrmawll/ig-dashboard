import { useMemo, useState } from 'react'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h17" /><path d="m7 15 4-5 3 3 5-7" /></>,
    cart: <><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L20.4 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    box: <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2 2-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20h-3v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2-2 .06-.06A1.65 1.65 0 0 0 7.46 15a1.65 1.65 0 0 0-1.51-1H5.86v-3h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 2-2 .06.06A1.65 1.65 0 0 0 11 6.51a1.65 1.65 0 0 0 1-1.51V4.91h3V5a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2 2-.06.06A1.65 1.65 0 0 0 19.49 10a1.65 1.65 0 0 0 1.51 1h.09v3H21a1.65 1.65 0 0 0-1.6 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const nav = [
  ['grid', '대시보드'], ['chart', '매출 분석'], ['cart', '주문 관리'], ['box', '재고 관리'],
  ['users', '고객 관리'], ['file', '회계 · 정산'],
]

const orders = [
  { id: '#SO-2024-1847', customer: '주식회사 어반테크', item: 'Orbit Pro Annual × 12', amount: '₩ 5,760,000', status: '결제 완료', tone: 'green', time: '2분 전', avatar: '어' },
  { id: '#SO-2024-1846', customer: '에이치앤컴퍼니', item: 'Enterprise Setup × 1', amount: '₩ 3,200,000', status: '처리 중', tone: 'blue', time: '18분 전', avatar: '에' },
  { id: '#SO-2024-1845', customer: '스튜디오 모노', item: 'Orbit Team Monthly × 5', amount: '₩ 425,000', status: '결제 완료', tone: 'green', time: '34분 전', avatar: '스' },
  { id: '#SO-2024-1844', customer: '도담 디자인', item: 'Design System Kit × 1', amount: '₩ 890,000', status: '검토 필요', tone: 'orange', time: '1시간 전', avatar: '도' },
]

const approvals = [
  { type: '구매 요청', title: '개발팀 노트북 8대 구매', person: '김태현 · 개발팀', amount: '₩ 18,400,000', color: '#7357d8' },
  { type: '비용 정산', title: '8월 마케팅 캠페인 비용', person: '이서연 · 마케팅팀', amount: '₩ 4,875,000', color: '#e37b52' },
  { type: '휴가 신청', title: '연차 휴가 신청 (3일)', person: '박민준 · 영업팀', amount: '9월 18일 — 20일', color: '#26a884' },
]

function Metric({ label, value, change, positive, accent }) {
  return <article className="metric-card">
    <div className="metric-title"><span className={`metric-icon ${accent}`}><Icon name={accent === 'purple' ? 'chart' : accent === 'orange' ? 'cart' : accent === 'blue' ? 'users' : 'box'} size={18} /></span>{label}</div>
    <div className="metric-value">{value}</div>
    <div className={positive ? 'metric-change up' : 'metric-change down'}>{positive ? '↑' : '↓'} {change}<span>지난달 대비</span></div>
  </article>
}

export default function App() {
  const [active, setActive] = useState('대시보드')
  const [period, setPeriod] = useState('이번 달')
  const [query, setQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [approvalsState, setApprovalsState] = useState(approvals)
  const filteredOrders = useMemo(() => orders.filter(order => `${order.customer} ${order.id}`.includes(query)), [query])
  const approve = (title) => setApprovalsState(items => items.filter(item => item.title !== title))

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><i /><i /><i /></div><span>orbit</span></div>
      <div className="workspace-switcher"><div className="workspace-icon">O</div><div><b>Orbit Korea</b><small>워크스페이스</small></div><Icon name="chevron" size={16} /></div>
      <nav>{nav.map(([icon, label]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon name={icon} size={19} /><span>{label}</span>{label === '주문 관리' && <em>12</em>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Icon name="settings" size={19} /><span>환경 설정</span></button><div className="profile"><div className="avatar purple-avatar">JH</div><div><b>지현 김</b><small>관리자</small></div><button><Icon name="dots" size={18} /></button></div></div>
    </aside>

    <section className="content">
      <header className="topbar">
        <div className="mobile-brand">orbit</div>
        <label className="search"><Icon name="search" size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="주문, 고객, 문서 검색..." /><kbd>⌘ K</kbd></label>
        <div className="top-actions"><button className="help">도움말</button><button className="notification" onClick={() => setNoticeOpen(!noticeOpen)}><Icon name="bell" size={20} /><span /></button>{noticeOpen && <div className="notice-popover"><b>새로운 알림</b><p>승인 대기 문서가 3건 있습니다.</p></div>}<div className="avatar purple-avatar">JH</div></div>
      </header>

      <div className="dashboard">
        <div className="page-heading"><div><p className="eyebrow">2024년 9월 12일 목요일</p><h1>좋은 아침이에요, 지현님 <span>👋</span></h1><p className="subcopy">오늘의 비즈니스 현황을 확인하고 업무를 시작하세요.</p></div><button className="primary-button"><Icon name="plus" size={18} />새 업무 만들기</button></div>

        <div className="metrics">
          <Metric label="이번 달 총 매출" value="₩ 184,250,000" change="12.5%" positive accent="purple" />
          <Metric label="신규 주문" value="1,284건" change="8.2%" positive accent="orange" />
          <Metric label="신규 고객" value="248명" change="4.6%" positive accent="blue" />
          <Metric label="재고 부족 품목" value="12개" change="2건 증가" accent="red" />
        </div>

        <div className="dashboard-grid">
          <section className="panel revenue-panel">
            <div className="panel-header"><div><h2>매출 현황</h2><p>일별 매출 추이</p></div><button className="period-select" onClick={() => setPeriod(period === '이번 달' ? '지난 달' : '이번 달')}><Icon name="calendar" size={16} />{period}<Icon name="chevron" size={14} /></button></div>
            <div className="chart-summary"><b>₩ 184,250,000</b><span className="up">↑ 12.5%</span></div>
            <div className="chart-area">
              <div className="y-labels"><span>50M</span><span>40M</span><span>30M</span><span>20M</span><span>10M</span><span>0</span></div>
              <div className="chart"><div className="grid-lines" /><svg viewBox="0 0 650 195" preserveAspectRatio="none" aria-label="매출 추이 차트"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#6e54d7" stopOpacity=".22" /><stop offset="1" stopColor="#6e54d7" stopOpacity="0" /></linearGradient></defs><path d="M0,145 C30,135 34,150 58,139 S92,115 116,126 S145,100 174,112 S207,84 232,100 S267,131 291,110 S327,87 350,96 S385,56 407,76 S440,97 465,82 S500,39 524,58 S556,82 581,54 S619,22 650,32 L650,195 L0,195Z" fill="url(#fill)" /><path d="M0,145 C30,135 34,150 58,139 S92,115 116,126 S145,100 174,112 S207,84 232,100 S267,131 291,110 S327,87 350,96 S385,56 407,76 S440,97 465,82 S500,39 524,58 S556,82 581,54 S619,22 650,32" fill="none" stroke="#7055d8" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg><div className="chart-tip"><b>9월 9일</b><span>₩ 42,500,000</span></div><div className="chart-dot" /></div>
              <div className="x-labels"><span>9/1</span><span>9/5</span><span>9/10</span><span>9/15</span><span>9/20</span><span>9/25</span><span>9/30</span></div>
            </div>
          </section>

          <section className="panel approval-panel"><div className="panel-header"><div><h2>결재 대기</h2><p>확인이 필요한 문서 <b>{approvalsState.length}건</b></p></div><button className="icon-button"><Icon name="dots" size={20} /></button></div>
            <div className="approval-list">{approvalsState.length ? approvalsState.map(item => <div className="approval" key={item.title}><div className="approval-symbol" style={{ background: `${item.color}16`, color: item.color }}><Icon name="file" size={18} /></div><div className="approval-text"><small>{item.type}</small><b>{item.title}</b><span>{item.person}</span></div><div className="approval-amount"><b>{item.amount}</b><button onClick={() => approve(item.title)}>승인</button></div></div>) : <div className="empty-state">모든 결재를 처리했어요.</div>}</div>
            <button className="view-all">결재함 전체 보기 <Icon name="arrow" size={15} /></button>
          </section>

          <section className="panel orders-panel"><div className="panel-header"><div><h2>최근 주문</h2><p>실시간으로 업데이트되는 주문 내역</p></div><button className="text-button" onClick={() => setActive('주문 관리')}>전체 주문 보기 <Icon name="arrow" size={15} /></button></div>
            <div className="table-wrap"><table><thead><tr><th>주문 번호</th><th>고객</th><th>주문 상품</th><th>결제 금액</th><th>상태</th><th>주문 시간</th></tr></thead><tbody>{filteredOrders.map(order => <tr key={order.id}><td><b>{order.id}</b></td><td><div className="customer"><span className="avatar order-avatar">{order.avatar}</span>{order.customer}</div></td><td>{order.item}</td><td><b>{order.amount}</b></td><td><span className={`status ${order.tone}`}>{order.status}</span></td><td className="muted">{order.time}</td></tr>)}</tbody></table>{filteredOrders.length === 0 && <div className="empty-state">검색 결과가 없습니다.</div>}</div>
          </section>

          <section className="panel inventory-panel"><div className="panel-header"><div><h2>재고 현황</h2><p>주요 품목 재고 요약</p></div><button className="icon-button"><Icon name="dots" size={20} /></button></div><div className="inventory-total"><span>전체 재고 자산</span><b>₩ 428,600,000</b></div><div className="inventory-bars"><div><span>안전 재고 <b>68%</b></span><i><em style={{ width: '68%', background: '#32ae86' }} /></i></div><div><span>주의 필요 <b>22%</b></span><i><em style={{ width: '22%', background: '#f1a14b' }} /></i></div><div><span>재고 부족 <b>10%</b></span><i><em style={{ width: '10%', background: '#e16b58' }} /></i></div></div><button className="view-all">재고 관리로 이동 <Icon name="arrow" size={15} /></button></section>
        </div>
      </div>
    </section>
  </main>
}
