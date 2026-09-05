import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus }

export default function StatCard({ icon: Icon, iconColor = '#3f7d52', iconBg = '#dcead9', value, label, trend, trendLabel }) {
  const TrendIcon = trend ? TREND_ICON[trend] : null

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-card-icon" style={{ background: iconBg, color: iconColor }}>
          <Icon size={16} />
        </div>
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      {trend && trendLabel && (
        <div className={`trend ${trend}`}>
          {TrendIcon && <TrendIcon size={12} />}
          {trendLabel}
        </div>
      )}
    </div>
  )
}
